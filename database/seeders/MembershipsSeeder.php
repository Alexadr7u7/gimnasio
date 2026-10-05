<?php

namespace Database\Seeders;

use Illuminate\Support\Facades\DB;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class MembershipsSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $memberships = [

            [
                'name' => 'Semanal',
                'price' => 100.00,
                'duration' => 'weekly',
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'name' => 'Premium',
                'price' => 400.00,
                'duration' => 'monthly',
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'name' => 'Anual',
                'price' => 2400.00,
                'duration' => 'year',
                'created_at' => now(),
                'updated_at' => now(),
            ],
        ];

        DB::table('memberships')->insert($memberships);
    }
}
