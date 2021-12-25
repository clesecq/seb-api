<?php

namespace App\Console;

use Database\Models\AutomatedTransaction;
use Database\Models\Transaction;
use Carbon\Carbon;

class RunAutomatedTransactions
{
    private function shouldRun(AutomatedTransaction $trans): bool
    {
        $should = false;
        switch ($trans->frequency) {
            case "dayly":
                $should = true;
                break;
            case "weekly":
                $should = $trans->day == (Carbon::now()->dayOfWeekIso);
                break;
            case "monthly":
                $should = $trans->day == (Carbon::now()->day);
                break;
            case "yearly":
                $should = $trans->day == (Carbon::now()->dayOfYear);
                break;
            default:
                $should = false;
                break;
        }
        return $should;
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
