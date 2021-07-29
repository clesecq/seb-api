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
        \App\Models\Transaction::factory(200)->create();
        \App\Models\Member::factory(50)->create();
        \App\Models\ProductCategory::factory(5)->create();
        \App\Models\Product::factory(20)->create();
        \App\Models\Account::recalculateAll();
    }
}
