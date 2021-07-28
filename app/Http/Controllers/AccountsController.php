<?php

namespace App\Http\Controllers;

use App\Models\Account;
use Illuminate\Http\Request;

class AccountsController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index(Request $request)
    {
        if (is_array($request->ids)) {
            return ["data" => Account::whereIn('id', $request->ids)->get()];
        } else {
            $data = Account::orderBy($request->order_by ?? 'id', $request->order_sort ?? 'asc');
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
        $data = $request->validate([
            'name' => ['required', 'string'],
            'iban' => ['sometimes', 'required', 'string', 'nullable'],
            'bic' => ['sometimes', 'required', 'string', 'nullable']
        ]);

        return ['data' => Account::create($data)];
    }

    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function show($id)
    {
        return ['data' => Account::findOrFail($id)];
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
            'iban' => ['sometimes', 'required', 'string', 'nullable'],
            'bic' => ['sometimes', 'required', 'string', 'nullable']
        ]);

        Account::findOrFail($id)->update($data);
        return ['data' => Account::findOrFail($id)];
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
        $account = Account::findOrFail($id);
        $account->delete();
        return ['data' => $account];
    }

    /**
     * Destroy many of the specified resource
     */
    public function destroyMany(Request $request) {
        if (is_array($request->ids)) {
            Account::whereIn('id', $request->ids)->delete();
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
            'name' => ['sometimes', 'required', 'string'],
            'iban' => ['sometimes', 'required', 'string', 'nullable'],
            'bic' => ['sometimes', 'required', 'string', 'nullable']
        ]);

        if (is_array($request->ids)) {
            Account::whereIn('id', $request->ids)->update($data);
            return response(["data" => $request->ids], 200);
        } else {
            return response([], 400);
        }
    }

    /**
     * Recalculates the amount stored in the accounts
     */
    public function reload(Request $request) {
        foreach(Account::all() as $account) {
            $account->recalculate();
        }
    }
}
