<?php

namespace App\Http\Controllers;

use App\Models\Movement;
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
        if (is_array($request->ids)) {
            return ["data" => Movement::whereIn('id', $request->ids)->get()];
        } else {
            $data = Movement::orderBy($request->order_by ?? 'id', $request->order_sort ?? 'asc');
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
     * Display the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function show($id)
    {
        return ['data' => Movement::with(['products', 'products.product'])->findOrFail($id)];
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
        abort(405);
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
        abort(405);
    }

    /**
     * Destroy many of the specified resource
     */
    public function destroyMany(Request $request) {
        abort(405);
    }

    /**
     * Update many of the specified resource
     */
    public function updateMany(Request $request) {
        abort(405);
    }
}
