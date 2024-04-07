<?php

namespace Database\Seeders;

use App\Models\Prodi;
use App\Models\Role;
use App\Models\Status;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class RoleSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        //
        $roles = [
            [
                'name_role' => 'admin',
            ],
            [
                'name_role' => 'client',
            ],
            [
                'name_role' => 'superadmin',
            ],
        ];

        // create data roles
        Role::insert($roles);

        // create status
        $status = [
            [
                'name_status' => 'pending',
            ],
            [
                'name_status' => 'approved',
            ],
            [
                'name_status' => 'on progress',
            ],
            [
                'name_status' => 'sucess',
            ],
            [
                'name_status' => 'rejected',
            ],
        ];

        // create data status
        Status::insert($status);
    }
}
