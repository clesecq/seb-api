<?php

namespace App\Http\Controllers;

use Database\Models\Account;
use Database\Models\AccountCount;
use Database\Models\Config;
use Database\Models\Transaction;
use Illuminate\Http\Request;
use Illuminate\Validation\Rule;

class AccountCountsController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index(Request $request)
    {
        return $this->commonIndex($request, AccountCount::class);
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
            'account_id' => ['required', 'exists:accounts,id'],
            'type' => ['required', 'string', Rule::in(['cash', 'value'])],
            'data' => ['required', 'array']
        ]);

        $account = Account::findOrFail($data["account_id"]);
        $amount = 0;

        if ($data["type"] == 'cash') {
            $cash_rule = ['required', 'sometimes', 'numeric', 'integer', 'min:0'];
            $cash = $request->validate([
                'data.500' => $cash_rule,
                'data.200' => $cash_rule,
                'data.100' => $cash_rule,
                'data.50' => $cash_rule,
                'data.20' => $cash_rule,
                'data.10' => $cash_rule,
                'data.5' => $cash_rule,
                'data.2' => $cash_rule,
                'data.1' => $cash_rule,
                'data.0\\.5' => $cash_rule,
                'data.0\\.2' => $cash_rule,
                'data.0\\.1' => $cash_rule,
                'data.0\\.05' => $cash_rule,
                'data.0\\.02' => $cash_rule,
                'data.0\\.01' => $cash_rule
            ]);

            foreach ($cash["data"] as $value => $count) {
                $amount += doubleval($value) * $count;
            }

            $data["data"] = $cash["data"];
        } elseif ($data["type"] == 'value') {
            $cash = $request->validate([
                'data.amount' => ['required', 'numeric']
            ]);
            $amount = doubleval($cash["data"]["amount"]);
            $data["data"] = $cash["data"];
        } else {
            abort(500); // Achievement unlocked: How did we get there ?
        }

        $account->recalculate();
        $diff = $amount - $account->balance;

        $count = AccountCount::create([
            'type' => $data['type'],
            'data' => $data['data'],
            'balance' => $amount
        ]);

        $transaction = Transaction::create([
            'name' => Config::format('counts.transaction', ['count' => $count->toArray()]),
            'amount' => $diff,
            'rectification' => true,
            'user_id' => $request->user()->id,
            'account_id' => $account->id,
            'category_id' => Config::integer('counts.category')
        ]);

        $count->transaction_id = $transaction->id;
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
        return ['data' => AccountCount::findOrFail($id)];
    }
}
