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
                foreach($request->filter as $k => $v) {
                    $data = $data->where($k, 'like', '%' . $v . '%');
                }
            }
            if (!is_null($request->per_page))
                $data = $data->paginate((int) $request->per_page);
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
            'barcode' => ['required', 'string', 'digits_between:8,13', 'unique:products,barcode'],
            'name' => ['required', 'string'],
            'price' => ['required', 'numeric'],
            'category_id' => ['required', 'exists:product_categories,id']
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
            'barcode' => ['sometimes', 'required', 'string', 'digits_between:8,13', 'unique:products,barcode'],
            'name' => ['sometimes', 'required', 'string'],
            'price' => ['sometimes', 'required', 'numeric'],
            'category_id' => ['sometimes', 'required', 'exists:product_categories,id']
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
    public function destroyMany(Request $request) {
        if (is_array($request->ids)) {
            Product::whereIn('id', $request->ids)->delete();
            return response(["data" => $request->ids], 200);
        } else {
            return response([], 400);
        }
    }

    /**
     * Update many of the specified resource
     */
    public function updateMany(Request $request) {
        $data = $request->validate([
            'barcode' => ['sometimes', 'required', 'string', 'digits_between:8,13', 'unique:products,barcode'],
            'name' => ['sometimes', 'required', 'string'],
            'price' => ['sometimes', 'required', 'numeric'],
            'category_id' => ['sometimes', 'required', 'exists:product_categories,id']
        ]);

        if (is_array($request->ids)) {
            Product::whereIn('id', $request->ids)->update($data);
            return response(["data" => $request->ids], 200);
        } else {
            return response([], 400);
        }
    }
}
