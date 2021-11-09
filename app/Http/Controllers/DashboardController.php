<?php

namespace App\Http\Controllers;

use App\Models\Account;
use App\Models\Config;
use App\Models\Movement;
use App\Models\Product;
use App\Models\Sale;
use App\Models\Transaction;
use App\Models\TransactionCategory;
use App\Models\User;
use Carbon\Carbon;
use DateTimeImmutable;
use Illuminate\Http\Request;
use Illuminate\Support\Str;
use Illuminate\Support\Facades\DB;

class DashboardController extends Controller
{
    public function home(Request $request)
    {
        $data = ['id' => 'home'];

        if ($request->user()->hasPermission('products.show')) {
            $products = Product::whereColumn('count', '<', 'alert_level')->get();
            $data["products_alerts"] = $products;
        }

        if ($request->user()->hasPermission('accounts.show')) {
            $accounts = Account::all('name', 'balance');
            $data["accounts"] = $accounts;
        }

        if ($request->user()->hasPermission('products.show')) {
            $data["stocks_value"] = doubleval(Product::select(DB::raw('sum(price * count) as total'))->first()->total);
        }

        return ['data' => $data];
    }

    public function products(Request $request)
    {
        $data = ['id' => 'products'];

        // Product sales
        $data['products'] = [];
        
        $sales_movement_id = Sale::all()->pluck('movement_id')->toArray();

        foreach(Product::all() as $product) {
            $data['products'][] = [
                'name' => $product->name,
                'value' => -doubleval(Movement::where('created_at', '>', Carbon::now()->subYear())->whereIn('id', $sales_movement_id)->join('product_movement', 'movements.id', '=', 'product_movement.movement_id')->where('product_id', $product->id)->where('count', '<', '0')->sum('count'))
            ];
        }

    
        return ['data' => $data];
    }

    public function sellers(Request $request)
    {
        $req = DB::table("movements")
            ->join("product_movement", "movements.id", "=", "product_movement.movement_id")
            ->whereIn('product_movement.movement_id', function($q) {
                $q->select('movement_id')->from('sales');
            })
            ->groupBy('movements.user_id')
            ->select(DB::Raw('-SUM(product_movement.count) AS count'), 'movements.user_id')
            ->orderByDesc('count');
        $raw = $req->get();

        $data = [];

        foreach($raw as $line) {
            $users = User::findOrFail($line->user_id);
            $data[] = [
                "name" => $users->firstname . " " . $users->lastname,
                "value" => intval($line->count)
            ];
        }



        return ["data" => ["id" => "sellers", "sellers" => $data]];
    }

    public function accounts(Request $request)
    {
        $data = ['id' => 'accounts'];

        // Transaction graph data
        $temp_data = [];
        $accounts = ['total' => 'Total'];
        $account_last_values = [];

        foreach (Account::all() as $account) {
            $transactions_start = doubleval(Transaction::where('created_at', '<', Carbon::now()->subYear())->where('account_id', $account->id)->sum('amount'));
            $transactions_data = DB::table('transactions')->select(DB::raw('DATE(created_at) as date, sum(amount) as amount'))->where('created_at', '>=', Carbon::now()->subYear())->where('account_id', $account->id)->groupBy('date')->get();
            $account_last_values[$account->id] = $transactions_start;
            foreach ($transactions_data as $transaction) {
                if (!array_key_exists($transaction->date, $temp_data)) {
                    $temp_data[$transaction->date] = [];
                }
                $transactions_start += doubleval($transaction->amount);
                $temp_data[$transaction->date][$account->id] = $transactions_start;
            }
            $accounts[$account->id] = $account->name;
        }

        ksort($temp_data);
        $collection = collect($temp_data);

        $date_field = Str::random(40);

        $the_data = $collection->map(function ($item, $key) use ($date_field, $accounts, &$account_last_values) {
            $item[$date_field] = (new DateTimeImmutable($key))->getTimestamp();
            $sum = 0;

            foreach ($accounts as $k => $v) {
                if ($k == 'total') {
                    continue;
                }
                if (array_key_exists($k, $item)) {
                    $account_last_values[$k] = $item[$k];
                } else {
                    $item[$k] = $account_last_values[$k];
                }
                $sum += $item[$k];
            }

            $item['total'] = $sum;

            return $item;
        })->values();

        $data['transactions'] = [
            'data' => $the_data->toArray(),
            'date_field' => $date_field,
            'accounts' => $accounts
        ];

        // Transactions categories data
        $data['categories_positive'] = [];
        $data['categories_negative'] = [];
        $data['categories'] = [];

        foreach (TransactionCategory::all() as $category) {
            if ($category->id == Config::integer('transferts.category') || $category->id == Config::integer('counts.category'))
                continue;

            $data['categories'][] = [
                'name' => $category->name,
                'value' => max(0, doubleval(Transaction::where('created_at', '>', Carbon::now()->subYear())->where('category_id', $category->id)->sum('amount')))
            ];

            $data['categories_positive'][] = [
                'name' => $category->name,
                'value' => doubleval(Transaction::where('created_at', '>', Carbon::now()->subYear())->where('category_id', $category->id)->where('amount', '>', '0')->sum('amount'))
            ];
            $data['categories_negative'][] = [
                'name' => $category->name,
                'value' => -doubleval(Transaction::where('created_at', '>', Carbon::now()->subYear())->where('category_id', $category->id)->where('amount', '<', '0')->sum('amount'))
            ];
        }

        return ['data' => $data];
    }
}
