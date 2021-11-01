<?php

namespace App\Observers;

use App\Services\Gateway;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Facades\App;

class GatewayObserver
{
    /**
     * Handle the Model "created" event.
     *
     * @param  \Illuminate\Database\Eloquent\Model  $model
     * @return void
     */
    public function created(Model $model)
    {
        App::make(Gateway::class)->event("create", $model::class, $model->attributesToArray());
    }

    /**
     * Handle the Model "updated" event.
     *
     * @param  \Illuminate\Database\Eloquent\Model  $person
     * @return void
     */
    public function updated(Model $model)
    {
        App::make(Gateway::class)->event("update", $model::class, $model->attributesToArray());
    }

    /**
     * Handle the Person "deleted" event.
     *
     * @param  \Illuminate\Database\Eloquent\Model  $person
     * @return void
     */
    public function deleted(Model $model)
    {
        App::make(Gateway::class)->event("destroy", $model::class, $model->attributesToArray());
    }

    /**
     * Handle the Model "force deleted" event.
     *
     * @param  \Illuminate\Database\Eloquent\Model  $person
     * @return void
     */
    public function forceDeleted(Model $model)
    {
        App::make(Gateway::class)->event("destroy", $model::class, $model->attributesToArray());
    }
}
