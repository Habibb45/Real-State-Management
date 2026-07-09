<?php

namespace Database\Seeders;

use App\Models\Property;
use App\Models\User;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;

class DatabaseSeeder extends Seeder
{
    public function run(): void
    {
        User::query()->updateOrCreate(
            ['email' => 'admin@realestate.test'],
            [
                'name' => 'Admin User',
                'phone' => '+1 555 0100',
                'role' => 'admin',
                'password' => Hash::make('password'),
            ]
        );

        $owners = User::factory()->count(4)->create();

        Property::factory()
            ->count(12)
            ->sequence(fn ($sequence) => ['user_id' => $owners[$sequence->index % $owners->count()]->id])
            ->create();
    }
}
