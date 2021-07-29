<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Account extends Model
{
    use HasFactory;

    protected $fillable = [
        'name',
        'iban',
        'bic'
    ];

    protected $casts = [
        'balance' => 'double'
    ];

    public function transactions() {
        return $this->hasMany(Transaction::class);
    }

    public function recalculate() {
        $this->balance = $this->transactions->sum('amount');
        $this->save();
    }

    public static function recalculateAll() {
        foreach(static::all() as $account) {
            $account->recalculate();
        }
    }
}
