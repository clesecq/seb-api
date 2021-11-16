<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\Pivot;

class EventPerson extends Pivot
{
    use HasFactory;

    protected $fillable = [
        'event_id',
        'person_id',
        'transaction_id',
        'additional_data'
    ];

    public function event()
    {
        return $this->belongsTo(Event::class);
    }

    public function person()
    {
        return $this->belongsTo(Person::class);
    }

    public function transaction()
    {
        return $this->belongsTo(Transaction::class);
    }
}
