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
use App\Http\Controllers\AutomatedTransactionsController;
use App\Http\Controllers\DashboardController;
use App\Http\Controllers\EventsController;
use App\Http\Controllers\TransactionsController;
use App\Http\Controllers\TransactionCategoriesController;
use App\Http\Controllers\MovementsController;
use App\Http\Controllers\ParticipationsController;
use App\Http\Controllers\PeopleController;
use App\Http\Controllers\PermissionsController;
use App\Http\Controllers\PersonalAccountsController;
use App\Http\Controllers\PersonalRefillsController;
use App\Http\Controllers\PersonalTransactionsController;
use App\Http\Controllers\ProductCountsController;
use App\Http\Controllers\PurchasesController;
use App\Http\Controllers\SalesController;
use App\Http\Controllers\StatsController;
use App\Http\Controllers\TransfertsController;
use App\Models\Account;
use App\Models\AccountCount;
use App\Models\ArchivedMember;
use App\Models\AutomatedTransaction;
use App\Models\Member;
use App\Models\Movement;
use App\Models\Person;
use App\Models\PersonalAccount;
use App\Models\PersonalTransaction;
use App\Models\Product;
use App\Models\ProductCategory;
use App\Models\ProductCount;
use App\Models\Purchase;
use App\Models\Sale;
use App\Models\Transaction;
use App\Models\TransactionCategory;
use App\Models\Transfert;
use App\Models\User;
use Database\Models\Event;

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

// @codingStandardsIgnoreStart
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

    Route::get("dashboard/home", [DashboardController::class, 'home']);
    Route::get("dashboard/accounts", [DashboardController::class, 'accounts'])->middleware('permission:accounts.show');
    Route::get("dashboard/products", [DashboardController::class, 'products'])->middleware('permission:sales.show');
    Route::get("dashboard/sellers", [DashboardController::class, 'sellers'])->middleware('permission:users.show');

    Route::res("users", User::class, UsersController::class);
    Route::res("people", Person::class, PeopleController::class, ['export']);
    Route::res("members", Member::class, MembersController::class, ['archive']);
    Route::res("archived_members", ArchivedMember::class, ArchivedMembersController::class, ['readonly']);
    Route::res("purchases", Purchase::class, PurchasesController::class, ['final']);
    Route::res("products", Product::class, ProductsController::class, ['reload']);
    Route::res("products_counts", ProductCount::class, ProductCountsController::class, ['final']);
    Route::res("products_categories", ProductCategory::class, ProductCategoriesController::class);
    Route::res("movements", Movement::class, MovementsController::class, ['final']);
    Route::res("accounts", Account::class, AccountsController::class, ['reload']);
    Route::res("accounts_counts", AccountCount::class, AccountCountsController::class, ['final']);
    Route::res("transactions_categories", TransactionCategory::class, TransactionCategoriesController::class);
    Route::res("automated_transactions", AutomatedTransaction::class, AutomatedTransactionsController::class);
    Route::res("transactions", Transaction::class, TransactionsController::class, ['final']);
    Route::res("transferts", Transfert::class, TransfertsController::class, ['final']);
    Route::res("sales", Sale::class, SalesController::class, ['final']);
    Route::res("personal_accounts", PersonalAccount::class, PersonalAccountsController::class, ['final']);
    Route::res("personal_transactions", PersonalTransaction::class, PersonalTransactionsController::class, ['readonly']);
    Route::res("personal_refills", PersonalTransaction::class, PersonalRefillsController::class, ['writeonly']);
    Route::res("events", Event::class, EventsController::class, ['final']);
    Route::res("participations", Event::class, ParticipationsController::class);
});
// @codingStandardsIgnoreEnd
