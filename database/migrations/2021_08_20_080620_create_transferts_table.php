<?php

use App\Models\Config;
use App\Models\TransactionCategory;
use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateTransfertsTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('transferts', function (Blueprint $table) {
            $table->id();
            $table->foreignId('sub_transaction_id')->nullable()->default(null);
            $table->foreignId('add_transaction_id')->nullable()->default(null);
            $table->timestamps();
        });

        TransactionCategory::create(['id' => 4, 'name' => 'Transferts']);
        Config::create(['name' => 'transferts.transaction', 'value' => 'Transfert #{transfert.id}']);
        Config::create(['name' => 'transferts.category', 'value' => '4']);
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('transferts');
        TransactionCategory::destroy(4);
        Config::destroy('transferts.transaction');
        Config::destroy('transferts.category');
    }
}
