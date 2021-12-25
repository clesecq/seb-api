<?php

namespace App\Http\Controllers;

use App\Traits\Payable;
use Database\Models\Config;
use Database\Models\Sale;
use Database\Models\Movement;
use Database\Models\ProductMovement;
use Database\Models\Product;
use Illuminate\Http\Request;
use Illuminate\Validation\Rule;

class SalesController extends Controller
{
    use Payable;

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

        // Check payment data (personal account)
        $this->checkPaymentData($request, $amount);

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

        $out = $this->doPayment(
            $request,
            $amount,
            Config::format("sales.transaction", ["sale" => $sale->attributesToArray()]),
            Config::integer('sales.category')
        );

        // We affect the new transaction and movement to the sale
        $sale->transaction_id = $out["transaction"];
        $sale->movement_id = $movement->id;
        $sale->person_id = $out["person"];
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
