<?php

namespace App\Http\Controllers;

use App\Models\Config;
use App\Models\Movement;
use App\Models\Product;
use App\Models\ProductCount;
use App\Models\ProductMovement;
use Illuminate\Http\Request;

class ProductCountsController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index(Request $request)
    {
        if (is_array($request->ids)) {
            return ["data" => ProductCount::with('movement')->whereIn('id', $request->ids)->get()];
        } else {
            $data = ProductCount::with('movement')->orderBy($request->order_by ?? 'id', $request->order_sort ?? 'asc');
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
        $products_data = $request->validate([
            "data" => ['required', 'array'],
            "data.*.id" => ["required", "exists:products,id", "distinct"],
            "data.*.count" => ["required", "numeric", "integer", 'min:0'],
        ]);

        $count = ProductCount::create($products_data);

        $movement = Movement::create([
            'name' => Config::format('counts.movement', ['count' => $count->toArray()]),
            'user_id' => $request->user()->id,
            'rectification' => true
        ]);

        foreach ($products_data["data"] as $product) {
            $p = Product::findOrFail($product["id"]);
            $p->recalculate();

            $data = [
                "movement_id" => $movement->id,
                "product_id" => $product["id"],
                "count" => $product["count"] - $p->count
            ];

            ProductMovement::create($data);
        }

        $count->movement_id = $movement->id;
        $count->save();

        return ['data' => $count];
    }

    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function show($id)
    {
        return ['data' => ProductCount::with('movement')->findOrFail($id)];
    }
}
