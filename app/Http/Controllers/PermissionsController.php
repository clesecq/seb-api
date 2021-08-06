<?php

namespace App\Http\Controllers;

use Illuminate\Support\Str;
use Illuminate\Http\Request;
use App\Models\Permission;
use Illuminate\Support\Facades\Route;

class PermissionsController extends Controller
{
    private function getPerms()
    {
        $routeCollection = Route::getRoutes();
        $permissions = [];

        foreach ($routeCollection as $value) {
            foreach ($value->action['middleware'] as $middleware) {
                if (Str::startsWith($middleware, 'permission:')) {
                    $permissions[] = Str::replaceFirst('permission:', '', $middleware);
                }
            }
        }
        $permissions = collect($permissions)->unique();

        $resources = [];
        $actions = [];

        foreach ($permissions as $permission) {
            $split = Str::of($permission)->explode('.');
            $resources[] = $split[0];
            $actions[] = $split[1];
        }

        $resources = collect($resources)->unique();
        $actions = collect($actions)->unique();

        foreach ($actions as $action) {
            $permissions->push('*.' . $action);
        }

        foreach ($resources as $resource) {
            $permissions->push($resource . '.*');
        }

        $permissions->push('*.*');

        $out = [];
        foreach ($permissions as $perm) {
            $out[] = [
                'id' => $perm,
                'name' => $this->namePerm($perm)
            ];
        }

        return collect($out);
    }

    private function namePerm($perm)
    {
        $split = Str::of($perm)->explode('.');
        $action = $split[1];
        $resource = $split[0];
        $resource = $resource == "*" ? "everything" : Str::replace('_', ' ', $resource);
        $action = $action == "*" ? "manage" : $action;

        return Str::ucfirst($action . ' ' . $resource);
    }

    public function index(Request $request)
    {
        $permissions = $this->getPerms();

        if (is_array($request->ids)) {
            return ["data" => $permissions->whereIn('id', $request->ids)->values()];
        } else {
            if (strcasecmp($request->order_sort ?? 'asc', 'asc')) {
                $data = $permissions->sortBy($request->order_by ?? 'id');
            } else {
                $data = $permissions->sortByDesc($request->order_by ?? 'id');
            }

            if (is_array($request->filter)) {
                foreach ($request->filter as $k => $v) {
                    if ($k == 'q') {
                        $k = 'name';
                    }
                    $data = $data->values()->filter(function($item) use ($k, $v) {
                        return stristr($item[$k], $v) !== false;
                    });
                }
            }
            $total = $data->count();
            if (!is_null($request->per_page))
                $data = $data->forPage((int) $request->page, (int) $request->per_page);
            return ["data" => $data->values(), "total" => $total];
        }
    }
}
