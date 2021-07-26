<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;

class HasPermission
{
    /**
     * Handle an incoming request.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \Closure  $next
     * @return mixed
     */
    public function handle(Request $request, Closure $next, string $name)
    {
        if ($request->user()->hasPermission($name)) {
            return $next($request);
        }

        return response([
            'message' => 'Insufficient permissions'
        ], 403);
    }
}
