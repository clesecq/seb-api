<?php

namespace Database\Seeders;

use App\Models\Account;
use App\Models\AccountCount;
use App\Models\Config;
use App\Models\Movement;
use App\Models\Product;
use App\Models\ProductCount;
use App\Models\ProductMovement;
use App\Models\Purchase;
use App\Models\Sale;
use App\Models\Transaction;
use App\Models\Transfert;
use DateInterval;
use DateTime;
use Illuminate\Database\Seeder;

class RealisticSeeder extends Seeder
{
    /**
     * Check if $date is a workday. We reject weekends and
     * school hollidays (specifically from the B zone, based on the
     * official dates of the school year 2021/2022).
     * TODO: Add French and Alsatian public holidays
     */
    private function isWorkDay($date)
    {
        $weekday = $date->format('w');
        if ($weekday == 0 || $weekday == 6) {
            return false;
        }

        $year = $date->format('Y');

        // Summer Hollidays
        if ($date >= new DateTime($year . '-07-06') && $date <= new DateTime($year . '-09-02')) {
            return false;
        }

        // All Saints' Hollidays
        if ($date >= new DateTime($year . '-10-23') && $date <= new DateTime($year . '-11-08')) {
            return false;
        }

        // Christmas Hollidays
        if ($date >= new DateTime($year . '-12-18') || $date <= new DateTime($year . '-01-03')) {
            return false;
        }

        // Winter Hollidays
        if ($date >= new DateTime($year . '-02-05') && $date <= new DateTime($year . '-02-21')) {
            return false;
        }

        // Spring Hollidays
        if ($date >= new DateTime($year . '-04-09') && $date <= new DateTime($year . '-04-25')) {
            return false;
        }

        return true;
    }

    private function getAllDates($start, $end)
    {
        $current = clone $start;

        $dates = [];

        while ($current < $end) {
            if ($this->isWorkDay($current)) {
                $dates[] = clone $current;
            }

            // Add one day
            $current->add(new DateInterval('P1D'));
        }

        return $dates;
    }

    private function initAccounts($faker, $date)
    {
        // We start by creating a second accout, which will be the "Bank".
        Account::create(['id' => 2, 'name' => 'Bank']);

        // We put some money in the bank
        $bankAmount = $faker->randomFloat(2, 300, 600);
        $count = AccountCount::create([
            'type' => 'value',
            'data' => ['amount' => $bankAmount],
            'balance' => $bankAmount
        ]);

        $transaction = Transaction::create([
            'name' => Config::format('counts.transaction', ['count' => $count->toArray()]),
            'amount' => $bankAmount,
            'rectification' => true,
            'user_id' => 1, // Force ROOT
            'account_id' => 2, // Bank account
            'category_id' => Config::integer('counts.category')
        ]);

        $transaction->created_at = $date;
        $transaction->updated_at = $date;
        $transaction->save();

        $count->transaction_id = $transaction->id;
        $count->created_at = $date;
        $count->updated_at = $date;
        $count->save();

        // We put some money in the cash register
        $registerAmount = $faker->randomFloat(2, 50, 200);
        $count = AccountCount::create([
            'type' => 'value',
            'data' => ['amount' => $registerAmount],
            'balance' => $registerAmount
        ]);

        $transaction = Transaction::create([
            'name' => Config::format('counts.transaction', ['count' => $count->toArray()]),
            'amount' => $registerAmount,
            'rectification' => true,
            'user_id' => 1, // Force ROOT
            'account_id' => 1, // Cash Register account
            'category_id' => Config::integer('counts.category')
        ]);

        $transaction->created_at = $date;
        $transaction->updated_at = $date;
        $transaction->save();

        $count->transaction_id = $transaction->id;
        $count->created_at = $date;
        $count->updated_at = $date;
        $count->save();
    }

    private function initStocks($faker, $date)
    {
        // Set the products up
        $this->call([ProductsSeeder::class]);

        $products_data = ['data' => []];

        foreach (Product::all() as $product) {
            $products_data['data'][] = [
                'id' => $product->id,
                'count' => $faker->numberBetween(3, 20)
            ];
        }

        $count = ProductCount::create($products_data);

        $movement = Movement::create([
            'name' => Config::format('counts.movement', ['count' => $count->toArray()]),
            'user_id' => 1, // Force ROOT
            'rectification' => true
        ]);
        $movement->created_at = $date;
        $movement->updated_at = $date;
        $movement->save();

        foreach ($products_data["data"] as $product) {
            $p = Product::findOrFail($product["id"]);
            $p->recalculate();

            $data = [
                "movement_id" => $movement->id,
                "product_id" => $product["id"],
                "count" => $product["count"] - $p->count
            ];

            ProductMovement::create($data);
        }

        $count->movement_id = $movement->id;
        $count->created_at = $date;
        $count->updated_at = $date;
        $count->save();
    }

