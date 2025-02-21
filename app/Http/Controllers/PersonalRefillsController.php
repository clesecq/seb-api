<?php

namespace App\Http\Controllers;

use Database\Models\Config;
use Database\Models\Person;
use Database\Models\PersonalTransaction;
use Database\Models\Transaction;
use Illuminate\Http\Request;
use Illuminate\Validation\Rule;

class PersonalRefillsController extends Controller
{
    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        $data = $request->validate([
            'amount' => ['required', 'numeric'],
            'token' => ['required', function ($attribute, $value, $fail) {
                if (!Person::where('edu_token', hash('sha256', $value))->exists()) {
                    $fail("Cette carte n'est pas attribuée à un compte.");
                }
            }],
            'payment' => ['required', Rule::in(['cash', 'card'])]
        ]);

        $person = Person::where('edu_token', hash('sha256', $data['token']))->firstOrFail();
        $account = $person->personal_account;

        if (!$account->exists()) {
            abort(404);
        }

        $transaction = Transaction::create([
            'name' => Config::format('personal.refills.transaction', ['person' => $person->attributesToArray()]),
            'amount' => $data['amount'],
            'rectification' => false,
            'account_id' => $data["payment"] == 'card' ?
                Config::integer('card.account') : Config::integer('sales.account'),
            'category_id' => Config::integer('personal.category'),
            'user_id' => $request->user()->id
        ]);

        if ($data["payment"] == 'card') {
            // We round the transaction fees
            // (Information given by our card payment provider).
            $amount = round($data['amount'] * Config::number('card.fees.percent') * 100) / 100;

            Transaction::create([
                'name' => Config::format('card.fees.message', ['transaction' => $transaction->attributesToArray()]),
                'amount' => -$amount,
                'rectification' => false,
                'account_id' => Config::integer('card.account'),
                'category_id' => Config::integer('card.fees.category'),
                'user_id' => $request->user()->id
            ]);
        }

        return ['data' => PersonalTransaction::create([
            'amount' => $data['amount'],
            'user_id' => $request->user()->id,
            'personal_account_id' => $account->id,
            'transaction_id' => $transaction->id
        ])];
    }
}
