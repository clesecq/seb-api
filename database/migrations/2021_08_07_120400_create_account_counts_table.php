<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateAccountCountsTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('account_counts', function (Blueprint $table) {
            $table->id();
            $table->foreignId('transaction_id')->nullable()->default(null);;
            $table->enum('type', ['cash', 'value']);
            $table->json('data');
            $table->decimal('balance', $precision = 12, $scale = 3)->default(0);
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
        Schema::dropIfExists('account_counts');
    }
}
