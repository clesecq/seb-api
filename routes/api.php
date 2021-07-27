<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\AuthController;
use App\Http\Controllers\UserController;
use App\Http\Controllers\UsersController;
use App\Http\Controllers\MembersController;
use App\Http\Controllers\ProductsController;
use App\Http\Controllers\ProductCategoriesController;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/

Route::prefix('auth')->group(function() {
    Route::post('login', [AuthController::class, 'login']);
    Route::get('logout', [AuthController::class, 'logout']);
});

Route::group(['middleware' => ['auth:sanctum']], function () {
    Route::get("auth/check", function() {
        return response(["message" => "ok"], 200);
    });
    Route::get("user", [UserController::class, 'show']);
    Route::put("user", [UserController::class, 'update']);

    Route::resource("users", UsersController::class)->middleware("permission:users");
    Route::resource("members", MembersController::class)->middleware("permission:members");
    Route::resource("products", ProductsController::class)->middleware("permission:products");
    Route::resource("products/categories", ProductCategoriesController::class)->middleware("permission:products");
});
