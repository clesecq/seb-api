<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class TransactionCategory extends Model
{
    protected $fillable = [
        "id",
        "name"
    ];

    public function transactions()
    {
        return $this->hasMany(Transaction::class, 'category_id');
    }

    use HasFactory;
}
