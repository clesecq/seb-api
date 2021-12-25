<?php

namespace App\Http\Controllers;

use Database\Models\Member;
use Database\Models\Person;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class PeopleController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index(Request $request)
    {
        return $this->commonIndex(
            $request,
            Person::class,
            [
            "fullname" => function ($r, $k, $v) {
                return $r->where(DB::raw("CONCAT(`firstname`, ' ', `lastname`)"), 'like', '%' . $v . '%');
            },
            "is_member" => "has:member",
            "has_account" => "has:personal_account",
            "has_users" => "has:users",
            "firstname" => "like:firstname",
            "lastname" => "like:lastname",
            "discord_id" => "equals:discord_id"
            ]
        );
    }

    /**
     * Store a newly created resource in storage.
     * I
     *
     * @param  \Illuminate\Http\Request $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        $data = $request->validate(
            [
                'firstname' => ['required', 'string'],
                'lastname' => ['required', 'string'],
                'discord_id' => ['sometimes', 'required', 'string', 'unique:people,discord_id']
            ]
        );

        $person = Person::create($data);

        return ['data' => $person];
    }

    /**
     * Display the specified resource.
     *
     * @param  int $id
     * @return \Illuminate\Http\Response
     */
    public function show($id)
    {
        return ['data' => Person::findOrFail($id)];
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request $request
     * @param  int                      $id
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, $id)
    {
        $data = $request->validate(
            [
                'firstname' => ['sometimes', 'required', 'string'],
                'lastname' => ['sometimes', 'required', 'string'],
                'discord_id' => ['sometimes', 'required', 'nullable', 'string', 'unique:people,discord_id']
            ]
        );

        $person = Person::findOrFail($id);
        $person->update($data);

        return ['data' => $person];
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int $id
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
        $person = Person::findOrFail($id);
        $person->delete();
        return ['data' => $person];
    }

    /**
     * Destroy many of the specified resource
     */
    public function destroyMany(Request $request)
    {
        if (is_array($request->ids)) {
            Person::whereIn('id', $request->ids)->get()->each(
                function ($person) {
                    $person->delete();
                }
            );
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
        $data = $request->validate(
            [
                'firstname' => ['sometimes', 'required', 'string'],
                'lastname' => ['sometimes', 'required', 'string'],
                'discord_id' => ['sometimes', 'required', 'nullable', 'string', 'unique:people,discord_id'],
            ]
        );

        if (is_array($request->ids)) {
            Person::whereIn('id', $request->ids)->get()->each(
                function ($person) use ($data) {
                    $person->update($data);
                }
            );
            return response(["data" => $request->ids], 200);
        } else {
            return response([], 400);
        }
    }

    public function export($id)
    {
        return ['data' => Person::with(
            'users',
            'member',
            'member.transaction:id,name,amount,rectification,created_at,updated_at',
            'personal_account',
            'personal_account.personal_transactions:id,amount,personal_account_id,transaction_id,created_at,updated_at',
            'personal_account.personal_transactions.transaction:id,name,amount,rectification,created_at,updated_at',
            'sales',
            'sales.movement',
            'sales.movement.products',
            'sales.movement.products.product:name,id,price',
            'events',
            'events.event',
            'events.transaction:id,name,amount,rectification,created_at,updated_at',
        )->findOrFail($id)->makeVisible('edu_token')->makeHidden('fullname')];
    }
}
