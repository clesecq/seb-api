<?php



use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateEventParticipationsTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create(
            'event_participations',
            function (Blueprint $table) {
                $table->id();
                $table->foreignId("event_id");
                $table->foreignId("person_id");
                $table->foreignId("transaction_id")->nullable()->default(null);
                $table->json("additional_data");
                $table->timestamps();
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
        Schema::dropIfExists('event_participations');
    }
}
