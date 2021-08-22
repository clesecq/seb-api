<?php

namespace App\Http\Controllers;

use App\Models\Account;
use App\Models\Config;
use App\Models\Product;
use App\Models\Transaction;
use App\Models\TransactionCategory;
use Illuminate\Http\Request;
use Illuminate\Support\Str;
use Illuminate\Support\Facades\DB;

class DashboardController extends Controller
{
    public function dashboard(Request $request)
    {
        $data = ['id' => 'me'];

        if ($request->user()->hasPermission('products.show')) {
            $products = Product::whereColumn('count', '<', 'alert_level')->get();
            $data["products_alerts"] = $products;
        }

        if ($request->user()->hasPermission('accounts.show')) {
            $accounts = Account::all('name', 'balance');
            $data["accounts"] = $accounts;
        }

        if ($request->user()->hasPermission('transactions.show')) {
            // Transaction graph data
            $temp_data = [];
            $accounts = ['total' => 'Total'];
            $account_last_values = [];

            foreach (Account::all() as $account) {
                $transactions_start = doubleval(Transaction::where('created_at', '<', DB::raw('CURRENT_DATE() - INTERVAL 1 YEAR'))->where('account_id', $account->id)->sum('amount'));
                $transactions_data = DB::table('transactions')->select(DB::raw('created_at as date, sum(amount) as amount'))->where('created_at', '>=', DB::raw('CURRENT_DATE() - INTERVAL 1 YEAR'))->where('account_id', $account->id)->groupBy('created_at')->orderBy('created_at')->get();
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

            $collection = collect($temp_data);

            $date_field = Str::random(40);

            $the_data = $collection->map(function ($item, $key) use ($date_field, $accounts, &$account_last_values) {
                $item[$date_field] = $key;
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
            })->values()->toArray();

            $data['transactions'] = [
                'data' => $the_data,
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
                    'value' => doubleval(Transaction::where('created_at', '>', DB::raw('CURRENT_DATE() - INTERVAL 1 YEAR'))->where('category_id', $category->id)->sum('amount'))
                ];

                $data['categories_positive'][] = [
                    'name' => $category->name,
                    'value' => doubleval(Transaction::where('created_at', '>', DB::raw('CURRENT_DATE() - INTERVAL 1 YEAR'))->where('category_id', $category->id)->where('amount', '>', '0')->sum('amount'))
                ];
                $data['categories_negative'][] = [
                    'name' => $category->name,
                    'value' => -doubleval(Transaction::where('created_at', '>', DB::raw('CURRENT_DATE() - INTERVAL 1 YEAR'))->where('category_id', $category->id)->where('amount', '<', '0')->sum('amount'))
                ];
            }
        }

        if ($request->user()->hasPermission('products.show')) {
            $data["stocks_value"] = doubleval(Product::select(DB::raw('sum(price * count) as total'))->first()->total);
        }

        return ['data' => $data];
    }
}
