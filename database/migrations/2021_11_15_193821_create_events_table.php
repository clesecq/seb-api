<?php



use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateEventsTable extends Migration
{
    /*
        [
            {
                name: "Pizza",
                type: "boolean",
                price: 8,
                price_member: 5
            },
            {
                name: "Type pizza"
                type: "select",
                values: [
                    "Reine", "Savoyarde"
                ]
            },
            {
                type: "string",
                name: "Pseudonyme"
            }
        ]
    */

    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create(
            'events',
            function (Blueprint $table) {
                $table->id();
                $table->string("name");
                $table->string("location");
                $table->dateTime("inscriptions_closed_at");
                $table->dateTime("start");
                $table->dateTime("end");
                $table->decimal("max_people");
                $table->decimal('price', $precision = 12, $scale = 3)->default(0);
                $table->decimal('price_member', $precision = 12, $scale = 3)->default(0);
                $table->json("additional_data");
                $table->foreignId("category_id");
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
        Schema::dropIfExists('events');
    }
}
