<?php

namespace App\Http\Controllers;

use App\Models\Product;
use App\Models\User;
use App\Notifications\UserCreated;
use App\Services\Gateway;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\App;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Password;

class UsersController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index(Request $request)
    {
        if (is_array($request->ids)) {
            return ["data" => User::whereIn('id', $request->ids)->get()];
        } else {
            $data = User::orderBy($request->order_by ?? 'id', $request->order_sort ?? 'asc');
            if (is_array($request->filter)) {
                foreach ($request->filter as $k => $v) {
                    $data = $data->where($k, 'like', '%' . $v . '%');
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
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        $data = $request->validate([
            'username' => ['required', 'string', 'unique:users,username'],
            'firstname' => ['required', 'string'],
            'lastname' => ['required', 'string'],
            'email' => ['required', 'email', 'unique:users,email'],
            'permissions' => ['required', 'array'],
            'permissions.*' => ['string', "distinct"]
        ]);
        $data['password'] = "";
        $user = User::create($data);

        $token = Password::broker(config('fortify.passwords'))->createToken($user);

        $user->notify(new UserCreated($user, $token));

        return ['data' => $user];
    }

    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function show($id)
    {
        return ['data' => User::findOrFail($id)];
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
        if ($id == $request->user()->id) {
            return response([
                'message' => 'Please use the profile endpoint to update yourself.'
            ], 400);
        }

        $data = $request->validate([
            'username' => ['sometimes', 'required', 'string', 'unique:users,username'],
            'firstname' => ['sometimes', 'required', 'string'],
            'lastname' => ['sometimes', 'required', 'string'],
            'email' => ['sometimes', 'required', 'email', 'unique:users,email'],
            'permissions' => ['required', 'array'],
            'permissions.*' => ['string', "distinct"]
        ]);

        if (array_key_exists('password', $data)) {
            $data['password'] = Hash::make($data['password']);
        }

        User::findOrFail($id)->update($data);
        return ['data' => User::findOrFail($id)];
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy(Request $request, $id)
    {
        if ($id == $request->user()->id) {
            return response([
                'message' => 'You can\'t delete your own account.'
            ], 400);
        }

        $user = User::findOrFail($id);
        $user->delete();
        return ['data' => $user];
    }

    /**
     * Destroy many of the specified resource
     */
    public function destroyMany(Request $request)
    {
        if (is_array($request->ids)) {
            if (in_array($request->user()->id, $request->ids)) {
                return response([
                    'message' => 'You can\'t delete your own account.'
                ], 400);
            }

            User::whereIn('id', $request->ids)->delete();
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
            'name' => ['sometimes', 'required', 'string'],
            'email' => ['sometimes', 'required', 'email', 'unique:users,email'],
            'permissions' => ['required', 'array'],
            'permissions.*' => ['string', 'exists:permissions,id', "distinct"]
        ]);

        if (is_array($request->ids)) {
            if (in_array($request->user()->id, $request->ids)) {
                return response([
                    'message' => 'Please use the profile endpoint to update yourself.'
                ], 400);
            }

            Product::whereIn('id', $request->ids)->update($data);
            return response(["data" => $request->ids], 200);
        } else {
            return response([], 400);
        }
    }
}
