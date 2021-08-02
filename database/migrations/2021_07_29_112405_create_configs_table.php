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
