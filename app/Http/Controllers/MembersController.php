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
    public function index(Request $request)
    {
        if (is_array($request->ids)) {
            return ["data" => Member::whereIn('id', $request->ids)->get()];
        } else {
            $data = Member::orderBy($request->order_by ?? 'id', $request->order_sort ?? 'asc');
            if (is_array($request->filter)) {
                foreach($request->filter as $k => $v) {
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
            'firstname' => ['required', 'string'],
            'lastname' => ['required', 'string'],
            'email' => ['required', 'email', 'unique:members,email'],
            'payed' => ['sometimes', 'required', 'boolean'],
            'card' => ['required', 'string', 'unique:members,card']
        ]);

        return ['data' => Member::create($data)];
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
            'firstname' => ['sometimes', 'required', 'string'],
            'lastname' => ['sometimes', 'required', 'string'],
            'email' => ['sometimes', 'required', 'email', 'unique:members,email'],
            'payed' => ['sometimes', 'required', 'boolean'],
            'card' => ['sometimes', 'required', 'string', 'unique:members,card']
        ]);

        Member::findOrFail($id)->update($data);
        return ['data' => Member::findOrFail($id)];
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
    public function destroyMany(Request $request) {
        if (is_array($request->ids)) {
            Member::whereIn('id', $request->ids)->delete();
            return response(["data" => $request->ids], 200);
        } else {
            return response([], 400);
        }
    }

    /**
     * Update many of the specified resource
     */
    public function updateMany(Request $request) {
        $data = $request->validate([
            'firstname' => ['sometimes', 'required', 'string'],
            'lastname' => ['sometimes', 'required', 'string'],
            'email' => ['sometimes', 'required', 'email', 'unique:members,email'],
            'payed' => ['sometimes', 'required', 'boolean'],
            'card' => ['sometimes', 'required', 'string', 'unique:members,card']
        ]);

        if (is_array($request->ids)) {
            Member::whereIn('id', $request->ids)->get()->each(function($member) use ($data) {
                $member->update($data);
            });
            return response(["data" => $request->ids], 200);
        } else {
            return response([], 400);
        }
    }
}
