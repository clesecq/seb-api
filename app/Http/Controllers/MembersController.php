<?php

namespace App\Http\Controllers;

use App\Models\Member;
use Illuminate\Http\Request;

class MembersController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        return Member::all();
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
            'firstname' => ['required', 'string'],
            'lastname' => ['required', 'string'],
            'email' => ['required', 'email', 'unique:members,email'],
            'payed' => ['sometimes', 'required', 'boolean'],
            'card' => ['required', 'string', 'unique:members,card']
        ]);

        return Member::create($data);
    }

    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function show($id)
    {
        return Member::findOrFail($id);
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
            'firstname' => ['sometimes', 'required', 'string'],
            'lastname' => ['sometimes', 'required', 'string'],
            'email' => ['sometimes', 'required', 'email', 'unique:members,email'],
            'payed' => ['sometimes', 'required', 'boolean'],
            'card' => ['sometimes', 'required', 'string', 'unique:members,card']
        ]);

        return Member::findOrFail($id)->update($data);
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
        return Member::findOrFail($id)->delete();
    }
}
