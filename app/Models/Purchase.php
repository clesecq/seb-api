<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Purchase extends Model
{
    use HasFactory;

    public function movement() {
        return $this->belongsTo(Movement::class);
    }

    public function transaction() {
        return $this->belongsTo(Transaction::class);
    }

    protected $fillable = [
        'transaction_id',
        'movement_id',
        'name'
    ];
}
