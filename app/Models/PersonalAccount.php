<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class PersonalAccount extends Model
{
    use HasFactory;

    protected $fillable = [
        'person_id'
    ];

    protected $casts = [
        'balance' => 'double'
    ];

    public function personal_transactions() {
        return $this->hasMany(PersonalTransaction::class);
    }

    public function recalculate() {
        $this->balance = $this->personal_transactions->sum('amount');
        $this->save();
    }

    public static function recalculateAll() {
        foreach(static::all() as $account) {
            $account->recalculate();
        }
    }
}
