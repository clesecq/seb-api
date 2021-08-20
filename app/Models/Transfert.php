<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Transfert extends Model
{
    use HasFactory;

    public function sub_transaction() {
        return $this->belongsTo(Transaction::class, 'sub_transaction_id');
    }

    public function add_transaction() {
        return $this->belongsTo(Transaction::class, 'add_transaction_id');
    }
}
