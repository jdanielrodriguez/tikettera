<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
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
        DB::table('roles')->insert([
            'id'                => 1,
            'name'              => 'Administrador',
            'description'       => 'Administrador del sistema',
            'state'             => 1,
            'created_at'        => date('Y-m-d H:m:s'),
            'updated_at'        => date('Y-m-d H:m:s')
        ]);

        DB::table('roles')->insert([
            'id'                => 2,
            'name'              => 'Promotor',
            'description'       => 'Vendedor de Entradas',
            'state'             => 1,
            'created_at'        => date('Y-m-d H:m:s'),
            'updated_at'        => date('Y-m-d H:m:s')
        ]);

        DB::table('roles')->insert([
            'id'                => 3,
            'name'              => 'Cliente',
            'description'       => 'Comprador de Entradas',
            'state'             => 1,
            'created_at'        => date('Y-m-d H:m:s'),
            'updated_at'        => date('Y-m-d H:m:s')
        ]);

        DB::table('categories')->insert([
            'id'                => 1,
            'name'              => 'Educacion',
            'description'       => 'Actividades Educativas',
            'state'             => 1,
            'created_at'        => date('Y-m-d H:m:s'),
            'updated_at'        => date('Y-m-d H:m:s')
        ]);

        DB::table('categories')->insert([
            'id'                => 2,
            'name'              => 'Concierto',
            'description'       => 'Conciertos de Musica',
            'state'             => 1,
            'created_at'        => date('Y-m-d H:m:s'),
            'updated_at'        => date('Y-m-d H:m:s')
        ]);

        DB::table('categories')->insert([
            'id'                => 3,
            'name'              => 'Conferencias',
            'description'       => 'Conferencias Educativas',
            'state'             => 1,
            'created_at'        => date('Y-m-d H:m:s'),
            'updated_at'        => date('Y-m-d H:m:s')
        ]);


        DB::table('categories')->insert([
            'id'                => 4,
            'name'              => 'Convivio',
            'description'       => 'Convivio de Grupo',
            'state'             => 1,
            'created_at'        => date('Y-m-d H:m:s'),
            'updated_at'        => date('Y-m-d H:m:s')
        ]);


        DB::table('categories')->insert([
            'id'                => 5,
            'name'              => 'Otros',
            'description'       => 'Otro tipo de eventos',
            'state'             => 1,
            'created_at'        => date('Y-m-d H:m:s'),
            'updated_at'        => date('Y-m-d H:m:s')
        ]);

        DB::table('users')->insert([
            "id"                => 1,
            'username'          => "admin",
            'password'          => bcrypt('admin'),
            'email'             => "admin@tikettera.com",
            'names'             => "Admin",
            'lastnames'         => "Sys",
            'description'       => "",
            'birth'             => "1995-01-06",
            'state'             => 1,
            'rol_id'            => 1,
            'created_at'        => date('Y-m-d H:m:s'),
            'updated_at'        => date('Y-m-d H:m:s')
        ]);

        DB::table('users')->insert([
            "id"                => 2,
            'username'          =>  "promotor",
            'password'          => bcrypt('promotor'),
            'email'             => "promotor@tikettera.com",
            'names'             => "Daniel",
            'lastnames'         => "Rodriguez",
            'description'       => "Promotor de Eventos / Vendedor de Entradas",
            'code'              => "lndWV6cjYx",
            'birth'             => "1995-01-06",
            'state'             => 1,
            'rol_id'            => 2,
            'created_at'        => date('Y-m-d H:m:s'),
            'updated_at'        => date('Y-m-d H:m:s')
        ]);

        DB::table('users')->insert([
            "id"                => 3,
            'username'          => "cliente",
            'password'          => bcrypt('cliente'),
            'email'             => "cliente@tikettera.com",
            'names'             => "Cliente",
            'lastnames'         => "Comprador",
            'code'              => "dW5kZWZpbm",
            'description'       => "Comprador del sistema",
            'birth'             => "1999-01-01",
            'state'             => 1,
            'rol_id'            => 3,
            'created_at'        => date('Y-m-d H:m:s'),
            'updated_at'        => date('Y-m-d H:m:s')
        ]);
    }
}
