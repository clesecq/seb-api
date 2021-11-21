<?php

namespace App\Http\Controllers;

use App\Models\Account;
use App\Models\Config;
use App\Models\Transaction;
use App\Models\Transfert;
use Illuminate\Http\Request;

class TransfertsController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index(Request $request)
    {
        return $this->commonIndex($request, Transfert::class);
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        // Validate the data
        $data = $request->validate([
            'amount' => ['required', 'numeric', 'min:0'],
            'from_account_id' => ['required', 'exists:accounts,id'],
            'to_account_id' => ['required', 'exists:accounts,id', 'different:from_account_id']
        ]);

        $from_account = Account::findOrFail($data['from_account_id']);
        $to_account = Account::findOrFail($data['to_account_id']);

        $transfert = Transfert::create();

        // Create the from transaction
        $sub_transaction = Transaction::create([
            'name' => Config::format("transferts.transaction", ["transfert" => $transfert->attributesToArray()]),
            'amount' => -$data['amount'],
            'rectification' => false,
            'account_id' => $data['from_account_id'],
            'category_id' => Config::integer('transferts.category'),
            'user_id' => $request->user()->id
        ]);

        // Create the to transaction
        $add_transaction = Transaction::create([
            'name' => Config::format("transferts.transaction", ["transfert" => $transfert->attributesToArray()]),
            'amount' => $data['amount'],
            'rectification' => false,
            'account_id' => $data['to_account_id'],
            'category_id' => Config::integer('transferts.category'),
            'user_id' => $request->user()->id
        ]);

        $transfert->sub_transaction_id = $sub_transaction->id;
        $transfert->add_transaction_id = $add_transaction->id;
        $transfert->save();

        return ['data' => $transfert];
    }

    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function show($id)
    {
        return ['data' => Transfert::with(['sub_transaction', 'add_transaction'])->findOrFail($id)];
    }
}
