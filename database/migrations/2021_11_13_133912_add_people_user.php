<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Schema;

//phpcs:ignore
class AddPeopleUser extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {

        Schema::table('users', function (Blueprint $table) {
            $table->foreignId('person_id')->nullable()->default(null);
        });

        DB::transaction(function () {
            $users = DB::table('users')->get();
            foreach ($users as $user) {
                $person = DB::table('people')
                    ->where('firstname', $user->firstname)
                    ->where('lastname', $user->lastname)->first();

                if ($person == null) {
                    $person = DB::table('people')->insert([
                        'firstname' => $user->firstname,
                        'lastname' => $user->lastname
                    ]);

                    $person = DB::table('people')
                        ->where('firstname', $user->firstname)
                        ->where('lastname', $user->lastname)->first();
                }

                DB::table('users')->where('id', $user->id)->update(['person_id' => $person->id]);
            }
        });

        Schema::table('users', function (Blueprint $table) {
            $table->dropColumn('firstname');
        });
        Schema::table('users', function (Blueprint $table) {
            $table->dropColumn('lastname');
        });
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
