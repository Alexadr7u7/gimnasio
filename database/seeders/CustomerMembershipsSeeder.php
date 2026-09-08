<?php

namespace Database\Seeders;

use Illuminate\Support\Facades\DB;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class CustomerMembershipsSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $customerMemberships = [
            [
                'customer_id'   => 1,
                'membership_id' => 1,
                'start_date'    => now(),
                'end_date'      => now()->addDays(30),
                'status'        => 'active',
                'created_at'    => now(),
                'updated_at'    => now(),
            ],
            [
                'customer_id'   => 2,
                'membership_id' => 2,
                'start_date'    => now(),
                'end_date'      => now()->addDays(30),
                'status'        => 'active',
                'created_at'    => now(),
                'updated_at'    => now(),
            ],
            [
                'customer_id'   => 3,
                'membership_id' => 3,
                'start_date'    => now(),
                'end_date'      => now()->addDays(30),
                'status'        => 'expired',
                'created_at'    => now(),
                'updated_at'    => now(),
            ],
            [
                'customer_id'   => 4,
                'membership_id' => 1,
                'start_date'    => now()->subDays(10),
                'end_date'      => now()->addDays(20),
                'status'        => 'active',
                'created_at'    => now(),
                'updated_at'    => now(),
            ],
            [
                'customer_id'   => 5,
                'membership_id' => 2,
                'start_date'    => now()->subDays(5),
                'end_date'      => now()->addDays(25),
                'status'        => 'active',
                'created_at'    => now(),
                'updated_at'    => now(),
            ],
            [
                'customer_id'   => 6,
                'membership_id' => 3,
                'start_date'    => now()->subDays(40),
                'end_date'      => now()->subDays(10),
                'status'        => 'expired',
                'created_at'    => now(),
                'updated_at'    => now(),
            ],
            [
                'customer_id'   => 7,
                'membership_id' => 1,
                'start_date'    => now()->subDays(2),
                'end_date'      => now()->addDays(28),
                'status'        => 'active',
                'created_at'    => now(),
                'updated_at'    => now(),
            ],
            [
                'customer_id'   => 8,
                'membership_id' => 2,
                'start_date'    => now()->subDays(15),
                'end_date'      => now()->addDays(15),
                'status'        => 'active',
                'created_at'    => now(),
                'updated_at'    => now(),
            ],
            [
                'customer_id'   => 9,
                'membership_id' => 3,
                'start_date'    => now()->subDays(60),
                'end_date'      => now()->subDays(30),
                'status'        => 'expired',
                'created_at'    => now(),
                'updated_at'    => now(),
            ],
            [
                'customer_id'   => 10,
                'membership_id' => 1,
                'start_date'    => now()->subDays(1),
                'end_date'      => now()->addDays(29),
                'status'        => 'active',
                'created_at'    => now(),
                'updated_at'    => now(),
            ],
            [
                'customer_id'   => 11,
                'membership_id' => 2,
                'start_date'    => now()->subDays(3),
                'end_date'      => now()->addDays(27),
                'status'        => 'active',
                'created_at'    => now(),
                'updated_at'    => now(),
            ],
            [
                'customer_id'   => 12,
                'membership_id' => 3,
                'start_date'    => now()->subDays(20),
                'end_date'      => now()->addDays(10),
                'status'        => 'active',
                'created_at'    => now(),
                'updated_at'    => now(),
            ],
            [
                'customer_id'   => 13,
                'membership_id' => 1,
                'start_date'    => now()->subDays(50),
                'end_date'      => now()->subDays(20),
                'status'        => 'expired',
                'created_at'    => now(),
                'updated_at'    => now(),
            ],
            [
                'customer_id'   => 14,
                'membership_id' => 2,
                'start_date'    => now(),
                'end_date'      => now()->addDays(30),
                'status'        => 'expiring_soon',
                'created_at'    => now(),
                'updated_at'    => now(),
            ],
            [
                'customer_id'   => 15,
                'membership_id' => 3,
                'start_date'    => now()->subDays(7),
                'end_date'      => now()->addDays(23),
                'status'        => 'active',
                'created_at'    => now(),
                'updated_at'    => now(),
            ],
            [
                'customer_id'   => 16,
                'membership_id' => 1,
                'start_date'    => now()->subDays(35),
                'end_date'      => now()->subDays(5),
                'status'        => 'expired',
                'created_at'    => now(),
                'updated_at'    => now(),
            ],
            [
                'customer_id'   => 17,
                'membership_id' => 2,
                'start_date'    => now()->subDays(4),
                'end_date'      => now()->addDays(26),
                'status'        => 'expiring_soon',
                'created_at'    => now(),
                'updated_at'    => now(),
            ],
            [
                'customer_id'   => 18,
                'membership_id' => 3,
                'start_date'    => now()->subDays(12),
                'end_date'      => now()->addDays(18),
                'status'        => 'active',
                'created_at'    => now(),
                'updated_at'    => now(),
            ],
            [
                'customer_id'   => 19,
                'membership_id' => 1,
                'start_date'    => now()->subDays(45),
                'end_date'      => now()->subDays(15),
                'status'        => 'expired',
                'created_at'    => now(),
                'updated_at'    => now(),
            ],
            [
                'customer_id'   => 20,
                'membership_id' => 2,
                'start_date'    => now()->subDays(6),
                'end_date'      => now()->addDays(24),
                'status'        => 'expiring_soon',
                'created_at'    => now(),
                'updated_at'    => now(),
            ],
        ];

        DB::table('customer_memberships')->insert($customerMemberships);
    }
}
