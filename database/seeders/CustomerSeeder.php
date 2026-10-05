<?php

namespace Database\Seeders;

use Illuminate\Support\Facades\DB;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class CustomerSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $customers = [
            [
                'name'       => 'Sandra López',
                'phone'      => '2472344223',
                'email'      => 'sandra@gmail.com',
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'name'       => 'Carlos Ramírez',
                'phone'      => '2471122334',
                'email'      => 'carlos@gmail.com',
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'name'       => 'María Torres',
                'phone'      => '2473344556',
                'email'      => 'maria.torres@gmail.com',
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'name'       => 'Luis Hernández',
                'phone'      => '2474455667',
                'email'      => 'luis.hernandez@gmail.com',
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'name'       => 'Ana Martínez',
                'phone'      => '2475566778',
                'email'      => 'ana.martinez@gmail.com',
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'name'       => 'Jorge Sánchez',
                'phone'      => '2476677889',
                'email'      => 'jorge.sanchez@gmail.com',
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'name'       => 'Fernanda Cruz',
                'phone'      => '2477788990',
                'email'      => 'fernanda.cruz@gmail.com',
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'name'       => 'Ricardo Flores',
                'phone'      => '2478899001',
                'email'      => 'ricardo.flores@gmail.com',
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'name'       => 'Paola Jiménez',
                'phone'      => '2479900112',
                'email'      => 'paola.jimenez@gmail.com',
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'name'       => 'Miguel Ángel Ruiz',
                'phone'      => '2470011223',
                'email'      => 'miguel.ruiz@gmail.com',
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'name'       => 'Daniela Morales',
                'phone'      => '2471234567',
                'email'      => 'daniela.morales@gmail.com',
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'name'       => 'Eduardo Vargas',
                'phone'      => '2472345678',
                'email'      => 'eduardo.vargas@gmail.com',
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'name'       => 'Karla Mendoza',
                'phone'      => '2473456789',
                'email'      => 'karla.mendoza@gmail.com',
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'name'       => 'Andrés Guzmán',
                'phone'      => '2474567890',
                'email'      => 'andres.guzman@gmail.com',
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'name'       => 'Valeria Reyes',
                'phone'      => '2475678901',
                'email'      => 'valeria.reyes@gmail.com',
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'name'       => 'Óscar Castillo',
                'phone'      => '2476789012',
                'email'      => 'oscar.castillo@gmail.com',
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'name'       => 'Gabriela Ortiz',
                'phone'      => '2477890123',
                'email'      => 'gabriela.ortiz@gmail.com',
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'name'       => 'Roberto Silva',
                'phone'      => '2478901234',
                'email'      => 'roberto.silva@gmail.com',
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'name'       => 'Ximena Delgado',
                'phone'      => '2479012345',
                'email'      => 'ximena.delgado@gmail.com',
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'name'       => 'Alejandro Núñez',
                'phone'      => '2470123456',
                'email'      => 'alejandro.nunez@gmail.com',
                'created_at' => now(),
                'updated_at' => now(),
            ],



        ];
        DB::table('customers')->insert($customers);
    }
}
