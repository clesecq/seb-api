<?php

namespace App\Http\Controllers;

use App\Models\Member;
use App\Models\Movement;
use App\Models\Product;
use App\Models\ProductMovement;
use App\Models\Sale;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class StatsController extends Controller
{
    private function mostSoldProduct()
    {
        $sales_movement_id = Sale::all()->pluck('movement_id')->toArray();

        $most_sold = 'N/A';
        $most_sold_id = DB::table('product_movement')
            ->whereIn('movement_id', $sales_movement_id)
            ->groupBy('product_id')->select('product_id')
            ->orderByRaw('sum(count)')->first();
        if ($most_sold_id !== null) {
            $most_sold = Product::findOrFail($most_sold_id->product_id)->name;
        }

        return $most_sold;
    }

    private function coffeeLiters()
    {
        $coffees = DB::table('products')
            ->where('name', 'like', '%Café%')
            ->orWhere('name', 'like', '%Expresso%')
            ->orWhere('name', 'like', '%Intenso%')
            ->pluck('id')
            ->toArray();
        $sales = DB::table('sales')
            ->select('movement_id')
            ->groupBy('movement_id')
            ->pluck('movement_id')
            ->toArray();

        $count = DB::table('product_movement')
            ->select('count')
            ->whereIn('product_id', $coffees)
            ->whereIn('movement_id', $sales)
            ->sum('count');
        return $count * -0.25;
    }

    private function product(string $name)
    {
        $products = DB::table('products')
            ->where('name', 'like', '%' . $name . '%')
            ->pluck('id')
            ->toArray();
        $sales = DB::table('sales')
            ->select('movement_id')
            ->groupBy('movement_id')
            ->pluck('movement_id')
            ->toArray();

        $count = DB::table('product_movement')
            ->select('count')
            ->whereIn('product_id', $products)
            ->whereIn('movement_id', $sales)
            ->sum('count');
        return -$count;
    }

    private function lastSellName(string $name)
    {
        $products = DB::table('products')
            ->where('name', 'like', '%' . $name . '%')
            ->pluck('id')
            ->toArray();
        $sales = DB::table('sales')
            ->select('movement_id')
            ->groupBy('movement_id')
            ->pluck('movement_id')
            ->toArray();

        $id = DB::table('product_movement')
            ->select('movement_id')
            ->whereIn('product_id', $products)
            ->whereIn('movement_id', $sales)
            ->orderBy('movement_id', 'desc')
            ->first();

        if ($id == null) {
            return 0;
        } else {
            return Movement::find($id->movement_id)->created_at;
        }
    }

    private function biggestSale()
    {
        $transactions = DB::table('sales')
            ->select('transaction_id')
            ->pluck('transaction_id')
            ->toArray();
        $sale = DB::table('transactions')
            ->whereIn('id', $transactions)
            ->orderBy('amount', 'desc')
            ->first();
        if ($sale == null) {
            return 0;
        }
        return doubleval($sale->amount);
    }

    private function latestRestock()
    {
        $transactions = DB::table('purchases')
            ->select('transaction_id')
            ->whereNotNull('movement_id')
            ->pluck('transaction_id')
            ->toArray();
        $restock = DB::table('transactions')
            ->select('created_at')
            ->whereIn('id', $transactions)
            ->orderBy('created_at', 'desc')
            ->first();
        if ($restock == null) {
            return 0;
        }
        return $restock->created_at;
    }

    private function mostSales()
    {
        $req = DB::table("movements")
            ->join("product_movement", "movements.id", "=", "product_movement.movement_id")
            ->whereIn('product_movement.movement_id', function ($q) {
                $q->select('movement_id')->from('sales');
            })
            ->groupBy('movements.user_id')
            ->select(DB::Raw('-SUM(product_movement.count) AS count'), 'movements.user_id')
            ->orderByDesc('count');

        if ($req->first()->user_id == null) {
            return "N/A";
        }

        return User::find($req->first()->user_id)->firstname;
    }

    private function priceCoca()
    {
        if (Product::where('name', 'Coca-Cola')->first() == null) {
            return 0;
        }

        return Product::where('name', 'Coca-Cola')->first()->price;
    }

    public function stats(Request $request)
    {
        return [
            'most_sold_product' => $this->mostSoldProduct(),
            'sold_coffee_liters' => $this->coffeeLiters(),
            'sold_water_bottles' => $this->product('Eau'),
            'sold_bounties' => $this->product('Bounty'),
            'last_sold_pepsi' => $this->lastSellName('Pepsi'),
            'biggest_sale' => $this->biggestSale(),
            'latest_restock' => $this->latestRestock(),
            'most_sales' => $this->mostSales(),
            'members' => Member::whereNotNull('transaction_id')->count(),
            'priceCoca' => $this->priceCoca()
        ];
    }
}
