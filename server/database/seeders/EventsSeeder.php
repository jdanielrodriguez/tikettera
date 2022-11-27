<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use DB;
class EventsSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        DB::table('events')->insert([
            'id'        => 1,
            'name'            => 'Inauguración Jardin y Salon de Eventos Martisa',
            'description'       => 'Los 3 huitecos',
            'type'              => 1,
            'state'             => 1,
            'user_id'           => 2,
            'category_id'       => 3,
            'created_at'        => date('Y-m-d H:m:s'),
            'updated_at'        => date('Y-m-d H:m:s')
        ]);


        DB::table('localities')->insert([
            'id'           => 1,
            'name'         => 'Inauguración Jardin y Salon de Eventos Martisa',
            'picture'       => 'https://scontent.faqb1-1.fna.fbcdn.net/v/t39.30808-6/314409566_113849668192137_947743175572885139_n.jpg?_nc_cat=100&ccb=1-7&_nc_sid=340051&_nc_ohc=7qAk1GOtoDwAX9g_8hy&_nc_ht=scontent.faqb1-1.fna&oh=00_AfA5H8KgieaYsRLP_wziDJEjy8P9S0g7SYLkSFLdnLEDJg&oe=6375752A',
            'description'  => 'Inauguración Jardin y Salon de Eventos Martisa Klaric',
            'address'      => 'Los 3 Huitecos',
            'time_start'   => '20:00:00',
            'time_end'     => '23:00:00',
            'date_start'   => '2022-12-04',
            'date_end'     => '2022-12-04',
            'start'        => '2022-12-04 20:00:00',
            'end'          => '2022-12-04 23:00:00',
            'lat'          => 0,
            'lng'          => 0,
            'type'         => 2,
            'state'        => 1,
            'event_id'     => 1,
            'created_at'   => date('Y-m-d H:m:s'),
            'updated_at'   => date('Y-m-d H:m:s')
        ]);

        DB::table('events_img')->insert([
            'name'        => 'Inauguración Jardin y Salon de Eventos Martisa',
            'description' => 'Los 3 Huitecos',
            'type'        => 1,
            'state'       => 1,
            'locality_id' => 1,
            'url'         => "https://scontent.faqb1-1.fna.fbcdn.net/v/t39.30808-6/314409566_113849668192137_947743175572885139_n.jpg?_nc_cat=100&ccb=1-7&_nc_sid=340051&_nc_ohc=7qAk1GOtoDwAX9g_8hy&_nc_ht=scontent.faqb1-1.fna&oh=00_AfA5H8KgieaYsRLP_wziDJEjy8P9S0g7SYLkSFLdnLEDJg&oe=6375752A",
            'created_at'  => date('Y-m-d H:m:s'),
            'updated_at'  => date('Y-m-d H:m:s')
        ]);


        DB::table('promoters')->insert([
            'name'                => "Isabel Barco",
            'porcent'             => 100,
            'qty'                 => null,
            'description'         => "Descuento de Isabel",
            'type'                => 1,
            'state'               => 1,
            'user_id'             => 2,
            'user_admin_id'       => null,
            'locality_id'         => 1,
            'created_at'          => date('Y-m-d H:m:s'),
            'updated_at'          => date('Y-m-d H:m:s')
        ]);

        DB::table('areas')->insert([
            'id'                => 1,
            'name'              => 'Mesas Vip',
            'description'       => 'Ven a ver a lso 3 Huitecos en Martisa',
            'price'             => '100',
            'total'             => '125',
            'sold'              => '0',
            'type'              => 1,
            'state'             => 1,
            'locality_id'       => 1,
            'created_at'        => date('Y-m-d H:m:s'),
            'updated_at'        => date('Y-m-d H:m:s')
        ]);
        for ($i=0; $i < 100; $i++) {
            DB::table('places')->insert([
                'name'              => 'No. de silla ',
                'description'       => null,
                'no'                => $i+1,
                'chaild'            => $i+1,
                'number'            => $i+1,
                'sold'              => '0',
                'avaliable'         => '1',
                'type'              => 1,
                'state'             => 1,
                'area_id'           => 1,
                'created_at'        => date('Y-m-d H:m:s'),
                'updated_at'        => date('Y-m-d H:m:s')
            ]);
        }

        DB::table('areas')->insert([
            'id'                => 2,
            'name'              => 'General',
            'description'       => 'Ven a ver a lso 3 Huitecos en Martisa',
            'price'             => '75',
            'total'             => '100',
            'sold'              => '0',
            'type'              => 1,
            'state'             => 1,
            'locality_id'       => 1,
            'created_at'        => date('Y-m-d H:m:s'),
            'updated_at'        => date('Y-m-d H:m:s')
        ]);
        for ($i=0; $i < 100; $i++) {
            DB::table('places')->insert([
                'name'              => 'No. de silla ',
                'description'       => null,
                'no'                => $i+1,
                'chaild'            => $i+1,
                'number'            => $i+1,
                'sold'              => '0',
                'avaliable'         => '1',
                'type'              => 1,
                'state'             => 1,
                'area_id'           => 2,
                'created_at'        => date('Y-m-d H:m:s'),
                'updated_at'        => date('Y-m-d H:m:s')
            ]);
        }
    }
}
