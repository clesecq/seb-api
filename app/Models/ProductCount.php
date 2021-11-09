<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class ProductCount extends Model
{
    use HasFactory;

    protected $fillable = [
        'movement_id',
        'data'
    ];

    protected $casts = [
        'data' => 'array'
    ];

    public function movement()
    {
        return $this->belongsTo(Movement::class);
    }
}
