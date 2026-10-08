<?php

namespace Database\Factories;

use App\Models\Property;
use App\Models\User;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends Factory<Property>
 */
class PropertyFactory extends Factory
{
    public function definition(): array
    {
        $types = ['Apartment', 'House', 'Villa', 'Office'];
        $transactions = ['Rent', 'Sale'];
        $statuses = ['available', 'sold', 'rented'];

        return [
            'user_id' => User::factory(),
            'title' => fake()->unique()->sentence(4),
            'description' => fake()->paragraphs(3, true),
            'price' => fake()->numberBetween(75000, 850000),
            'location' => fake()->city(),
            'address' => fake()->streetAddress(),
            'property_type' => fake()->randomElement($types),
            'transaction_type' => fake()->randomElement($transactions),
            'bedrooms' => fake()->numberBetween(1, 6),
            'bathrooms' => fake()->numberBetween(1, 4),
            'area' => fake()->numberBetween(600, 4200),
            'status' => fake()->randomElement($statuses),
        ];
    }
}