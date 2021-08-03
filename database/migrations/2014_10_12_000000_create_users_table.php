<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;
use Illuminate\Support\Facades\Hash;
use App\Models\User;

class CreateUsersTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('users', function (Blueprint $table) {
            $table->id();
            $table->string('username');
            $table->string('firstname');
            $table->string('lastname');
            $table->string('email')->unique();
            $table->string('password');
            $table->string('remember_token')->nullable()->default(null);
            $table->json('permissions')->default('[]');
            $table->timestamps();
            $table->timestamp('password_changed_at')->nullable()->default(null);
        });

        $user = User::create([
            'username' => 'root',
            'firstname' => 'Chuck',
            'lastname' => 'NORRIS',
            'email' => 'root@localhost',
            'password' => Hash::make('rootroot'),
            'permissions' => ["*"]
        ]);
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('users');
    }
}
