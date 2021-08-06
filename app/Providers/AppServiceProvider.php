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

        Route::macro('res', function ($name, $controller, $options = []) {
            if (in_array('reload', $options)) {
                Route::get($name . "/reload", [$controller, "reload"])->middleware('permission:' . $name . '.reload');
            }

            if (!in_array('final', $options)) {
                Route::delete($name . "/{id}", [$controller, "destroy"])->middleware('permission:' . $name . '.delete');
                Route::delete($name, [$controller, "destroyMany"])->middleware('permission:' . $name . '.delete');
                Route::put($name . "/{id}", [$controller, "update"])->middleware('permission:' . $name . '.update');
                Route::put($name, [$controller, "updateMany"])->middleware('permission:' . $name . '.update');
            }

            Route::get($name, [$controller, "index"])->middleware('permission:' . $name . '.show');
            Route::get($name . "/{id}", [$controller, "show"])->middleware('permission:' . $name . '.show');
            Route::post($name, [$controller, "store"])->middleware('permission:' . $name . '.create');
        });
    }
}
