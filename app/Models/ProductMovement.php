<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Relations\Pivot;

class ProductMovement extends Pivot
{
    use HasFactory;

    protected static function booted()
    {
        static::created(function ($movement) {
            $movement->product->recalculate();
        });
    }

    public $timestamps = false;

    protected $fillable = [
        "product_id",
        "movement_id",
        "count"
    ];

    public function product() {
        return $this->hasOne(Product::class, 'id', 'product_id');
    }
}
