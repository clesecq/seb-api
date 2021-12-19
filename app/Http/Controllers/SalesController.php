<?php

namespace App\Http\Controllers;

use Database\Models\Config;
use Database\Models\Sale;
use Database\Models\Movement;
use Database\Models\Person;
use Database\Models\PersonalTransaction;
use Database\Models\ProductMovement;
use Database\Models\Product;
use Database\Models\Transaction;
use Illuminate\Http\Request;
use Illuminate\Validation\Rule;

class SalesController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index(Request $request)
    {
        return $this->commonIndex($request, Sale::class, [
            'person_id' => "equals:person_id"
        ]);
    }

    private function calculatePrice($products)
    {
        $amount = 0;

        foreach ($products as $product) {
            // Should never fail, but we never know
            $p = Product::findOrFail($product['id']);
            // Add to the amount
            $amount += $p->price * intval($product["count"]);
        }

        return $amount;
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        // We first validate the data
        $products_data = $request->validate([
            "products" => ['required', 'array'],
            "products.*.id" => ["required", "exists:products,id", "distinct"],
            "products.*.count" => ["required", "numeric", "integer", "min:1"],
            "payment" => ['required', Rule::in(['cash', 'card', 'account'])]
        ]);

        $amount = $this->calculatePrice($products_data["products"]);
        $paccount = null;
        if ($products_data["payment"] == "account") {
            $key_data = $request->validate(['token' => ['required', function ($attribute, $value, $fail) {
                if (!Person::where('edu_token', hash('sha256', $value))->exists()) {
                    $fail("Cette carte n'est pas attribuée à un compte.");
                }
            }]]);
            $person = Person::where('edu_token', hash('sha256', $key_data['token']))->firstOrFail();
            $paccount = $person->personal_account;

            if (!$paccount->exists()) {
                abort(404);
            }

            if ($paccount->balance < $amount) {
                abort(422, "Pas assez d'argent sur le compte.");
            }
        }

        // We create the sale (needed to have the ID for the names)
        $sale = Sale::create();

        // We create the movement
        $movement = Movement::create([
            "name" => Config::format("sales.movement", ["sale" => $sale->attributesToArray()]),
            "rectification" => false,
            "user_id" => $request->user()->id
        ]);

        // We fill the movement with the products
        foreach ($products_data["products"] as $product) {
            $data = [
                "movement_id" => $movement->id,
                "product_id" => $product["id"],
                "count" => -$product["count"]
            ];

            // Create a product movement
            ProductMovement::create($data);
        }

        $account_id = $products_data["payment"] == "account" ?
            Config::integer('personal.account') : ($products_data["payment"] == 'card' ?
                Config::integer('card.account') : Config::integer('sales.account'));

        // We create the transaction
        $transaction = Transaction::create([
            'name' => Config::format("sales.transaction", ["sale" => $sale->attributesToArray()]),
            'amount' => $amount,
            'rectification' => false,
            'account_id' => $account_id,
            'category_id' => Config::integer('sales.category'),
            'user_id' => $request->user()->id
        ]);

        if ($products_data["payment"] == "card") {
            // We round the transaction fees
            // (Information given by our card payment provider).
            $a = round($amount * Config::number('card.fees.percent') * 100) / 100;

            Transaction::create([
                'name' => Config::format('card.fees.message', ['transaction' => $transaction->attributesToArray()]),
                'amount' => -$a,
                'rectification' => false,
                'account_id' => Config::integer('card.account'),
                'category_id' => Config::integer('card.fees.category'),
                'user_id' => $request->user()->id
            ]);
        } elseif ($products_data["payment"] == "account") {
            $t = Transaction::create([
                'name' => Config::format("sales.transaction", ["sale" => $sale->attributesToArray()]),
                'amount' => -$amount,
                'rectification' => false,
                'account_id' => Config::integer('personal.account'),
                'category_id' => Config::integer('personal.category'),
                'user_id' => $request->user()->id
            ]);

            PersonalTransaction::create([
                'amount' => -$amount,
                'user_id' => $request->user()->id,
                'personal_account_id' => $paccount->id,
                'transaction_id' => $t->id
            ]);

            $sale->person_id = $paccount->person_id;
        }

        // We affect the new transaction and movement to the sale
        $sale->transaction_id = $transaction->id;
        $sale->movement_id = $movement->id;
        $sale->save();

        // We return the new sale
        return ['data' => $sale];
    }

    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function show($id)
    {
        return ['data' => Sale::findOrFail($id)];
    }
}
