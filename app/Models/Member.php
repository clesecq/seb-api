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

    public static function archive(...$params) {
        if (count($params) >= 1) {
            $year = $params[0];
        } else {
            $year = now()->year;
        }

        // We archive everything and empty the table
        foreach(Member::all() as $member) {
            ArchivedMember::create([
                'firstname' => $member->firstname,
                'lastname' => $member->lastname,
                'discord_id' => $member->discord_id,
                'transaction_id' => $member->transaction_id,
                'created_at' => $member->created_at,
                'updated_at' => $member->updated_at,
                'year' => $year
            ]);
        }
        Member::truncate();
    }
}
