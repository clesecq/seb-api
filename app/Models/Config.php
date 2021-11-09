<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Config extends Model
{
    use HasFactory;

    protected $fillable = [
        "name",
        "value"
    ];

    protected $primaryKey = 'name';
    public $timestamps = false;

    public static function number(string $name)
    {
        return floatval(static::findOrFail($name)->value);
    }

    public static function integer(string $name)
    {
        return intval(static::findOrFail($name)->value);
    }

    public static function format(string $name, $param)
    {
        $engine = new \StringTemplate\Engine;
        return $engine->render(static::findOrFail($name)->value, $param);
    }
}
