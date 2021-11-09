<?php

namespace App\Http\Controllers;

use App\Models\Product;
use Illuminate\Http\Request;

class ProductsController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index(Request $request)
    {
        if (is_array($request->ids)) {
            return ["data" => Product::whereIn('id', $request->ids)->get()];
        } else {
            $data = Product::orderBy($request->order_by ?? 'id', $request->order_sort ?? 'asc');
            if (is_array($request->filter)) {
                foreach ($request->filter as $k => $v) {
                    if ($k == "alerts") {
                        if ($v) {
                            $data = $data->whereColumn('count', '<', 'alert_level');
                        } else {
                            $data = $data->whereColumn('count', '>=', 'alert_level');
                        }
                    } else {
                        $data = $data->where($k, 'like', '%' . $v . '%');
                    }
                }
            }
            if (!is_null($request->per_page)) {
                $data = $data->paginate((int) $request->per_page);
            } else {
                $data = ["data" => $data->get(), "total" => $data->count()];
            }
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
        $data = $request->validate([
            'name' => ['required', 'string'],
            'price' => ['required', 'numeric'],
            'alert_level' => ['required', 'numeric', 'integer', 'min:0'],
            'category_id' => ['required', 'exists:product_categories,id'],
            'salable' => ['required', 'boolean']
        ]);

        return ['data' => Product::create($data)];
    }

    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function show($id)
    {
        return ['data' => Product::findOrFail($id)];
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, $id)
    {
        $data = $request->validate([
            'name' => ['sometimes', 'required', 'string'],
            'price' => ['sometimes', 'required', 'numeric'],
            'alert_level' => ['sometimes', 'required', 'numeric', 'integer'],
            'category_id' => ['sometimes', 'required', 'exists:product_categories,id'],
            'salable' => ['sometimes', 'required', 'boolean']
        ]);

        Product::findOrFail($id)->update($data);
        return ['data' => Product::findOrFail($id)];
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
        $product = Product::findOrFail($id);
        $product->delete();
        return ['data' => $product];
    }

    /**
     * Destroy many of the specified resource
     */
    public function destroyMany(Request $request)
    {
        if (is_array($request->ids)) {
            Product::whereIn('id', $request->ids)->get()->each(function ($product) {
                $product->delete();
            });
            return response(["data" => $request->ids], 200);
        } else {
            return response([], 400);
        }
    }

    /**
     * Update many of the specified resource
     */
    public function updateMany(Request $request)
    {
        $data = $request->validate([
            'name' => ['sometimes', 'required', 'string'],
            'price' => ['sometimes', 'required', 'numeric'],
            'alert_level' => ['sometimes', 'required', 'numeric', 'integer'],
            'category_id' => ['sometimes', 'required', 'exists:product_categories,id'],
            'salable' => ['sometimes', 'required', 'boolean']
        ]);

        if (is_array($request->ids)) {
            Product::whereIn('id', $request->ids)->update($data);
            return response(["data" => $request->ids], 200);
        } else {
            return response([], 400);
        }
    }

    /**
     * Recalculates the amount stored in the products
     */
    public function reload(Request $request)
    {
        Product::recalculateAll();
    }
}
