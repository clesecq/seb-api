<?php

namespace App\Http\Controllers;

use App\Models\Transaction;
use Illuminate\Http\Request;

class TransactionsController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index(Request $request)
    {
        return $this->commonIndex($request, Transaction::class, [
            'name' => "like:name",
            'rectification' => 'equals:rectification',
            'user_id' => 'equals:user_id',
            'account_id' => 'equals:account_id',
            'category_id' => 'equals:category_id'
        ]);
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
            'amount' => ['required', 'numeric'],
            'rectification' => ['sometimes', 'required', 'boolean'],
            'account_id' => ['required', 'exists:accounts,id'],
            'category_id' => ['required', 'exists:transaction_categories,id'],
        ]);

        $data['user_id'] = $request->user()->id;

        return ['data' => Transaction::create($data)];
    }

    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function show($id)
    {
        return ['data' => Transaction::findOrFail($id)];
    }
}
