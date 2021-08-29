<?php

use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| contains the "web" middleware group. Now create something great!
|
*/

Route::get('/api{any}', function () {
    return response(["message" => "Not found"], 404);
})->where('any', '.*');

Route::get('/{any}', function () {
    return view('app');
})->where('any', '.*');

Route::get('/reset-password/{token}', function () {
    return view('app');
})->name('password.reset');