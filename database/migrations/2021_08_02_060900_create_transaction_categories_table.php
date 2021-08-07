<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;
use App\Models\TransactionCategory;

class CreateTransactionCategoriesTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('transaction_categories', function (Blueprint $table) {
            $table->id();
            $table->string("name");
            $table->timestamps();
        });

        TransactionCategory::create(['id' => 1, 'name' => 'Contributions']);
        TransactionCategory::create(['id' => 2, 'name' => 'Sales']);
        TransactionCategory::create(['id' => 3, 'name' => 'Count']);

        // Ensure next IDs are > 1000.
        DB::table('transaction_categories')->insert(['id' => 999, 'name' => 'whatever']);
        DB::table('transaction_categories')->where('id', 999)->delete();
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('transaction_categories');
    }
}
