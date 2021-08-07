<?php

namespace App\Http\Controllers;

use App\Models\Config;
use App\Models\Product;
use Illuminate\Http\Request;

class DashboardController extends Controller
{
    public function dashboard(Request $request)
    {
        $data = [];

        if ($request->user()->hasPermission('products.show')) {
            $products = Product::whereColumn('count', '<=', 'alert_level')->get();
            $data["products_alerts"] = $products;
        }

        return $data;
    }
}
