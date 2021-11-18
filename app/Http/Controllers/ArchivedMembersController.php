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
        return $this->commonIndex($request, ArchivedMember::class, [
            "person_id" => "equals:person_id",
            "paid" => "has:transaction"
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
        return ['data' => ArchivedMember::findOrFail($id)];
    }
}
