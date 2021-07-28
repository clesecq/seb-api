<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\AuthController;
use App\Http\Controllers\UserController;
use App\Http\Controllers\UsersController;
use App\Http\Controllers\MembersController;
use App\Http\Controllers\ProductsController;
use App\Http\Controllers\ProductCategoriesController;
use App\Http\Controllers\AccountsController;

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

    Route::delete("users", [UsersController::class, "destroyMany"])->middleware("permission:users");
    Route::put("users", [UsersController::class, "updateMany"])->middleware("permission:users");
    Route::resource("users", UsersController::class)->middleware("permission:users");

    Route::delete("members", [MembersController::class, "destroyMany"])->middleware("permission:members");
    Route::put("members", [MembersController::class, "updateMany"])->middleware("permission:members");
    Route::resource("members", MembersController::class)->middleware("permission:members");

    
    Route::delete("products", [ProductsController::class, "destroyMany"])->middleware("permission:products");
    Route::put("products", [ProductsController::class, "updateMany"])->middleware("permission:products");
    Route::resource("products", ProductsController::class)->middleware("permission:products");

    Route::delete("products_categories", [ProductCategoriesController::class, "destroyMany"])->middleware("permission:products");
    Route::put("products_categories", [ProductCategoriesController::class, "updateMany"])->middleware("permission:products");
    Route::resource("products_categories", ProductCategoriesController::class)->middleware("permission:products");

    Route::delete("accounts", [AccountsController::class, "destroyMany"])->middleware("permission:accounts");
    Route::put("accounts", [AccountsController::class, "updateMany"])->middleware("permission:accounts");
    Route::resource("accounts", AccountsController::class)->middleware("permission:accounts");
});
