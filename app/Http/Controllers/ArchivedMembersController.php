<?php

namespace App\Http\Controllers;

use App\Models\ArchivedMember;
use Illuminate\Http\Request;

class ArchivedMembersController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index(Request $request)
    {
        if (is_array($request->ids)) {
            return ["data" => ArchivedMember::whereIn('id', $request->ids)->get()];
        } else {
            $data = ArchivedMember::orderBy($request->order_by ?? 'id', $request->order_sort ?? 'asc');
            if (is_array($request->filter)) {
                foreach ($request->filter as $k => $v) {
                    if ($k == 'payed') {
                        if ($v) {
                            $data = $data->whereNotNull('transaction_id');
                        } else {
                            $data = $data->whereNull('transaction_id');
                        }
                    } else
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
     * Display the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function show($id)
    {
        return ['data' => ArchivedMember::findOrFail($id)];
    }
}
