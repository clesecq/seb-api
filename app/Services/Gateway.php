<?php

namespace App\Services;

use Exception;
use Illuminate\Support\Facades\Http;

class Gateway
{
    private bool $enabled;
    private string $url;
    private string $key;

    private array $models;

    public function __construct(?bool $enabled, ?string $url, ?string $key)
    {
        $this->enabled = $enabled ?? false;
        $this->url = $url ?? "";
        $this->key = $key ?? "";
        $this->models = [];
    }

    public function regsiterModel($model, string $name)
    {
        $this->models[$model] = $name;
    }

    public function event($type, $model, $data)
    {
        if (!$this->enabled) {
            return;
        }

        if (array_key_exists($model, $this->models)) {
            try {
                Http::withHeaders([
                    "Authorization" => "Bearer " . $this->key
                ])->post($this->url . "event/" . $this->models[$model] . "." . $type, $data);
            } catch (Exception $e) {
            }
        }
    }
}
