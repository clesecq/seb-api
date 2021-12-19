<?php

namespace App\Console;

use Database\Models\AutomatedTransaction;
use Database\Models\Transaction;
use Carbon\Carbon;

class RunAutomatedTransactions
{
    private function shouldRun(AutomatedTransaction $trans): bool
    {
        switch ($trans->frequency) {
            case "dayly":
                return true;
            case "weekly":
                return $trans->day == (Carbon::now()->dayOfWeekIso);
            case "monthly":
                return $trans->day == (Carbon::now()->day);
            case "yearly":
                return $trans->day == (Carbon::now()->dayOfYear);
        }
        return false;
    }

    public function __invoke()
    {
        foreach (AutomatedTransaction::all() as $auto_transaction) {
            if ($this->shouldRun($auto_transaction)) {
                echo '[AutoTransaction] ' . $auto_transaction->name . "\n";
                Transaction::create($auto_transaction->attributesToArray());
            }
        }
    }
}
