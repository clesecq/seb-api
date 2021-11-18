<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class ArchivedMember extends Model
{
    use HasFactory;

    protected $casts = [
        'paid' => 'boolean'
    ];

    protected $fillable = [
        'person_id',
        'transaction_id',
        'created_at',
        'updated_at',
        'year'
    ];

    protected $appends = ['paid', 'school_year'];

    public function getPaidAttribute()
    {
        return $this->transaction_id != null;
    }

    public function getSchoolYearAttribute()
    {
        return ($this->year - 1) . '/' . ($this->year);
    }

    public function transaction()
    {
        return $this->belongsTo(Transaction::class);
    }
}
