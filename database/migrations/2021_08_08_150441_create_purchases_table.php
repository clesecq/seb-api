<?php

use App\Models\Config;
use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreatePurchasesTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('purchases', function (Blueprint $table) {
            $table->id();
            $table->string('name');
            $table->foreignId('transaction_id')->nullable()->default(null);
            $table->foreignId('movement_id')->nullable()->default(null);
            $table->timestamps();
        });
        
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
        Schema::dropIfExists('purchases');
        Config::destroy('purchases.transaction');
        Config::destroy('purchases.movement');
    }
}
