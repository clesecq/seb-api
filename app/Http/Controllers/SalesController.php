<?php

namespace App\Http\Controllers;

use App\Models\Config;
use App\Models\Sale;
use App\Models\Movement;
use App\Models\ProductMovement;
use App\Models\Product;
use App\Models\Transaction;
use Illuminate\Http\Request;

class SalesController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index(Request $request)
    {
        if (is_array($request->ids)) {
            return ["data" => Sale::with('transaction')->whereIn('id', $request->ids)->get()];
        } else {
            $data = Sale::with('transaction')->orderBy($request->order_by ?? 'id', $request->order_sort ?? 'asc');
            if (is_array($request->filter)) {
                foreach($request->filter as $k => $v) {
                    $data = $data->where($k, 'like', '%' . $v . '%');
                }
            }
            if (!is_null($request->per_page))
                $data = $data->paginate((int) $request->per_page);
            else
                $data = $data->get();
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
        // We first validate the data
        $products_data = $request->validate([
            "products" => ['required', 'array'],
            "products.*.id" => ["required", "exists:products,id", "distinct"],
            "products.*.count" => ["required", "numeric", "integer", "min:1"],
        ]);

        // We create the sale (needed to have the ID for the names)
        $sale = Sale::create();
        $amount = 0;

        // We create the movement
        $movement = Movement::create([
            "name" => Config::format("sales.movement", ["sale" => $sale->attributesToArray()]),
            "rectification" => false,
            "user_id" => $request->user()->id
        ]);

        // We fill the movement with the products
        foreach($products_data["products"] as $product) {
            $data = [
                "movement_id" => $movement->id,
                "product_id" => $product["id"],
                "count" => -$product["count"]
            ];

            // Create a product movement
            ProductMovement::create($data);

            // Should never fail, but we never know
            $p = Product::findOrFail($product['id']);
            // Add to the amount
            $amount += $p->price * intval($product["count"]);
        }

        // We create the transaction
        $transaction = Transaction::create([
            'name' => Config::format("sales.transaction", ["sale" => $sale->attributesToArray()]),
            'amount' => $amount,
            'rectification' => false,
            'account_id' => Config::integer('sales.account'),
            'category_id' => Config::integer('sales.category'),
            'user_id' => $request->user()->id
        ]);

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
        return ['data' => Sale::with(['movement', 'movement.products', 'movement.products.product', 'transaction'])->findOrFail($id)];
    }
}
