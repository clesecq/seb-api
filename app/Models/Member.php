<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Facades\Auth;

class Member extends Model
{
    use HasFactory;

    protected $casts = [
        'payed' => 'boolean'
    ];

    protected $fillable = [
        'firstname',
        'lastname',
        'discord_id'
    ];

    protected $appends = ['payed'];

    public function getPayedAttribute()
    {
        return $this->transaction_id != null;
    }

    function pay()
    {
        if ($this->transaction_id == null) {
            $message = Config::format("members.contribution.transaction", ["member" => $this->attributesToArray()]);

            $this->transaction_id = Transaction::create([
                'name' => $message,
                'amount' => Config::number('members.contribution.amount'),
                'rectification' => false,
                'user_id' => Auth::id() ?? 1,
                'account_id' => Config::integer('members.contribution.account'),
                'category_id' => Config::integer('members.contribution.category')
            ])->id;
            $this->save();
        }
    }
}
