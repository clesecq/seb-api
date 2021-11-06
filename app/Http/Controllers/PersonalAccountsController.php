<?php

namespace App\Http\Controllers;

use App\Models\Person;
use App\Models\PersonalAccount;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class PersonalAccountsController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index(Request $request)
    {
        if (is_array($request->ids)) {
            return ["data" => PersonalAccount::with('person')->whereIn('id', $request->ids)->get()];
        } else {
            $data = PersonalAccount::with('person')->orderBy($request->order_by ?? 'id', $request->order_sort ?? 'asc');
            if (is_array($request->filter)) {
                foreach ($request->filter as $k => $v) {
                    if ($k == 'fullname') {
                        $data->whereHas('person', function($query) use ($v) {
                            // Todo: create a view ?
                            $query->where(DB::raw('CONCAT(firstname, " ", lastname)'), 'like', '%' . $v . '%');
                        });
                    } else {
                        $data = $data->where($k, 'like', '%' . $v . '%');
                    }
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
            'person_id' => ['required', 'exists:people,id', 'unique:personal_accounts,person_id'],
            'token' => ['required', 'uuid', 'unique:people,edu_token']
        ]);

        $person = Person::findOrFail($data['person_id']);
        $person->edu_token = $data['token'];
        $person->save();

        return ['data' => PersonalAccount::create($data)];
    }

    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function show($id)
    {
        if (is_numeric($id)) {
            return ['data' => PersonalAccount::with('person')->findOrFail($id)];
        } else {
            return ['data' => Person::where('edu_token', $id)->firstOrFail()->personal_account->load('person')];
        }
    }
}
