<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Contracts\Session\Session;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class Locale
{
    const LOCALES = ['en', 'fr'];

    public function handle(Request $request, Closure $next)
    {
        $guard = Auth::guard('api');
        if (!$guard->check()) {
            $locale = 'en';

            if ($request->has('lang')) {
                $lang = $request->get('lang');
                if (in_array($lang, self::LOCALES)) {
                    $locale = $lang;
                }
            }

            app()->setLocale($locale);
        }

        return $next($request);
    }
}
