<?php

namespace Database\Factories;

use App\Models\Account;
use Illuminate\Database\Eloquent\Factories\Factory;

class AccountFactory extends Factory
{
    /**
     * The name of the factory's corresponding model.
     *
     * @var string
     */
    protected $model = Account::class;

    /**
     * Define the model's default state.
     *
     * @return array
     */
    public function definition()
    {
        return [
            'name' => $this->faker->word(),
            'iban' => $this->faker->iban('FR'),
            'bic' => $this->faker->swiftBicNumber(),
            'balance' => $this->faker->randomFloat(2, 100, 500),
        ];
    }
}
