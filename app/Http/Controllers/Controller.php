<?php

namespace App\Http\Controllers;

use Illuminate\Foundation\Auth\Access\AuthorizesRequests;
use Illuminate\Foundation\Bus\DispatchesJobs;
use Illuminate\Foundation\Validation\ValidatesRequests;
use Illuminate\Routing\Controller as BaseController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class Controller extends BaseController
{
    use AuthorizesRequests, DispatchesJobs, ValidatesRequests;

    private function getDefaultFilters() {
        return [
            "has" => function ($r, $a, $k, $v) {
                return $v ? $r->has($a) : $r->doesntHave($a);
            },
            "like" => function ($r, $a, $k, $v) {
                return $r->where($a, 'like', '%' . $v . '%');
            },
            "equals" => function ($r, $a, $k, $v) {
                return $r->where($a, '=', $v);
            }
        ];
    }

    protected function commonIndex(Request $request, $class, $filters = [])
    {
        if (is_array($request->ids)) {
            return ["data" => $class::whereIn('id', $request->ids)->get()];
        } else {
            $data = $class::orderBy($request->order_by ?? 'id', $request->order_sort ?? 'asc');
            if (is_array($request->filter)) {
                foreach ($request->filter as $k => $v) {
                    if (array_key_exists($k, $filters)) {
                        if (is_callable($filters[$k])) {
                            $data = $filters[$k]($data, $k, $v);
                        } else {
                            $args = explode(":", $filters[$k], 2);
                            if (count($args) != 2 || !array_key_exists($args[0], $this->getDefaultFilters())) {
                                abort(500);
                            } else {
                                $data = $this->getDefaultFilters()[$args[0]]($data, $args[1], $k, $v);
                            }
                        }
                    } else {
                        abort(400);
                    }
                }
            }
            if (!is_null($request->per_page)) {
                $data = $data->paginate((int) $request->per_page);
            } else {
                $data = ["data" => $data->get(), "total" => $data->count()];
            }
            return $data;
        }
    }
}
