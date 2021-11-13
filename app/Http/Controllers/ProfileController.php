<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;

class ProfileController extends Controller
{
    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function show(Request $request)
    {
        $data = $request->user()->toArray();
        $data['id'] = 'me';
        $data['two_factor'] = $request->user()->two_factor_secret !== null;

        $tokens = [];

        foreach ($request->user()->tokens as $token) {
            $tokens[] = $token->only(['id', 'name', 'last_used_at', 'created_at']);
        }

        $data['tokens'] = $tokens;
        $data["firstname"] = $request->user()->person->firstname;
        $data["lastname"] = $request->user()->person->lastname;
        return ["data" => $data];
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request)
    {
        $data = $request->validate([
            'username' => ['sometimes', 'required', 'string', 'unique:users,username'],
            'firstname' => ['sometimes', 'required', 'string'],
            'lastname' => ['sometimes', 'required', 'string'],
            'email' => ['sometimes', 'required', 'email', 'unique:users,email']
        ]);

        if (array_key_exists('password', $data)) {
            $data['password'] = Hash::make($data['password']);
        }

        $request->user()->update($data);
        $request->user()->person->update($data);
        return $this->show($request);
    }
}
