<?php

namespace App\Http\Controllers;

use App\Models\PersonalTransaction;
use Illuminate\Http\Request;

class PersonalTransactionsController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index(Request $request)
    {
        return $this->commonIndex($request, PersonalTransaction::class, [
            'user_id' => "equals:user_id",
            'personal_account_id' => "equals:personal_account_id"
        ]);
    }

    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function show($id)
    {
        return ['data' => PersonalTransaction::findOrFail($id)];
    }
}
