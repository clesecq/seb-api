<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;
use App\Models\Account;
use Illuminate\Support\Facades\DB;

class CreateAccountsTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('accounts', function (Blueprint $table) {
            $table->id();
            $table->string('name');
            $table->string('iban')->nullable();
            $table->string('bic')->nullable();
            $table->decimal('balance', $precision = 12, $scale = 3)->default(0);
            $table->timestamps();
        });

        Account::create(['id' => 1, 'name' => 'Cash Register']);

        // Ensure next IDs are > 1000.
        DB::table('accounts')->insert(['id' => 999, 'name' => 'whatever']);
        DB::table('accounts')->where('id', 999)->delete();
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('accounts');
    }
}
