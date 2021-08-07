<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class AccountCount extends Model
{
    use HasFactory;

    protected $fillable = [
        'transaction_id',
        'type',
        'data',
        'balance'
    ];

    protected $casts = [
        'data' => 'array',
        'balance' => 'double'
    ];

    public function transaction() {
        return $this->belongsTo(Transaction::class);
    }
}
