<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Carbon\Carbon;
use Illuminate\Support\Facades\DB;

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

        // Roles
        DB::table('roles')->insert([
            ['id' => 1, 'name' => 'Administrador', 'state' => 1, 'created_at' => Carbon::now($timeZone), 'updated_at' => Carbon::now($timeZone)],
            ['id' => 2, 'name' => 'Promotor', 'state' => 1, 'created_at' => Carbon::now($timeZone), 'updated_at' => Carbon::now($timeZone)],
            ['id' => 3, 'name' => 'Cliente', 'state' => 1, 'created_at' => Carbon::now($timeZone), 'updated_at' => Carbon::now($timeZone)],
            ['id' => 4, 'name' => 'Subscriptor', 'state' => 1, 'created_at' => Carbon::now($timeZone), 'updated_at' => Carbon::now($timeZone)],
        ]);

        // Categories
        DB::table('categories')->insert([
            ['id' => 1, 'name' => 'Educacion', 'slug' => 'educacion', 'state' => 1, 'created_at' => Carbon::now($timeZone), 'updated_at' => Carbon::now($timeZone)],
            ['id' => 2, 'name' => 'Concierto', 'slug' => 'concierto', 'state' => 1, 'created_at' => Carbon::now($timeZone), 'updated_at' => Carbon::now($timeZone)],
            ['id' => 3, 'name' => 'Conferencias', 'slug' => 'conferencias', 'state' => 1, 'created_at' => Carbon::now($timeZone), 'updated_at' => Carbon::now($timeZone)],
            ['id' => 4, 'name' => 'Convivio', 'slug' => 'convivio', 'state' => 1, 'created_at' => Carbon::now($timeZone), 'updated_at' => Carbon::now($timeZone)],
            ['id' => 5, 'name' => 'Otros', 'slug' => 'otros', 'state' => 1, 'created_at' => Carbon::now($timeZone), 'updated_at' => Carbon::now($timeZone)],
        ]);

        // Auth Methods
        DB::table('auth_method')->insert([
            ['id' => 1, 'name' => 'Simple', 'description' => 'Login básico', 'logo' => 'https://via.placeholder.com/500x250.png?text=Simple', 'session_expiration' => 604800, 'type' => 1, 'state' => 1, 'created_at' => Carbon::now($timeZone), 'updated_at' => Carbon::now($timeZone)],
            ['id' => 2, 'name' => 'Google', 'description' => 'Login con Google', 'logo' => 'https://pbs.twimg.com/profile_images/1214480780472279040/sH9e2ctc_400x400.png', 'session_expiration' => 604800, 'type' => 1, 'state' => 1, 'created_at' => Carbon::now($timeZone), 'updated_at' => Carbon::now($timeZone)],
            ['id' => 3, 'name' => 'Facebook', 'description' => 'Login con Facebook', 'logo' => 'https://www.facebook.com/images/fb_icon_325x325.png', 'session_expiration' => 604800, 'type' => 1, 'state' => 1, 'created_at' => Carbon::now($timeZone), 'updated_at' => Carbon::now($timeZone)],
            ['id' => 4, 'name' => 'TikTok', 'description' => 'Login con TikTok', 'logo' => 'https://cdn.pixabay.com/photo/2021/01/30/06/42/tiktok-5962992_1280.png', 'session_expiration' => 604800, 'type' => 1, 'state' => 1, 'created_at' => Carbon::now($timeZone), 'updated_at' => Carbon::now($timeZone)],
        ]);

        // Users
        DB::table('users')->insert([
            [
                'id' => 1,
                'username' => 'admin',
                'password' => bcrypt('admin'),
                'email' => 'admin@tikettera.com',
                'names' => 'Admin',
                'state' => 1,
                'rol_id' => 1,
                'created_at' => Carbon::now($timeZone),
                'updated_at' => Carbon::now($timeZone),
            ],
            [
                'id' => 2,
                'username' => 'promotor',
                'password' => bcrypt('promotor'),
                'email' => 'promotor@tikettera.com',
                'names' => 'Daniel',
                'state' => 1,
                'rol_id' => 2,
                'created_at' => Carbon::now($timeZone),
                'updated_at' => Carbon::now($timeZone),
            ],
            [
                'id' => 3,
                'username' => 'cliente',
                'password' => bcrypt('cliente'),
                'email' => 'cliente@tikettera.com',
                'names' => 'Cliente',
                'state' => 1,
                'rol_id' => 3,
                'created_at' => Carbon::now($timeZone),
                'updated_at' => Carbon::now($timeZone),
            ],
        ]);

        // Auth Method Users
        DB::table('auth_method_users')->insert([
            ['id' => 1, 'user_id' => 1, 'auth_method_id' => 1, 'token' => 'admin-token', 'last_conection' => Carbon::now($timeZone), 'state' => 1, 'created_at' => Carbon::now($timeZone), 'updated_at' => Carbon::now($timeZone)],
            ['id' => 2, 'user_id' => 2, 'auth_method_id' => 1, 'token' => 'promotor-token', 'last_conection' => Carbon::now($timeZone), 'state' => 1, 'created_at' => Carbon::now($timeZone), 'updated_at' => Carbon::now($timeZone)],
            ['id' => 3, 'user_id' => 3, 'auth_method_id' => 1, 'token' => 'cliente-token', 'last_conection' => Carbon::now($timeZone), 'state' => 1, 'created_at' => Carbon::now($timeZone), 'updated_at' => Carbon::now($timeZone)],
        ]);
    }
}
