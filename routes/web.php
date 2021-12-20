<?php

use Illuminate\Support\Facades\Route;
use Illuminate\Support\Facades\URL;

Route::group([], function () {
    $url = config('app.url');
    URL::forceRootUrl($url);

    Route::get('/reset-password/{token}', function () {
        return "";
    })->name('password.reset');
});
