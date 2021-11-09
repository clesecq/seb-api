<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Product extends Model
{
    use HasFactory;

    protected $fillable = [
        'name',
        'price',
        'category_id',
        'alert_level',
        'salable'
    ];

    protected $casts = [
        'price' => 'double',
        'salable' => 'boolean'
    ];

    public function category()
    {
        return $this->belongsTo(ProductCategory::class);
    }

    public function movements()
    {
        return $this->hasMany(ProductMovement::class);
    }

    public function recalculate()
    {
        $this->count = $this->movements->sum('count');
        $this->save();
    }

    public static function recalculateAll()
    {
        foreach (static::all() as $product) {
            $product->recalculate();
        }
    }
}
