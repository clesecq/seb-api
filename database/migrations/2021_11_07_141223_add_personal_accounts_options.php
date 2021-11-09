<?php

use App\Models\Account;
use App\Models\Config;
use App\Models\TransactionCategory;
use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class AddPersonalAccountsOptions extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Account::create(['id' => 3, 'name' => 'Virtual Personal Account']);
        Config::create(['name' => 'personal.account', 'value' => '3']);
        TransactionCategory::create(['id' => 5, 'name' => 'Personal Accounts']);
        Config::create(['name' => 'personal.category', 'value' => '5']);
        Config::create(['name' => 'personal.refills.transaction', 'value' => 'Refill {person.fullname}']);
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        //
    }
}
