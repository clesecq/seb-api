<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\Schema;

class AddSalePersonId extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::table('sales', function (Blueprint $table) {
            $table->foreignId('person_id')->nullable()->default(null);
        });

        DB::transaction(function () {
            $sales = DB::table('sales')->get();
            foreach ($sales as $sale) {
                $transaction = DB::table('transactions')->find($sale->transaction_id);
                if (!is_null($transaction)) {

                    $other_trans = DB::table('transactions')->where("name", $transaction->name)->get();
                    if (count($other_trans) == 2) {
                        foreach ($other_trans as $tr) {
                            if ($tr->id != $transaction->id) {
                                $ptr = DB::table('personal_transactions')->where('transaction_id', $tr->id)->first();

                                if (!is_null($ptr)) {
                                    $pacc = DB::table('personal_accounts')->find($ptr->personal_account_id);
                                    if (!is_null($pacc)) {
                                        DB::table('sales')->where('id', $sale->id)->update(['person_id' => $pacc->person_id]);
                                    }
                                }
                                error_log(json_encode($ptr));
                            }
                        }
                    }
                }
            }
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::table('sales', function (Blueprint $table) {
            $table->dropColumn('person_id');
        });
    }
}
