<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Schema;

class CreatePeopleTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('people', function (Blueprint $table) {
            $table->id();
            $table->string('firstname');
            $table->string('lastname');
            $table->string('discord_id')->unique()->nullable()->default(null);
            $table->timestamps();
        });

        Schema::table('members', function (Blueprint $table) {
            $table->foreignId('person_id')->nullable()->default(null);
        });

        $members = DB::table('members')->get();
        foreach($members as $member) {
            $id = DB::table('people')->insertGetId([
                'firstname' => $member->firstname,
                'lastname' => $member->lastname,
                'discord_id' => $member->discord_id,
                'created_at' => $member->created_at,
                'updated_at' => $member->updated_at
            ]);

            DB::table('members')->where('id', $member->id)->update(['person_id' => $id]);
        }

        Schema::table('members', function (Blueprint $table) {
            $table->dropColumn('firstname');
        });
        Schema::table('members', function (Blueprint $table) {
            $table->dropColumn('lastname');
        });
        Schema::table('members', function (Blueprint $table) {
            $table->dropColumn('discord_id');
            $table->foreignId('person_id')->change();
        });

        // Warning: We assume we don't have any archived membre when running the query (true at the moment of writing this)
        Schema::table('archived_members', function(Blueprint $table) {
            $table->dropColumn('firstname');
        });
        Schema::table('archived_members', function(Blueprint $table) {
            $table->dropColumn('lastname');
        });
        Schema::table('archived_members', function(Blueprint $table) {
            $table->dropColumn('discord_id');
        });
        Schema::table('archived_members', function(Blueprint $table) {
            $table->foreignId('person_id');
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {

        Schema::table('members', function (Blueprint $table) {
            $table->string('firstname');
            $table->string('lastname');
            $table->string('discord_id')->unique()->nullable()->default(null);
        });

        $members = DB::table('members')->get();
        foreach($members as $member) {
            $person = DB::table('people')->where('id', $member->person_id)->first();
            DB::table('members')->where('id', $member->id)->update([
                'firstname' => $person->firstname,
                'lastname' => $person->lastname,
                'discord_id' => $person->discord_id
            ]);
        }

        Schema::table('members', function (Blueprint $table) {
            $table->dropColumn('person_id');
        });

        Schema::table('archived_members', function (Blueprint $table) {
            $table->string('firstname');
            $table->string('lastname');
            $table->string('discord_id')->unique()->nullable()->default(null);
            $table->dropColumn('person_id');
        });

        Schema::dropIfExists('people');
    }
}
