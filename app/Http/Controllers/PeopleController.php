<?php

namespace App\Http\Controllers;

use App\Models\Person;
use Illuminate\Http\Request;

class PeopleController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index(Request $request)
    {
        if (is_array($request->ids)) {
            return ["data" => Person::whereIn('id', $request->ids)->get()];
        } else {
            $data = Person::orderBy($request->order_by ?? 'id', $request->order_sort ?? 'asc');
            if (is_array($request->filter)) {
                foreach ($request->filter as $k => $v) {
                    $data = $data->where($k, 'like', '%' . $v . '%');
                }
            }
            if (!is_null($request->per_page))
                $data = $data->paginate((int) $request->per_page);
            else
                $data = ["data" => $data->get(), "total" => $data->count()];
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
            'discord_id' => ['sometimes', 'required', 'string', 'unique:people,discord_id']
        ]);

        $person = Person::create($data);

        return ['data' => $person];
    }

    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function show($id)
    {
        return ['data' => Person::findOrFail($id)];
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
            'discord_id' => ['sometimes', 'required', 'nullable', 'string', 'unique:people,discord_id']
        ]);

        $person = Person::findOrFail($id);
        $person->update($data);

        return ['data' => $person];
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
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
            Person::whereIn('id', $request->ids)->delete();
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
            'firstname' => ['sometimes', 'required', 'string'],
            'lastname' => ['sometimes', 'required', 'string'],
            'discord_id' => ['sometimes', 'required', 'nullable', 'string', 'unique:people,discord_id'],
        ]);

        if (is_array($request->ids)) {
            Person::whereIn('id', $request->ids)->get()->each(function ($person) use ($data) {
                $person->update($data);
            });
            return response(["data" => $request->ids], 200);
        } else {
            return response([], 400);
        }
    }
}
