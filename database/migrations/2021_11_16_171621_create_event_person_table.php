<?php



use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateEventPersonTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create(
            'event_person',
            function (Blueprint $table) {
                $table->foreignId("event_id");
                $table->foreignId("person_id");
                $table->foreignId("transaction_id")->nullable()->default(null);
                $table->json("data");
                $table->timestamps();
                $table->primary(["event_id", "person_id"]);
            }
        );
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('event_person');
    }
}
