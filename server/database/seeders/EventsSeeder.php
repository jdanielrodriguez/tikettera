<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Carbon\Carbon;
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
        $timeZone = 'America/Guatemala';
        DB::table('events_reason')->insert([
            'id'                => 1,
            'name'              => 'Inauguración Jardin y Salon de Eventos Martisa',
            'description'       => 'Los 3 huitecos',
            'slug'              => $this->clean('Inauguración Jardin y Salon de Eventos Martisa'),
            'type'              => 1,
            'state'             => 1,
            'user_id'           => 2,
            'category_id'       => 3,
            'created_at'        => Carbon::now($timeZone),
            'updated_at'        => Carbon::now($timeZone)
        ]);


        DB::table('events')->insert([
            'id'           => 1,
            'name'         => 'Inauguración Jardin y Salon de Eventos Martisa',
            'slug'         => $this->clean('Inauguración Jardin y Salon de Eventos Martisa'),
            'picture'      => 'https://scontent.faqb1-1.fna.fbcdn.net/v/t39.30808-6/314409566_113849668192137_947743175572885139_n.jpg?_nc_cat=100&ccb=1-7&_nc_sid=340051&_nc_ohc=7qAk1GOtoDwAX9g_8hy&_nc_ht=scontent.faqb1-1.fna&oh=00_AfA5H8KgieaYsRLP_wziDJEjy8P9S0g7SYLkSFLdnLEDJg&oe=6375752A',
            'description'  => 'Inauguración Jardin y Salon de Eventos Martisa Klaric',
            'address'      => 'Los 3 Huitecos',
            'time_start'   => '20:00:00',
            'time_end'     => '23:00:00',
            'date_start'   => '2025-12-04',
            'date_end'     => '2025-12-04',
            'start'        => '2025-12-04 20:00:00',
            'end'          => '2025-12-04 23:00:00',
            'lat'          => 0,
            'lng'          => 0,
            'type'         => 2,
            'state'        => 1,
            'reason_id'     => 1,
            'created_at'   => Carbon::now($timeZone),
            'updated_at'   => Carbon::now($timeZone)
        ]);

        DB::table('events_img')->insert([
            'name'        => 'Inauguración Jardin y Salon de Eventos Martisa',
            'description' => 'Los 3 Huitecos',
            'type'        => 1,
            'state'       => 1,
            'event_id' => 1,
            'url'         => "https://scontent.faqb1-1.fna.fbcdn.net/v/t39.30808-6/314409566_113849668192137_947743175572885139_n.jpg?_nc_cat=100&ccb=1-7&_nc_sid=340051&_nc_ohc=7qAk1GOtoDwAX9g_8hy&_nc_ht=scontent.faqb1-1.fna&oh=00_AfA5H8KgieaYsRLP_wziDJEjy8P9S0g7SYLkSFLdnLEDJg&oe=6375752A",
            'created_at'  => Carbon::now($timeZone),
            'updated_at'  => Carbon::now($timeZone)
        ]);


        DB::table('promoters')->insert([
            'name'                => "Isabel Barco",
            'porcent'             => 100,
            'qty'                 => null,
            'description'         => "Descuento de Isabel",
            'type'                => 1,
            'state'               => 1,
            'user_id'             => 2,
            'user_admin_id'       => 2,
            'created_at'          => Carbon::now($timeZone),
            'updated_at'          => Carbon::now($timeZone)
        ]);

        DB::table('localities')->insert([
            'id'                => 1,
            'name'              => 'Mesas Vip',
            'description'       => 'Ven a ver a lso 3 Huitecos en Martisa',
            'slug'              => $this->clean('Mesas Vip'),
            'price'             => '100',
            'total'             => '125',
            'sold'              => '0',
            'type'              => 1,
            'state'             => 1,
            'event_id'          => 1,
            'created_at'        => Carbon::now($timeZone),
            'updated_at'        => Carbon::now($timeZone)
        ]);
        for ($i = 0; $i < 100; $i++) {
            DB::table('places')->insert([
                'name'              => 'No. de silla ',
                'slug'              => $this->clean('No. de silla ' . $i + 1),
                'description'       => null,
                'no'                => $i + 1,
                'chaild'            => $i + 1,
                'number'            => $i + 1,
                'sold'              => '0',
                'avaliable'         => '1',
                'type'              => 1,
                'state'             => 1,
                'locality_id'       => 1,
                'created_at'        => Carbon::now($timeZone),
                'updated_at'        => Carbon::now($timeZone)
            ]);
        }

        DB::table('localities')->insert([
            'id'                => 2,
            'name'              => 'General',
            'description'       => 'Ven a ver a lso 3 Huitecos en Martisa',
            'slug'              => $this->clean('General'),
            'price'             => '75',
            'total'             => '100',
            'sold'              => '0',
            'type'              => 1,
            'state'             => 1,
            'event_id'          => 1,
            'created_at'        => Carbon::now($timeZone),
            'updated_at'        => Carbon::now($timeZone)
        ]);
        for ($i = 0; $i < 100; $i++) {
            DB::table('places')->insert([
                'name'              => 'No. de silla ',
                'description'       => null,
                'slug'              => $this->clean('No. de silla ' . $i + 1),
                'no'                => $i + 1,
                'chaild'            => $i + 1,
                'number'            => $i + 1,
                'sold'              => '0',
                'avaliable'         => '1',
                'type'              => 1,
                'state'             => 1,
                'locality_id'       => 2,
                'created_at'        => Carbon::now($timeZone),
                'updated_at'        => Carbon::now($timeZone)
            ]);
        }
    }

    private function clean($string)
    {
        $string = $this->cleanString(strtolower(str_replace(' ', '-', $string))); // Replaces all spaces with hyphens.

        return preg_replace('/[^a-z0-9\-]/', '', $string); // Removes special chars.
    }

    private function cleanString($text) {
        $utf8 = array(
            '/[áàâãªä]/u'   =>   'a',
            '/[ÁÀÂÃÄ]/u'    =>   'A',
            '/[ÍÌÎÏ]/u'     =>   'I',
            '/[íìîï]/u'     =>   'i',
            '/[éèêë]/u'     =>   'e',
            '/[ÉÈÊË]/u'     =>   'E',
            '/[óòôõºö]/u'   =>   'o',
            '/[ÓÒÔÕÖ]/u'    =>   'O',
            '/[úùûü]/u'     =>   'u',
            '/[ÚÙÛÜ]/u'     =>   'U',
            '/ç/'           =>   'c',
            '/Ç/'           =>   'C',
            '/ñ/'           =>   'n',
            '/Ñ/'           =>   'N',
            '/–/'           =>   '-', // UTF-8 hyphen to "normal" hyphen
            '/[’‘‹›‚]/u'    =>   ' ', // Literally a single quote
            '/[“”«»„]/u'    =>   ' ', // Double quote
            '/ /'           =>   ' ', // nonbreaking space (equiv. to 0x160)
        );
        return preg_replace(array_keys($utf8), array_values($utf8), $text);
    }
}
