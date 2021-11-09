<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Movement extends Model
{
    use HasFactory;

    public function products()
    {
        return $this->hasMany(ProductMovement::class);
    }

    protected $fillable = [
        'name',
        'rectification',
        'user_id'
    ];

    protected $casts = [
        'rectification' => 'boolean'
    ];
}
