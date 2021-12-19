<?php

namespace App\Http\Controllers;

use Database\Models\Movement;
use Database\Models\ProductMovement;
use Illuminate\Http\Request;

class MovementsController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index(Request $request)
    {
        return $this->commonIndex($request, Movement::class, [
            'name' => "like:name",
            'rectification' => "equals:rectification",
            'user_id' => "equals:user_id"
        ], 'products');
    }

    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function show($id)
    {
        return ['data' => Movement::with(['products'])->findOrFail($id)];
    }

    public function store(Request $request)
    {
        $movement_data = $request->validate([
            "name" => ["required", "string"],
            "rectification" => ["boolean"],
        ]);

        $movement_data['user_id'] = $request->user()->id;

        $products_data = $request->validate([
            "products" => ['required', 'array'],
            "products.*.id" => ["required", "exists:products,id", "distinct"],
            "products.*.diff" => ["required", "numeric", "integer"],
        ]);

        $movement_id = Movement::create($movement_data)->id;

        foreach ($products_data["products"] as $product) {
            $data = [
                "movement_id" => $movement_id,
                "product_id" => $product["id"],
                "count" => $product["diff"]
            ];

            ProductMovement::create($data);
        }

        return ['data' => Movement::with(['products', 'products.product'])->findOrFail($movement_id)];
    }
}
