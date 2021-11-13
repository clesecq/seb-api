<?php

namespace App\Http\Controllers;

use App\Models\Member;
use App\Models\Person;
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
        if (is_array($request->ids)) {
            return ["data" => Person::whereIn('id', $request->ids)->get()];
        } else {
            $data = Person::orderBy($request->order_by ?? 'id', $request->order_sort ?? 'asc');
            if (is_array($request->filter)) {
                foreach ($request->filter as $k => $v) {
                    if ($k == 'fullname') {
                        $data = $data->where(DB::raw("CONCAT(`firstname`, ' ', `lastname`)"), 'like', '%' . $v . '%');
                    } elseif ($k == 'is_member') {
                        if ($v) {
                            $data = $data->has('member');
                        } else {
                            $data = $data->doesntHave('member');
                        }
                    } elseif ($k == 'has_account') {
                        if ($v) {
                            $data = $data->has('personal_account');
                        } else {
                            $data = $data->doesntHave('personal_account');
                        }
                    } else {
                        $data = $data->where($k, 'like', '%' . $v . '%');
                    }
                }
            }
            if (!is_null($request->per_page)) {
                $data = $data->paginate((int) $request->per_page);
            } else {
                $data = ["data" => $data->get(), "total" => $data->count()];
            }
            return $data;
        }
    }

    /**
     * Store a newly created resource in storage.
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
            'personal_account.personal_transactions.transaction:id,name,amount,rectification,created_at,updated_at'
        )->findOrFail($id)->makeVisible('edu_token')->makeHidden('fullname')];
    }
}
