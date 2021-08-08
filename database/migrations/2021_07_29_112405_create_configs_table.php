<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;
use App\Models\Config;

class CreateConfigsTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('configs', function (Blueprint $table) {
            $table->string('name')->primary();
            $table->text('value')->default("");
        });

        Config::create(['name' => 'members.contribution.amount', 'value' => '5']);
        Config::create(['name' => 'members.contribution.account', 'value' => '1']);
        Config::create(['name' => 'members.contribution.category', 'value' => '1']);
        Config::create(['name' => 'members.contribution.transaction', 'value' => 'Contribution {member.firstname} {member.lastname}']);
        Config::create(['name' => 'sales.account', 'value' => '1']);
        Config::create(['name' => 'sales.category', 'value' => '2']);
        Config::create(['name' => 'sales.transaction', 'value' => 'Sale #{sale.id}']);
        Config::create(['name' => 'sales.movement', 'value' => 'Sale #{sale.id}']);
        Config::create(['name' => 'counts.category', 'value' => '3']);
        Config::create(['name' => 'counts.transaction', 'value' => 'Count #{count.id}']);
        Config::create(['name' => 'counts.movement', 'value' => 'Count #{count.id}']);
        Config::create(['name' => 'purchases.transaction', 'value' => 'Purchase #{purchase.id}']);
        Config::create(['name' => 'purchases.movement', 'value' => 'Purchase #{purchase.id}']);
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('configs');
    }
}
