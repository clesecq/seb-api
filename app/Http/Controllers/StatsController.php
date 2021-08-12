<?php

namespace App\Http\Controllers;

use App\Models\Member;
use App\Models\Movement;
use App\Models\Product;
use App\Models\ProductMovement;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class StatsController extends Controller
{
    private function _most_sold_product() {
        $most_sold = 'N/A';
        $most_sold_id = DB::table('product_movement')->groupBy('product_id')->select('product_id')->orderByRaw('sum(count)')->first();
        if ($most_sold_id !== null) {
            $most_sold = Product::findOrFail($most_sold_id->product_id)->name;
        }

        return $most_sold;
    }

    private function _coffee_liters() {
        $coffees = DB::table('products')->where('name', 'like', '%Café%')->orWhere('name', 'like', '%Expresso%')->orWhere('name', 'like', '%Intenso%')->pluck('id')->toArray();
        $sales = DB::table('sales')->select('movement_id')->groupBy('movement_id')->pluck('movement_id')->toArray();
        
        $count = DB::table('product_movement')->select('count')->whereIn('product_id', $coffees)->whereIn('movement_id', $sales)->sum('count');
        return $count * -0.25;
    }

    private function _product(string $name) {
        $products = DB::table('products')->where('name', 'like', '%' . $name . '%')->pluck('id')->toArray();
        $sales = DB::table('sales')->select('movement_id')->groupBy('movement_id')->pluck('movement_id')->toArray();
        
        $count = DB::table('product_movement')->select('count')->whereIn('product_id', $products)->whereIn('movement_id', $sales)->sum('count');
        return -$count;
    }

    private function _last_sell_date(string $name) {
        $products = DB::table('products')->where('name', 'like', '%' . $name . '%')->pluck('id')->toArray();
        $sales = DB::table('sales')->select('movement_id')->groupBy('movement_id')->pluck('movement_id')->toArray();
        
        $id = DB::table('product_movement')->select('movement_id')->whereIn('product_id', $products)->whereIn('movement_id', $sales)->orderBy('movement_id', 'desc')->first();
        return Movement::find($id->movement_id)->created_at;
    }

    private function _biggest_sale() {
        $transactions = DB::table('sales')->select('transaction_id')->pluck('transaction_id')->toArray();
        $sale = DB::table('transactions')->whereIn('id', $transactions)->orderBy('amount', 'desc')->first();
        return $sale->amount;
    }

    private function _latest_restock() {
        $transactions = DB::table('purchases')->select('transaction_id')->whereNotNull('movement_id')->pluck('transaction_id')->toArray();
        return DB::table('transactions')->select('created_at')->whereIn('id', $transactions)->orderBy('created_at', 'desc')->first()->created_at;
    }

    private function _most_sales() {
        $transactions = DB::table('sales')->select('transaction_id')->pluck('transaction_id')->toArray();
        $user_id = DB::table('transactions')->groupBy('user_id')->select('user_id')->whereIn('id', $transactions)->orderByRaw('sum(amount)')->first();
        return User::find($user_id->user_id)->firstname;
    }

    public function stats(Request $request) {
        return [
            'most_sold_product' => $this->_most_sold_product(),
            'sold_coffee_liters' => $this->_coffee_liters(),
            'sold_water_bottles' => $this->_product('Eau'),
            'sold_bounties' => $this->_product('Bounty'),
            'last_sold_pepsi' => $this->_last_sell_date('Pepsi'),
            'biggest_sale' => $this->_biggest_sale(),
            'latest_restock' => $this->_latest_restock(),
            'most_sales' => $this->_most_sales(),
            'members' => Member::whereNotNull('transaction_id')->count()
        ];
    }
}
