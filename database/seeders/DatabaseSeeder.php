<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     *
     * @return void
     */
    public function run()
    {
        \App\Models\Account::factory(5)->create();
        \App\Models\TransactionCategory::factory(5)->create();
        \App\Models\Transaction::factory(200)->create();
        \App\Models\Member::factory(50)->create();
        \App\Models\ProductCategory::factory(5)->create();
        \App\Models\Product::factory(20)->create();
        \App\Models\Movement::factory(30)->create();

        // TODO: Rewrite with a factory if possible
        $faker = \Faker\Factory::create();
        for($i = 0; $i < 100; $i++) {
            $product_id = $faker->numberBetween(1, 20);
            $movement_id = $faker->numberBetween(1, 30);

            $tmp = \App\Models\ProductMovement::where('product_id', $product_id)->where('movement_id', $movement_id)->first();
            if (is_null($tmp)) {
                \App\Models\ProductMovement::create([
                    'product_id' => $product_id,
                    'movement_id' => $movement_id,
                    'count' => ($faker->boolean() ? -1 : 1) * $faker->numberBetween(2, 5)
                ]);
            }
        }

        \App\Models\Account::recalculateAll();
    }
}
