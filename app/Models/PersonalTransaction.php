<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class PersonalTransaction extends Model
{
    use HasFactory;

    protected static function booted()
    {
        static::created(function ($transaction) {
            if (config('recalculate_for_all_transaction', true))
                $transaction->account->recalculate();
        });
    }

    protected $casts = [
        'amount' => 'double'
    ];

    protected $fillable = [
        'amount',
        'user_id',
        'personal_account_id',
        'transaction_id'
    ];

    public function personal_account()
    {
        return $this->belongsTo(PersonalAccount::class);
    }

    public function transaction()
    {
        return $this->belongsTo(Transaction::class);
    }
}
