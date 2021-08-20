<?php

use App\Models\Config;
use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateSalesTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('sales', function (Blueprint $table) {
            $table->id();
            $table->foreignId('transaction_id')->nullable()->default(null);
            $table->foreignId('movement_id')->nullable()->default(null);
            $table->timestamps();
        });

        Config::create(['name' => 'sales.account', 'value' => '1']);
        Config::create(['name' => 'sales.category', 'value' => '2']);
        Config::create(['name' => 'sales.transaction', 'value' => 'Sale #{sale.id}']);
        Config::create(['name' => 'sales.movement', 'value' => 'Sale #{sale.id}']);
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('sales');
        Config::destroy('sales.account');
        Config::destroy('sales.category');
        Config::destroy('sales.transaction');
        Config::destroy('sales.movement');
    }
}
