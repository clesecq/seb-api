<?php

namespace App\Http\Controllers;

use App\Models\Config;
use App\Models\Movement;
use App\Models\ProductMovement;
use App\Models\Purchase;
use App\Models\Transaction;
use Illuminate\Http\Request;

class PurchasesController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index(Request $request)
    {
        if (is_array($request->ids)) {
            return ["data" => Purchase::with('transaction')->whereIn('id', $request->ids)->get()];
        } else {
            $data = Purchase::with('transaction')->orderBy($request->order_by ?? 'id', $request->order_sort ?? 'asc');
            if (is_array($request->filter)) {
                foreach ($request->filter as $k => $v) {
                    $data = $data->where($k, 'like', '%' . $v . '%');
                }
            }
            if (!is_null($request->per_page))
                $data = $data->paginate((int) $request->per_page);
            else
                $data = ["data" => $data->get(), "total" => $data->count()];
            return $data;
        }
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        // Validate the data
        $data = $request->validate([
            'name' => ['required', 'string'],
            'amount' => ['required', 'numeric', 'min:0'],
            'account_id' => ['required', 'exists:accounts,id'],
            'category_id' => ['required', 'exists:transaction_categories,id'],
            'has_products' => ['sometimes', 'required', 'boolean']
        ]);

        if (!array_key_exists('has_products', $data))
        $data['has_products'] = false;

        if ($data['has_products']) {
            $products_data = $request->validate([
                "products" => ['required', 'array'],
                "products.*.id" => ["required", "exists:products,id", "distinct"],
                "products.*.count" => ["required", "numeric", "integer", "min:1"],
            ]);
        }

        // Create the purchase
        $purchase = Purchase::create([
            'name' => $data['name']
        ]);

        // Create the transaction
        $transaction = Transaction::create([
            'name' => Config::format("purchases.transaction", ["purchase" => $purchase->attributesToArray()]),
            'amount' => -$data['amount'],
            'rectification' => false,
            'account_id' => $data['account_id'],
            'category_id' => $data['category_id'],
            'user_id' => $request->user()->id
        ]);

        $purchase->transaction_id = $transaction->id;

        if ($data['has_products']) {
            // We create the movement
            $movement = Movement::create([
                "name" => Config::format("purchases.movement", ["purchase" => $purchase->attributesToArray()]),
                "rectification" => false,
                "user_id" => $request->user()->id
            ]);

            // We fill the movement with the products
            foreach ($products_data["products"] as $product) {
                $data = [
                    "movement_id" => $movement->id,
                    "product_id" => $product["id"],
                    "count" => $product["count"]
                ];

                // Create a product movement
                ProductMovement::create($data);
            }

            $purchase->movement_id = $movement->id;
        }

        $purchase->save();
        return ['data' => $purchase];
    }

    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function show($id)
    {
        return ['data' => Purchase::with(['movement', 'movement.products', 'movement.products.product', 'transaction'])->findOrFail($id)];
    }
}
