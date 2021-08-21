<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class ArchivedMember extends Model
{
    use HasFactory;

    protected $casts = [
        'payed' => 'boolean'
    ];

    protected $fillable = [
        'firstname',
        'lastname',
        'discord_id',
        'transaction_id',
        'created_at',
        'updated_at',
        'year'
    ];

    protected $appends = ['payed', 'school_year'];

    public function getPayedAttribute()
    {
        return $this->transaction_id != null;
    }

    public function getSchoolYearAttribute()
    {
        return ($this->year - 1) . '/' . ($this->year);
    }
}
