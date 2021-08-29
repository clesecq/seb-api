<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateAutomatedTransactionsTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('automated_transactions', function (Blueprint $table) {
            $table->id();
            $table->string('name');
            $table->decimal('amount', $precision = 12, $scale = 3)->default(0);
            $table->boolean('rectification')->default(false);
            $table->foreignId('user_id');
            $table->foreignId('account_id');
            $table->enum("frequency", ["yearly", "monthly", "weekly", "dayly"]);
            $table->foreignId('category_id');
            $table->integer('day');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('automated_transactions');
    }
}
