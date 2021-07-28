<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Transaction extends Model
{
    use HasFactory;

    protected static function booted()
    {
        static::created(function ($transaction) {
            $transaction->account->recalculate();
        });
    }

    protected $casts = [
        'rectification' => 'boolean',
        'amount' => 'double'
    ];

    protected $fillable = [
        'name',
        'amount',
        'rectification',
        'user_id',
        'account_id'
    ];

    public function account() {
        return $this->belongsTo(Account::class);
    }
}
