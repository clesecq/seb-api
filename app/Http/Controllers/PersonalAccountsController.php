<?php

namespace App\Http\Controllers;

use Database\Models\Config;
use Database\Models\Person;
use Database\Models\PersonalAccount;
use Database\Models\PersonalTransaction;
use Database\Models\Transaction;
use Illuminate\Validation\Rule;
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
        return $this->commonIndex($request, PersonalAccount::class, [
            'person_id' => "equals:person_id"
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
            'person_id' => ['required', 'exists:people,id', 'unique:personal_accounts,person_id'],
            'token' => ['required', 'uuid', function ($attribute, $value, $fail) {
                if (Person::where('edu_token', hash('sha256', $value))->exists()) {
                    $fail("Cette carte est déjà attribuée à un compte.");
                }
            }]
        ]);

        $person = Person::findOrFail($data['person_id']);
        $person->edu_token = hash('sha256', $data['token']);
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
            return ['data' => Person::where('edu_token', hash('sha256', $id))->firstOrFail()
                ->personal_account->load('person')];
        }
    }
}
