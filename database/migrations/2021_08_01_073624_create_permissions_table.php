<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;
use App\Models\Permission;

class CreatePermissionsTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('permissions', function (Blueprint $table) {
            $table->string('id')->primary();
            $table->text('name');
        });

        Permission::create(['id' => '*', 'name' => 'Everything']);
        Permission::create(['id' => 'users', 'name' => 'Users']);
        Permission::create(['id' => 'members', 'name' => 'Members']);
        Permission::create(['id' => 'accounts', 'name' => 'Accounts']);
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('permissions');
    }
}
