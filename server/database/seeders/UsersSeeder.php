<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Carbon\Carbon;
use DB;
class UsersSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        $timeZone = 'America/Guatemala';
        DB::table('roles')->insert([
            'id'                => 1,
            'name'              => 'Administrador',
            'state'             => 1,
            'created_at'        => Carbon::now($timeZone),
            'updated_at'        => Carbon::now($timeZone)
        ]);

        DB::table('roles')->insert([
            'id'                => 2,
            'name'              => 'Promotor',
            'state'             => 1,
            'created_at'        => Carbon::now($timeZone),
            'updated_at'        => Carbon::now($timeZone)
        ]);

        DB::table('roles')->insert([
            'id'                => 3,
            'name'              => 'Cliente',
            'state'             => 1,
            'created_at'        => Carbon::now($timeZone),
            'updated_at'        => Carbon::now($timeZone)
        ]);

        DB::table('roles')->insert([
            'id'                => 4,
            'name'              => 'Subscriptor',
            'state'             => 1,
            'created_at'        => Carbon::now($timeZone),
            'updated_at'        => Carbon::now($timeZone)
        ]);

        DB::table('categories')->insert([
            'id'                => 1,
            'name'              => 'Educacion',
            'state'             => 1,
            'created_at'        => Carbon::now($timeZone),
            'updated_at'        => Carbon::now($timeZone)
        ]);

        DB::table('categories')->insert([
            'id'                => 2,
            'name'              => 'Concierto',
            'state'             => 1,
            'created_at'        => Carbon::now($timeZone),
            'updated_at'        => Carbon::now($timeZone)
        ]);

        DB::table('categories')->insert([
            'id'                => 3,
            'name'              => 'Conferencias',
            'state'             => 1,
            'created_at'        => Carbon::now($timeZone),
            'updated_at'        => Carbon::now($timeZone)
        ]);


        DB::table('categories')->insert([
            'id'                => 4,
            'name'              => 'Convivio',
            'state'             => 1,
            'created_at'        => Carbon::now($timeZone),
            'updated_at'        => Carbon::now($timeZone)
        ]);


        DB::table('categories')->insert([
            'id'                => 5,
            'name'              => 'Otros',
            'state'             => 1,
            'created_at'        => Carbon::now($timeZone),
            'updated_at'        => Carbon::now($timeZone)
        ]);

        DB::table('auth_method')->insert([
            'id'                => 1,
            'name'              => 'Simple',
            'logo'              => 'https://via.placeholder.com/500x250.png?text=Simple',
            'time_out'          => null,
            'type'              => 1,
            'state'             => 1,
            'created_at'        => Carbon::now($timeZone),
            'updated_at'        => Carbon::now($timeZone)
        ]);

        DB::table('auth_method')->insert([
            'id'                => 2,
            'name'              => 'Google',
            'logo'              => 'https://pbs.twimg.com/profile_images/1214480780472279040/sH9e2ctc_400x400.png',
            'time_out'          => null,
            'type'              => 1,
            'state'             => 1,
            'created_at'        => Carbon::now($timeZone),
            'updated_at'        => Carbon::now($timeZone)
        ]);

        DB::table('auth_method')->insert([
            'id'                => 3,
            'name'              => 'Facebook',
            'logo'              => 'https://www.facebook.com/images/fb_icon_325x325.png',
            'time_out'          => null,
            'type'              => 1,
            'state'             => 1,
            'created_at'        => Carbon::now($timeZone),
            'updated_at'        => Carbon::now($timeZone)
        ]);

        DB::table('auth_method')->insert([
            'id'                => 4,
            'name'              => 'Tiktok',
            'logo'              => 'https://cdn.pixabay.com/photo/2021/01/30/06/42/tiktok-5962992_1280.png',
            'time_out'          => null,
            'type'              => 1,
            'state'             => 1,
            'created_at'        => Carbon::now($timeZone),
            'updated_at'        => Carbon::now($timeZone)
        ]);

        DB::table('users')->insert([
            "id"                => 1,
            'username'          => "admin",
            'password'          => bcrypt('admin'),
            'email'             => "admin@tikettera.com",
            'names'             => "Admin",
            'state'             => 1,
            'rol_id'            => 1,
            'created_at'        => Carbon::now($timeZone),
            'updated_at'        => Carbon::now($timeZone)
        ]);


        DB::table('auth_method_users')->insert([
            'id'                => 1,
            'user_id'           => 1,
            'auth_method_id'    => 1,
            'time_out'          => null,
            'created_at'        => Carbon::now($timeZone),
            'updated_at'        => Carbon::now($timeZone)
        ]);

        DB::table('users')->insert([
            "id"                => 2,
            'username'          =>  "promotor",
            'password'          => bcrypt('promotor'),
            'email'             => "promotor@tikettera.com",
            'names'             => "Daniel",
            'state'             => 1,
            'rol_id'            => 2,
            'created_at'        => Carbon::now($timeZone),
            'updated_at'        => Carbon::now($timeZone)
        ]);


        DB::table('auth_method_users')->insert([
            'id'                => 2,
            'user_id'           => 2,
            'auth_method_id'    => 1,
            'time_out'          => null,
            'created_at'        => Carbon::now($timeZone),
            'updated_at'        => Carbon::now($timeZone)
        ]);

        DB::table('users')->insert([
            "id"                => 3,
            'username'          => "cliente",
            'password'          => bcrypt('cliente'),
            'email'             => "cliente@tikettera.com",
            'names'             => "Cliente",
            'state'             => 1,
            'rol_id'            => 3,
            'created_at'        => Carbon::now($timeZone),
            'updated_at'        => Carbon::now($timeZone)
        ]);


        DB::table('auth_method_users')->insert([
            'id'                => 3,
            'user_id'           => 3,
            'auth_method_id'    => 1,
            'time_out'          => null,
            'created_at'        => Carbon::now($timeZone),
            'updated_at'        => Carbon::now($timeZone)
        ]);
    }
}
