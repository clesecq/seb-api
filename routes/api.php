<?php

use App\Http\Controllers\AccountCountsController;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\TokensController;
use App\Http\Controllers\ProfileController;
use App\Http\Controllers\UsersController;
use App\Http\Controllers\MembersController;
use App\Http\Controllers\ProductsController;
use App\Http\Controllers\ProductCategoriesController;
use App\Http\Controllers\AccountsController;
use App\Http\Controllers\ArchivedMembersController;
use App\Http\Controllers\DashboardController;
use App\Http\Controllers\TransactionsController;
use App\Http\Controllers\TransactionCategoriesController;
use App\Http\Controllers\MovementsController;
use App\Http\Controllers\PermissionsController;
use App\Http\Controllers\ProductCountsController;
use App\Http\Controllers\PurchasesController;
use App\Http\Controllers\SalesController;
use App\Http\Controllers\StatsController;
use App\Http\Controllers\TransfertsController;

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
    Route::get("stats", [StatsController::class, 'stats']);

    // Editing a profile should be allowed only when logged in via session
    Route::group(['middleware' => ['guard:web']], function () {
        Route::put("profile/me", [ProfileController::class, 'update']);

        Route::get("tokens", [TokensController::class, 'list']);
        Route::post("tokens", [TokensController::class, 'create']);
        Route::delete("tokens/{token}", [TokensController::class, 'delete']);
        Route::delete("tokens", [TokensController::class, 'clear']);
    });

    Route::get("profile/me", [ProfileController::class, 'show']);
    Route::get("dashboard/me", [DashboardController::class, 'dashboard']);
    Route::res("users", UsersController::class);
    Route::res("members", MembersController::class, ['archive']);
    Route::res("archived_members", ArchivedMembersController::class, ['readonly']);
    Route::res("purchases", PurchasesController::class, ['final']);
    Route::res("products", ProductsController::class, ['reload']);
    Route::res("products_counts", ProductCountsController::class, ['final']);
    Route::res("products_categories", ProductCategoriesController::class);
    Route::res("movements", MovementsController::class, ['final']);
    Route::res("accounts", AccountsController::class, ['reload']);
    Route::res("accounts_counts", AccountCountsController::class, ['final']);
    Route::res("transactions_categories", TransactionCategoriesController::class);
    Route::res("transactions", TransactionsController::class, ['final']);
    Route::res("transferts", TransfertsController::class, ['final']);
    Route::res("sales", SalesController::class, ['final']);
});