    // Generates the sales for the day
    private function doSales($faker, $date)
    {
        // TODO: Adjust
        $number = $faker->numberBetween(15, 30);

        for ($i = 0; $i < $number; $i++) {
            $products_data = ['products' => []];
            $products_number = $faker->biasedNumberBetween(1, 5,  function ($x) {
                return 1 / (5 * $x + 1) - 0.167;
            });
            $products = $faker->randomElements(Product::all(), $products_number);

            foreach ($products as $product) {
                $product_count = $faker->biasedNumberBetween(1, 5,  function ($x) {
                    return 1 / (5 * $x + 1) - 0.167;
                });

                // We don't have enough of product.
                if ($product->count < $product_count)
                    continue;

                $products_data['products'][] = ['id' => $product->id, 'count' => $product_count];
            }

            // We didn't add any product.
            if (count($products_data['products']) == 0)
                continue;

            // We create the sale (needed to have the ID for the names)
            $sale = Sale::create();
            $amount = 0;

            // We create the movement
            $movement = Movement::create([
                "name" => Config::format("sales.movement", ["sale" => $sale->attributesToArray()]),
                "rectification" => false,
                "user_id" => 1 // Force ROOT
            ]);
            $movement->created_at = $date;
            $movement->updated_at = $date;
            $movement->save();

            // We fill the movement with the products
            foreach ($products_data["products"] as $product) {
                $data = [
                    "movement_id" => $movement->id,
                    "product_id" => $product["id"],
                    "count" => -$product["count"]
                ];

                // Create a product movement
                ProductMovement::create($data);

                // Should never fail, but we never know
                $p = Product::findOrFail($product['id']);
                // Add to the amount
                $amount += $p->price * intval($product["count"]);
            }

            // We create the transaction
            $transaction = Transaction::create([
                'name' => Config::format("sales.transaction", ["sale" => $sale->attributesToArray()]),
                'amount' => $amount,
                'rectification' => false,
                'account_id' => Config::integer('sales.account'),
                'category_id' => Config::integer('sales.category'),
                'user_id' => 1 // Force ROOT
            ]);
            $transaction->created_at = $date;
            $transaction->updated_at = $date;
            $transaction->save();

            // We affect the new transaction and movement to the sale
            $sale->transaction_id = $transaction->id;
            $sale->movement_id = $movement->id;
            $sale->created_at = $date;
            $sale->updated_at = $date;
            $sale->save();
        }
    }

    // Go the the bank
    private function goBank($faker, $date)
    {
        $threshold = $faker->randomFloat(2, 100, 200);

        $from_account = Account::find(1);
        $to_account = Account::find(2);

        // Not enough cash, don't go to the bank.
        if ($from_account->balance < $threshold) {
            return;
        }

        $amount = $from_account->balance - $threshold;

        $transfert = Transfert::create();

        // Create the from transaction
        $sub_transaction = Transaction::create([
            'name' => Config::format("transferts.transaction", ["transfert" => $transfert->attributesToArray()]),
            'amount' => -$amount,
            'rectification' => false,
            'account_id' => 1,
            'category_id' => Config::integer('transferts.category'),
            'user_id' => 1
        ]);
        $sub_transaction->created_at = $date;
        $sub_transaction->updated_at = $date;
        $sub_transaction->save();

        // Create the to transaction
        $add_transaction = Transaction::create([
            'name' => Config::format("transferts.transaction", ["transfert" => $transfert->attributesToArray()]),
            'amount' => $amount,
            'rectification' => false,
            'account_id' => 2,
            'category_id' => Config::integer('transferts.category'),
            'user_id' => 1
        ]);
        $add_transaction->created_at = $date;
        $add_transaction->updated_at = $date;
        $add_transaction->save();

        $transfert->sub_transaction_id = $sub_transaction->id;
        $transfert->add_transaction_id = $add_transaction->id;
        $transfert->created_at = $date;
        $transfert->updated_at = $date;
        $transfert->save();
    }

    private function goShopping($faker, $date) {
        $products_data = ['products' => []];
        $price = 0;

        foreach(Product::all() as $product) {
            if ($product->count < $product->alert_level) {
                $count = $faker->numberBetween(5, 30);
                $products_data['products'][] = ['id' => $product->id, 'count' => $count];

                // We assume we pay thing 0.8% the price we sell them (not realistic at all)
                $price += $product->price * $count * 0.8;
            }
        }

        // Nothing to buy.
        if (count($products_data) <= 0) {
            return;
        }

        // Create the purchase
        $purchase = Purchase::create([
            'name' => "Restock " . $date->format('d/m/Y')
        ]);

        // Create the transaction
        $transaction = Transaction::create([
            'name' => Config::format("purchases.transaction", ["purchase" => $purchase->attributesToArray()]),
            'amount' => -$price,
            'rectification' => false,
            'account_id' => 2, // Pay with Bank account
            'category_id' => 1,
            'user_id' => 1 // By ROOT
        ]);
        $transaction->created_at = $date;
        $transaction->updated_at = $date;
        $transaction->save();

        // We create the movement
        $movement = Movement::create([
            "name" => Config::format("purchases.movement", ["purchase" => $purchase->attributesToArray()]),
            "rectification" => false,
            "user_id" => 1 // ROOT
        ]);
        $movement->created_at = $date;
        $movement->updated_at = $date;
        $movement->save();

        // We fill the movement with the products
        foreach ($products_data["products"] as $product) {
            $data = [
                "movement_id" => $movement->id,
                "product_id" => $product["id"],
                "count" => $product["count"]
            ];

            // Create a product movement
            ProductMovement::create($data);
        }

        $purchase->transaction_id = $transaction->id;
        $purchase->movement_id = $movement->id;
        $purchase->created_at = $date;
        $purchase->updated_at = $date;
        $purchase->save();
    }

    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        $faker = \Faker\Factory::create();

        $start = new DateTime('2019-07-01');
        $end = new DateTime('2020-07-01');

        // Set the accounts up
        $this->initAccounts($faker, $start);

        // Set the stocks up
        $this->initStocks($faker, $start);


        $dates = $this->getAllDates($start, $end);

        // Show a progress bar while generating day-by-day data, as it can take quite some time.
        $this->command->getOutput()->progressStart(count($dates));

        foreach ($dates as $date) {
            $this->doSales($faker, $date);
            $this->command->getOutput()->progressAdvance();

            // Friday, go to the bank, buy sotcks
            if ($date->format("w") == 5) {
                $this->goBank($faker, $date);
                $this->goShopping($faker, $date);
            }
        }
        $this->command->getOutput()->progressFinish();
    }
}
