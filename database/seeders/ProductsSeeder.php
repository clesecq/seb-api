<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\ProductCategory;
use App\Models\Product;
use App\Models\Account;

class ProductsSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        $bid = ProductCategory::create(['name' => 'Boissons'])->id;
        $sid = ProductCategory::create(['name' => 'Snachs'])->id;
        $cid = ProductCategory::create(['name' => 'Boissons Chaudes'])->id;

        Product::create(['name' => 'Coca-Cola', 'price' => 0.7, 'category_id' => $bid, 'alert_level' => 4]);
        Product::create(['name' => 'Coca-Cola Cherry', 'price' => 0.7, 'category_id' => $bid, 'alert_level' => 8]);
        Product::create(['name' => 'Coca-Cola Zero', 'price' => 0.7, 'category_id' => $bid, 'alert_level' => 3]);
        Product::create(['name' => 'Fanta Citron', 'price' => 0.7, 'category_id' => $bid, 'alert_level' => 8]);
        Product::create(['name' => 'Fanta Orange', 'price' => 0.7, 'category_id' => $bid, 'alert_level' => 4]);
        Product::create(['name' => 'Ice Tea pêche', 'price' => 0.7, 'category_id' => $bid, 'alert_level' => 4]);
        Product::create(['name' => 'Monster Energy', 'price' => 1.5, 'category_id' => $bid, 'alert_level' => 6]);
        Product::create(['name' => 'Oasis Tropical', 'price' => 0.7, 'category_id' => $bid, 'alert_level' => 4]);
        Product::create(['name' => 'Orangina', 'price' => 0.7, 'category_id' => $bid, 'alert_level' => 4]);
        Product::create(['name' => 'Schweppes Agrum', 'price' => 0.7, 'category_id' => $bid, 'alert_level' => 4]);
        Product::create(['name' => 'Pepsi', 'price' => 0.7, 'category_id' => $bid, 'alert_level' => 2]);
        Product::create(['name' => 'Capri Sun', 'price' => 0.5, 'category_id' => $bid, 'alert_level' => 5]);
        Product::create(['name' => 'Eau', 'price' => 0.5, 'category_id' => $bid, 'alert_level' => 3]);

        Product::create(['name' => 'Bounty', 'price' => 0.5, 'category_id' => $sid, 'alert_level' => 3]);
        Product::create(['name' => 'Kinder Bueno White', 'price' => 0.7, 'category_id' => $sid, 'alert_level' => 5]);
        Product::create(['name' => 'Kinder Bueno', 'price' => 0.7, 'category_id' => $sid, 'alert_level' => 5]);
        Product::create(['name' => 'Chips Nature', 'price' => 0.3, 'category_id' => $sid, 'alert_level' => 3]);
        Product::create(['name' => 'Chips BBQ', 'price' => 0.3, 'category_id' => $sid, 'alert_level' => 3]);
        Product::create(['name' => 'KitKat', 'price' => 0.5, 'category_id' => $sid, 'alert_level' => 5]);
        Product::create(['name' => 'Lion', 'price' => 0.5, 'category_id' => $sid, 'alert_level' => 5]);
        Product::create(['name' => 'Mars', 'price' => 0.5, 'category_id' => $sid, 'alert_level' => 5]);
        Product::create(['name' => 'M&M\'s', 'price' => 0.5, 'category_id' => $sid, 'alert_level' => 4]);
        Product::create(['name' => 'Skittles', 'price' => 0.3, 'category_id' => $sid, 'alert_level' => 4]);
        Product::create(['name' => 'Snickers', 'price' => 0.5, 'category_id' => $sid, 'alert_level' => 4]);
        Product::create(['name' => 'Twix', 'price' => 0.5, 'category_id' => $sid, 'alert_level' => 5]);
        Product::create(['name' => 'Yum Yum Bœuf', 'price' => 0.5, 'category_id' => $sid, 'alert_level' => 3]);
        Product::create(['name' => 'Yum Yum Poulet', 'price' => 0.5, 'category_id' => $sid, 'alert_level' => 3]);
        Product::create(['name' => 'Yum Yum Curry', 'price' => 0.5, 'category_id' => $sid, 'alert_level' => 3]);
        Product::create(['name' => 'Yum Yum Wok', 'price' => 0.5, 'category_id' => $sid, 'alert_level' => 3]);
        Product::create(['name' => 'Yum Yum Crevettes', 'price' => 0.5, 'category_id' => $sid, 'alert_level' => 3]);

        Product::create(['name' => 'Chocolat Chaud', 'price' => 0.3, 'category_id' => $cid, 'alert_level' => 5]);
        Product::create(['name' => 'Expresso', 'price' => 0.3, 'category_id' => $cid, 'alert_level' => 3]);
        Product::create(['name' => 'Longo Intenso', 'price' => 0.3, 'category_id' => $cid, 'alert_level' => 6]);
        Product::create(['name' => 'Thé vert menthe', 'price' => 0.3, 'category_id' => $cid, 'alert_level' => 6]);

        Product::create(['name' => 'T - Café Classique', 'price' => 0.3, 'category_id' => $cid, 'alert_level' => 0]);
        Product::create(['name' => 'T - Thé Earl grey', 'price' => 0.3, 'category_id' => $cid, 'alert_level' => 0]);
        Product::create(['name' => 'T - Café Long Classique', 'price' => 0.3, 'category_id' => $cid, 'alert_level' => 0]);
        Product::create(['name' => 'T - Café Petit Dej\'', 'price' => 0.3, 'category_id' => $cid, 'alert_level' => 0]);
        Product::create(['name' => 'T - Chocolat Chaud', 'price' => 0.3, 'category_id' => $cid, 'alert_level' => 0]);
    }
}
