<?php

namespace App\Http\Controllers;

use BaconQrCode\Renderer\Color\Rgb;
use BaconQrCode\Renderer\Image\SvgImageBackEnd;
use BaconQrCode\Renderer\ImageRenderer;
use BaconQrCode\Renderer\RendererStyle\Fill;
use BaconQrCode\Renderer\RendererStyle\RendererStyle;
use BaconQrCode\Writer;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\URL;

class TokensController extends Controller
{
    public function list(Request $request)
    {
        $tokens = [];

        foreach($request->user()->tokens as $token) {
            $tokens[] = $token->only(['id', 'name', 'last_used_at', 'created_at']);
        }

        return ["data" => ["tokens" => $tokens]];
    }

    public function create(Request $request)
    {
        $data = $request->validate([
            "name" => ["required", "string"]
        ]);

        $token = $request->user()->createToken($data["name"]);

        $svg = (new Writer(
            new ImageRenderer(
                new RendererStyle(192, 0, null, null, Fill::uniformColor(new Rgb(255, 255, 255), new Rgb(45, 55, 72))),
                new SvgImageBackEnd
            )
        ))->writeString(json_encode([
            'url' => URL::to('/'),
            'token' => $token->plainTextToken
        ]));

        return ['token' => $token->plainTextToken, 'qrcode' => trim(substr($svg, strpos($svg, "\n") + 1))];
    }

    public function delete(Request $request, $id)
    {
        $token = $request->user()->tokens()->where('id', $id)->firstOrFail();
        $token->delete();
        return ['data' => $token];
    }

    public function clear(Request $request)
    {
        $request->user()->tokens()->delete();
    }
}
