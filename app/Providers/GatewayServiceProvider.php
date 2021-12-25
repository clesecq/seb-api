<?php

namespace App\Providers;

use App\Services\Gateway;
use Illuminate\Support\ServiceProvider;

class GatewayServiceProvider extends ServiceProvider
{
    /**
     * Register services.
     *
     * @return void
     */
    public function register()
    {
        $this->app->singleton(Gateway::class, function () {
            return new Gateway(config("gateway.enable"), config("gateway.api.url"), config("gateway.api.token"));
        });
    }

    /**
     * Bootstrap services.
     *
     * @return void
     */
    public function boot()
    {
        //
    }
}
