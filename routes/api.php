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
use App\Http\Controllers\TransactionsController;
use App\Http\Controllers\MovementsController;

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

    Route::group(['middleware' => ['permission:users']], function () {
        Route::delete("users", [UsersController::class, "destroyMany"]);
        Route::put("users", [UsersController::class, "updateMany"]);
        Route::resource("users", UsersController::class);
    });

    Route::group(['middleware' => ['permission:members']], function () {
        Route::delete("members", [MembersController::class, "destroyMany"]);
        Route::put("members", [MembersController::class, "updateMany"]);
        Route::resource("members", MembersController::class);
    });
    
    Route::group(['middleware' => ['permission:products']], function () {
        Route::delete("products", [ProductsController::class, "destroyMany"]);
        Route::put("products", [ProductsController::class, "updateMany"]);
        Route::resource("products", ProductsController::class);

        Route::delete("products_categories", [ProductCategoriesController::class, "destroyMany"]);
        Route::put("products_categories", [ProductCategoriesController::class, "updateMany"]);
        Route::resource("products_categories", ProductCategoriesController::class);

        Route::resource("movements", MovementsController::class);
    });

    Route::group(['middleware' => ['permission:accounts']], function () {
        Route::delete("accounts", [AccountsController::class, "destroyMany"]);
        Route::get("accounts/reload", [AccountsController::class, "reload"]);
        Route::put("accounts", [AccountsController::class, "updateMany"]);
        Route::resource("accounts", AccountsController::class);

        Route::delete("transactions", [TransactionsController::class, "destroyMany"]);
        Route::put("transactions", [TransactionsController::class, "updateMany"]);
        Route::resource("transactions", TransactionsController::class);
    });
});
