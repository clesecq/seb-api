<?php

use App\Models\Person;
use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Schema;

class MakePeopleTokenSha256 extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        $people = DB::table("people")->whereNotNull('edu_token')->get();

        foreach ($people as $p) {
            DB::table("people")->where('id', $p->id)->update(['edu_token' => hash('sha256', $p->edu_token)]);
        }
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        //
    }
}
