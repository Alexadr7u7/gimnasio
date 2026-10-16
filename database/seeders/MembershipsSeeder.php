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
                'description' => 'Acceso a todas las instalaciones durante una semana.',
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'name' => 'Premium',
                'price' => 400.00,
                'duration' => 'monthly',
                'description' => 'Acceso a todas las instalaciones durante un mes.',
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'name' => 'Anual',
                'price' => 2400.00,
                'duration' => 'year',
                'description' => 'Acceso a todas las instalaciones durante un año.',
                'created_at' => now(),
                'updated_at' => now(),
            ],
        ];

        DB::table('memberships')->insert($memberships);
    }
}
