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
            if (config('recalculate_for_all_transaction', true)) {
                $transaction->account->recalculate();
            }
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
        'account_id',
        'category_id'
    ];

    public function account()
    {
        return $this->belongsTo(Account::class);
    }

    public function category()
    {
        return $this->belongsTo(TransactionCategory::class);
    }
}
