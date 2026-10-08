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
        $titles = [
            'Apartment' => [
                'Bright apartment with an open-plan living area',
                'Modern apartment close to shops and transit',
                'Spacious apartment with a private balcony',
                'Move-in-ready apartment in a quiet neighborhood',
            ],
            'House' => [
                'Family home with a sunny private garden',
                'Welcoming home with room for the whole family',
                'Renovated home with a spacious backyard',
                'Quiet home with convenient off-street parking',
            ],
            'Villa' => [
                'Private villa with landscaped gardens',
                'Elegant villa with generous indoor and outdoor space',
                'Peaceful villa with a private terrace',
                'Contemporary villa in a sought-after location',
            ],
            'Office' => [
                'Flexible office suite in a convenient business district',
                'Bright office space with room for a growing team',
                'Professional workspace close to public transport',
                'Modern office with a practical open layout',
            ],
        ];
        $descriptions = [
            'Apartment' => [
                'Enjoy a bright, comfortable apartment with a welcoming living area and a practical layout. Shops, restaurants, and everyday services are close by.',
                'This well-kept apartment offers comfortable rooms and a convenient location near local shops and public transport.',
                'Settle into a spacious apartment with a pleasant living area and easy access to neighborhood services.',
            ],
            'House' => [
                'Make yourself at home in a welcoming property with comfortable living spaces and room to relax. Local shops and everyday services are nearby.',
                'This well-maintained home offers a practical layout in a quiet residential neighborhood, close to local amenities.',
                'Enjoy a comfortable home with generous living areas and convenient access to nearby schools, shops, and services.',
            ],
            'Villa' => [
                'Discover a private, spacious villa with comfortable living areas and room to enjoy the outdoors. Local amenities are within easy reach.',
                'This elegant villa offers a relaxed setting, generous interior space, and convenient access to nearby shops and services.',
                'Enjoy indoor and outdoor living in this welcoming villa, situated close to neighborhood amenities.',
            ],
            'Office' => [
                'Set up your business in a bright, flexible workspace with room for your team. Shops, restaurants, and public transport are nearby.',
                'This practical office space is in a convenient location with easy access to local services and public transport.',
                'A welcoming workspace in a well-connected business location, with nearby amenities for your team.',
            ],
        ];
        $type = fake()->randomElement($types);

        return [
            'user_id' => User::factory(),
            'title' => fake()->randomElement($titles[$type]),
            'description' => fake()->randomElement($descriptions[$type]),
            'price' => fake()->numberBetween(75000, 850000),
            'location' => fake()->city(),
            'address' => fake()->streetAddress(),
            'property_type' => $type,
            'transaction_type' => fake()->randomElement($transactions),
            'bedrooms' => fake()->numberBetween(1, 6),
            'bathrooms' => fake()->numberBetween(1, 4),
            'area' => fake()->numberBetween(600, 4200),
            'status' => fake()->randomElement($statuses),
        ];
    }
}