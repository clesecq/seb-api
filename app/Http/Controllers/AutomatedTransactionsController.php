<?php

namespace App\Http\Controllers;

use App\Models\AutomatedTransaction;
use Illuminate\Validation\Rule;
use Illuminate\Http\Request;

class AutomatedTransactionsController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index(Request $request)
    {
        return $this->commonIndex($request, AutomatedTransaction::class, [
            "name" => "like:name",
            "account_id" => "equals:account_id",
            "category_id" => "equals:category_id",
            "user_id" => "equals:user_id",
            "rectification" => "equals:rectification"
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
            "frequency" => ['required', Rule::in(["yearly", "monthly", "weekly", "dayly"])],
            "day" => ['required', 'numeric', 'integer']
        ]);

        $data['user_id'] = $request->user()->id;

        return ['data' => AutomatedTransaction::create($data)];
    }

    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function show($id)
    {
        return ['data' => AutomatedTransaction::findOrFail($id)];
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
            'amount' => ['sometimes', 'required', 'numeric'],
            'rectification' => ['sometimes', 'required', 'boolean'],
            'account_id' => ['sometimes', 'required', 'exists:accounts,id'],
            'category_id' => ['sometimes', 'required', 'exists:transaction_categories,id'],
            "frequency" => ['sometimes', 'required', Rule::in(["yearly", "monthly", "weekly", "dayly"])],
            "day" => ['sometimes', 'required', 'numeric', 'integer']
        ]);

        // The last user to edit the automated transaction is the one responsible for it.
        $data['user_id'] = $request->user()->id;

        $automated_transaction = AutomatedTransaction::findOrFail($id);
        $automated_transaction->update($data);
        return ['data' => $automated_transaction];
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
        $automated_transaction = AutomatedTransaction::findOrFail($id);
        $automated_transaction->delete();
        return ['data' => $automated_transaction];
    }

    /**
     * Destroy many of the specified resource
     */
    public function destroyMany(Request $request)
    {
        if (is_array($request->ids)) {
            AutomatedTransaction::whereIn('id', $request->ids)->get()->each(function ($at) {
                $at->delete();
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
            'amount' => ['sometimes', 'required', 'numeric'],
            'rectification' => ['sometimes', 'required', 'boolean'],
            'account_id' => ['sometimes', 'required', 'exists:accounts,id'],
            'category_id' => ['sometimes', 'required', 'exists:transaction_categories,id'],
            "frequency" => ['sometimes', 'required', Rule::in(["yearly", "monthly", "weekly", "dayly"])],
            "day" => ['sometimes', 'required', 'numeric', 'integer']
        ]);

        // The last user to edit the automated transaction is the one responsible for it.
        $data['user_id'] = $request->user()->id;

        if (is_array($request->ids)) {
            AutomatedTransaction::whereIn('id', $request->ids)->get()
                ->each(function ($automated_transaction) use ($data) {
                    $automated_transaction->update($data);
                });
            return response(["data" => $request->ids], 200);
        } else {
            return response([], 400);
        }
    }
}
