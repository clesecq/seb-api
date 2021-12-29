<?php

namespace App\Http\Controllers;

use BaconQrCode\Renderer\Color\Rgb;
use BaconQrCode\Renderer\Image\SvgImageBackEnd;
use BaconQrCode\Renderer\ImageRenderer;
use BaconQrCode\Renderer\RendererStyle\Fill;
use BaconQrCode\Renderer\RendererStyle\RendererStyle;
use BaconQrCode\Writer;
use Database\Models\FastAuthToken;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Str;

class FastAuthTokenController extends Controller
{
    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function create(Request $request)
    {
        $uuid = Str::uuid();
        FastAuthToken::create([
            "token" => hash('sha256', $uuid),
        ]);

        $svg = (new Writer(
            new ImageRenderer(
                new RendererStyle(192, 0, null, null, Fill::uniformColor(new Rgb(255, 255, 255), new Rgb(45, 55, 72))),
                new SvgImageBackEnd
            )
        ))->writeString(url("/fa/{$uuid}"));

        return ["svg" => trim(substr($svg, strpos($svg, "\n") + 1)), "uuid" => $uuid];
    }

    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function show($token)
    {
        FastAuthToken::where('created_at', '<=', now()->subMinutes(5))->delete();
        $token = FastAuthToken::with('user')->findOrFail(hash('sha256', $token));

        if ($token->user()->exists() && $token->accepted) {
            Auth::loginUsingId($token->user_id);
            $token->delete();
        }

        return $token;
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, $id)
    {
        FastAuthToken::where('created_at', '<=', now()->subMinutes(5))->delete();
        $token = FastAuthToken::findOrFail(hash('sha256', $id));

        $token->accepted = true;
        $token->user_id = $request->user()->id;
        $token->save();
    }
}
