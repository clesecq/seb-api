<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\AuthController;
use App\Http\Controllers\ProfileController;
use App\Http\Controllers\UsersController;
use App\Http\Controllers\MembersController;
use App\Http\Controllers\ProductsController;
use App\Http\Controllers\ProductCategoriesController;
use App\Http\Controllers\AccountsController;
use App\Http\Controllers\TransactionsController;
use App\Http\Controllers\TransactionCategoriesController;
use App\Http\Controllers\MovementsController;
use App\Http\Controllers\PermissionsController;
use App\Http\Controllers\SalesController;

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

Route::group(['middleware' => ['auth:sanctum']], function () {
    Route::get("permissions", [PermissionsController::class, 'index']);

    // Editing a profile should be allowed only when logged in via session
    Route::group(['middleware' => ['guard:web']], function () {
        Route::get("profile/me", [ProfileController::class, 'show']);
        Route::put("profile/me", [ProfileController::class, 'update']);
    });

    Route::res("users", UsersController::class);
    Route::res("members", MembersController::class);
    Route::res("products", ProductsController::class, "true");
    Route::res("products_categories", ProductCategoriesController::class);
    Route::res("movements", MovementsController::class);
    Route::res("accounts", AccountsController::class, true);
    Route::res("transactions_categories", TransactionCategoriesController::class);
    Route::res("transactions", TransactionsController::class);
    Route::res("sales", SalesController::class);
});
