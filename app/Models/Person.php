<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Person extends Model
{
    use HasFactory;

    protected $fillable = [
        'firstname',
        'lastname',
        'discord_id'
    ];

    protected $appends = ['fullname'];

    public function getFullnameAttribute()
    {
        return $this->firstname . " " . $this->lastname;
    }

    public function member() {
        return $this->hasOne(Member::class);
    }
}
