<?php

namespace App\Http\Controllers;

use App\Models\Account;
use App\Models\AccountCount;
use App\Models\Config;
use App\Models\Transaction;
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
        if (is_array($request->ids)) {
            return ["data" => AccountCount::with('transaction')->whereIn('id', $request->ids)->get()];
        } else {
            $data = AccountCount::with('transaction')->orderBy($request->order_by ?? 'id', $request->order_sort ?? 'asc');
            if (is_array($request->filter)) {
                foreach ($request->filter as $k => $v) {
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
            'account_id' => ['required', 'exists:accounts,id'],
            'type' => ['required', 'string', Rule::in(['cash', 'value'])],
            'data' => ['required', 'array']
        ]);

        $account = Account::findOrFail($data["account_id"]);
        $amount = 0;

        if ($data["type"] == 'cash')  {
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

            foreach($cash["data"] as $value => $count) {
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
        return ['data' => AccountCount::with('transaction')->findOrFail($id)];
    }
}
