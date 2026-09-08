<?php

namespace Database\Seeders;

use App\Models\User;
use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        $this->call([
            UserSeeder::class,
            MembershipsSeeder::class,
            CustomerSeeder::class,
            CustomerMembershipsSeeder::class,
            AssitsSeeder::class,
            PaymentsSeeder::class,
        ]);
    }
}
