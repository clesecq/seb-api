<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateProductMovementTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('product_movement', function (Blueprint $table) {
            $table->foreignId('product_id');
            $table->foreignId('movement_id');
            $table->integer('count')->default(0);
            $table->primary(['product_id', 'movement_id']);
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('product_movement');
    }
}
