<?php

namespace Database\Factories;

use App\Models\Transaction;
use Illuminate\Database\Eloquent\Factories\Factory;

class TransactionFactory extends Factory
{
    /**
     * The name of the factory's corresponding model.
     *
     * @var string
     */
    protected $model = Transaction::class;

    /**
     * Define the model's default state.
     *
     * @return array
     */
    public function definition()
    {
        return [
            'name' => $this->faker->words(3, 'true'),
            'amount' => ($this->faker->boolean() ? -1 : 1) * $this->faker->randomFloat(2, 5, 60),
            'rectification' => $this->faker->boolean(),
            'user_id' => 1,
            'account_id' => $this->faker->numberBetween(1, 5),
        ];
    }
}
