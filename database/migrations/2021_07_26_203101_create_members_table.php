<?php

use App\Models\Config;
use App\Models\TransactionCategory;
use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateMembersTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('members', function (Blueprint $table) {
            $table->id();
            $table->string('firstname');
            $table->string('lastname');
            $table->string('discord_id')->unique()->nullable()->default(null);
            $table->foreignId('transaction_id')->nullable()->default(null);
            $table->timestamps();
        });

        TransactionCategory::create(['id' => 1, 'name' => 'Contributions']);
        Config::create(['name' => 'members.contribution.amount', 'value' => '5']);
        Config::create(['name' => 'members.contribution.account', 'value' => '1']);
        Config::create(['name' => 'members.contribution.category', 'value' => '1']);
        Config::create(['name' => 'members.contribution.transaction', 'value' => 'Contribution {member.firstname} {member.lastname}']);
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('members');
        Config::destroy('members.contribution.amount');
        Config::destroy('members.contribution.account');
        Config::destroy('members.contribution.category');
        Config::destroy('members.contribution.transaction');
        TransactionCategory::destroy(1);
    }
}
