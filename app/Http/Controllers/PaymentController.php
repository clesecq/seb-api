<?php

namespace App\Http\Controllers;

use Database\Models\Config;
use Database\Models\Person;
use Database\Models\PersonalTransaction;
use Database\Models\Transaction;
use Illuminate\Http\Request;
use Illuminate\Validation\Rule;

class PaymentController extends Controller
{
    private function getPersonalAccount($request)
    {
        $key_data = $request->validate(['token' => ['required', function ($attribute, $value, $fail) {
            if (!Person::where('edu_token', hash('sha256', $value))->exists()) {
                $fail("Cette carte n'est pas attribuée à un compte.");
            }
        }]]);
        $person = Person::where('edu_token', hash('sha256', $key_data['token']))->firstOrFail();
        return $person->personal_account;
    }

    protected function checkPaymentData($request, $amount, $required = true)
    {
        $data = $request->validate([
            "payment" => array_merge($required ?
                [] :
                ['sometimes', 'nullable'], [$required ? 'required' : 'nullable', Rule::in(['cash', 'card', 'account'])])
        ]);

        if (!array_key_exists("payment", $data) || $data["payment"] == null) {
            return;
        }

        if ($data["payment"] == "account") {
            $paccount = $this->getPersonalAccount($request);

            if (!$paccount->exists()) {
                abort(404);
            }

            if ($paccount->balance < $amount) {
                abort(422, "Pas assez d'argent sur le compte.");
            }
        }
    }

    protected function doPayment($request, $amount, $name, $category, $required = true)
    {
        $data = $request->validate([
            "payment" => array_merge($required ?
                [] :
                ['sometimes'], [$required ? 'required' : 'nullable', Rule::in(['cash', 'card', 'account'])])
        ]);

        if (!array_key_exists("payment", $data) || $data["payment"] == null) {
            return ["transaction" => null, "person" => null];
        }

        $account_id = $data["payment"] == "account" ?
            Config::integer('personal.account') : ($data["payment"] == 'card' ?
                Config::integer('card.account') : Config::integer('sales.account'));

        // We create the transaction
        $transaction = Transaction::create([
            'name' => $name,
            'amount' => $amount,
            'rectification' => false,
            'account_id' => $account_id,
            'category_id' => $category,
            'user_id' => $request->user()->id
        ]);

        if ($data["payment"] == "card") {
            // We round the transaction fees
            // (Information given by our card payment provider).
            $a = round($amount * Config::number('card.fees.percent') * 100) / 100;

            Transaction::create([
                'name' => Config::format('card.fees.message', ['transaction' => $transaction->attributesToArray()]),
                'amount' => -$a,
                'rectification' => false,
                'account_id' => Config::integer('card.account'),
                'category_id' => Config::integer('card.fees.category'),
                'user_id' => $request->user()->id
            ]);
        } elseif ($data["payment"] == "account") {
            $t = Transaction::create([
                'name' => $name,
                'amount' => -$amount,
                'rectification' => false,
                'account_id' => Config::integer('personal.account'),
                'category_id' => Config::integer('personal.category'),
                'user_id' => $request->user()->id
            ]);

            $paccount = $this->getPersonalAccount($request);

            PersonalTransaction::create([
                'amount' => -$amount,
                'user_id' => $request->user()->id,
                'personal_account_id' => $paccount->id,
                'transaction_id' => $t->id
            ]);

            return ["person" => $paccount->person_id, "transaction" => $transaction->id];
        }

        return ["person" => null, "transaction" => $transaction->id];
    }
}
