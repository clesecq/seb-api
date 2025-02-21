<?php

namespace App\Http\Controllers;

use Database\Models\Config;
use Database\Models\Member;
use Database\Models\Person;
use Illuminate\Http\Request;

class MembersController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index(Request $request)
    {
        return $this->commonIndex($request, Member::class, [
            "person_id" => "equals:person_id",
            "paid" => "has:transaction"
        ]);
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
            'person_id' => ['required', 'exists:people,id', 'unique:members,person_id'],
            'paid' => ['sometimes', 'required', 'boolean'],
        ]);

        $member = Member::create($data);

        if (array_key_exists('paid', $data) && $data['paid']) {
            $member->pay();
        }

        return ['data' => $member, 'contribution' => Config::number('members.contribution.amount')];
    }

    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function show($id)
    {
        return ['data' => Member::findOrFail($id)];
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
            'paid' => ['sometimes', 'required', 'boolean']
        ]);

        $member = Member::findOrFail($id);

        if ($data['paid']) {
            $member->pay();
        }

        return ['data' => $member];
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
        $member = Member::findOrFail($id);
        $member->delete();
        return ['data' => $member];
    }

    /**
     * Destroy many of the specified resource
     */
    public function destroyMany(Request $request)
    {
        if (is_array($request->ids)) {
            Member::whereIn('id', $request->ids)->get()->each(function ($member) {
                $member->delete();
            });
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
        $data = $request->validate([
            'paid' => ['sometimes', 'required', 'boolean']
        ]);

        if (is_array($request->ids)) {
            Member::whereIn('id', $request->ids)->get()->each(function ($member) use ($data) {
                $member->update($data);

                if ($data['paid']) {
                    $member->pay();
                }
            });
            return response(["data" => $request->ids], 200);
        } else {
            return response([], 400);
        }
    }

    /**
     * Archive all the members.
     */
    public function archive(Request $request)
    {
        Member::archive();
    }
}
