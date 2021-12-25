<?php

namespace App\Console\Commands;

use App\Console\RunAutomatedTransactions;
use Illuminate\Console\Command;

class AutoTransactions extends Command
{
    /**
     * The name and signature of the console command.
     *
     * @var string
     */
    protected $signature = 'auto:transactions';

    /**
     * The console command description.
     *
     * @var string
     */
    protected $description = 'Run automated transactions';

    /**
     * Execute the console command.
     *
     * @return int
     */
    public function handle()
    {
        $rat = new RunAutomatedTransactions;
        $rat();
        return 0;
    }
}
