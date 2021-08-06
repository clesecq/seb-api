<?php

namespace App\Providers;

use Illuminate\Support\Facades\Route;
use Illuminate\Support\ServiceProvider;
use Laravel\Fortify\Fortify;

class AppServiceProvider extends ServiceProvider
{
    /**
     * Register any application services.
     *
     * @return void
     */
    public function register()
    {
        //
    }

    /**
     * Bootstrap any application services.
     *
     * @return void
     */
    public function boot()
    {
        Fortify::loginView(function () {
            return view('app');
        });

        Route::macro('res', function ($name, $controller, $reload = false) {
            if ($reload) {
                Route::get($name . "/reload", [$controller, "reload"])->middleware('permission:' . $name . '.reload');
            }

            Route::delete($name, [$controller, "destroyMany"])->middleware('permission:' . $name . '.destroy');
            Route::put($name, [$controller, "updateMany"])->middleware('permission:' . $name . '.update');
            Route::get($name, [$controller, "index"])->middleware('permission:' . $name . '.list');
            Route::post($name, [$controller, "store"])->middleware('permission:' . $name . '.store');
            Route::get($name . "/{id}", [$controller, "show"])->middleware('permission:' . $name . '.show');
            Route::put($name . "/{id}", [$controller, "update"])->middleware('permission:' . $name . '.update');
            Route::delete($name . "/{id}", [$controller, "destroy"])->middleware('permission:' . $name . '.destroy');
        });
    }
}
