<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Carbon\Carbon;
use Illuminate\Support\Facades\DB;

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

        // Event Reasons
        DB::table('events_reason')->insert([
            'id' => 1,
            'name' => 'Inauguración Jardin y Salon de Eventos Martisa',
            'description' => 'Los 3 huitecos',
            'slug' => $this->clean('Inauguración Jardin y Salon de Eventos Martisa'),
            'state' => 1,
            'category_id' => 3,
            'created_at' => Carbon::now($timeZone),
            'updated_at' => Carbon::now($timeZone),
        ]);

        // Events
        DB::table('events')->insert([
            'id' => 1,
            'name' => 'Inauguración Jardin y Salon de Eventos Martisa',
            'slug' => $this->clean('Inauguración Jardin y Salon de Eventos Martisa'),
            'picture' => 'https://scontent.faqb1-1.fna.fbcdn.net/v/t39.30808-6/314409566_113849668192137_947743175572885139_n.jpg',
            'description' => 'Inauguración Jardin y Salon de Eventos Martisa Klaric',
            'address' => 'Los 3 Huitecos',
            'start' => '2025-12-04 20:00:00',
            'end' => '2025-12-04 23:00:00',
            'date_start' => '2025-12-04',
            'date_end' => '2025-12-04',
            'time_start' => '20:00:00',
            'time_end' => '23:00:00',
            'lat' => 0,
            'lng' => 0,
            'user_id' => 1,
            'state' => 1,
            'reason_id' => 1,
            'created_at' => Carbon::now($timeZone),
            'updated_at' => Carbon::now($timeZone),
        ]);

        // Event Images
        DB::table('events_img')->insert([
            'name' => 'Inauguración Jardin y Salon de Eventos Martisa',
            'description' => 'Los 3 Huitecos',
            'state' => 1,
            'event_id' => 1,
            'url' => 'https://scontent.faqb1-1.fna.fbcdn.net/v/t39.30808-6/314409566_113849668192137_947743175572885139_n.jpg',
            'created_at' => Carbon::now($timeZone),
            'updated_at' => Carbon::now($timeZone),
        ]);

        // Promoters
        DB::table('promoters')->insert([
            'name' => 'Isabel Barco',
            'commission_rate' => 100,
            'flat_rate' => null,
            'description' => 'Descuento de Isabel',
            'state' => 1,
            'user_id' => 2,
            'user_admin_id' => 2,
            'created_at' => Carbon::now($timeZone),
            'updated_at' => Carbon::now($timeZone),
        ]);

        // Localities and Places
        $this->seedLocalitiesAndPlaces($timeZone);
    }

    private function seedLocalitiesAndPlaces($timeZone)
    {
        // VIP Locality
        DB::table('localities')->insert([
            'id' => 1,
            'name' => 'Mesas Vip',
            'description' => 'Ven a ver a los 3 Huitecos en Martisa',
            'slug' => $this->clean('Mesas Vip'),
            'price' => 100,
            'sold' => 0,
            'state' => 1,
            'event_id' => 1,
            'created_at' => Carbon::now($timeZone),
            'updated_at' => Carbon::now($timeZone),
        ]);

        for ($i = 1; $i <= 100; $i++) {
            DB::table('places')->insert([
                'name' => "No. de silla $i",
                'slug' => $this->clean("Mesas Vip No. de silla $i"),
                'description' => null,
                'seat_number' => $i,
                'sold' => 0,
                'price' => 100,
                'state' => 1,
                'locality_id' => 1,
                'created_at' => Carbon::now($timeZone),
                'updated_at' => Carbon::now($timeZone),
            ]);
        }

        // General Locality
        DB::table('localities')->insert([
            'id' => 2,
            'name' => 'General',
            'description' => 'Ven a ver a los 3 Huitecos en Martisa',
            'slug' => $this->clean('General'),
            'price' => 75,
            'sold' => 0,
            'state' => 1,
            'event_id' => 1,
            'created_at' => Carbon::now($timeZone),
            'updated_at' => Carbon::now($timeZone),
        ]);

        for ($i = 1; $i <= 100; $i++) {
            DB::table('places')->insert([
                'name' => "No. de silla $i",
                'slug' => $this->clean("General No. de silla $i"),
                'description' => null,
                'seat_number' => $i,
                'sold' => 0,
                'price' => 75,
                'state' => 1,
                'locality_id' => 2,
                'created_at' => Carbon::now($timeZone),
                'updated_at' => Carbon::now($timeZone),
            ]);
        }
    }

    private function clean($string)
    {
        $string = $this->cleanString(strtolower(str_replace(' ', '-', $string))); // Replaces all spaces with hyphens.

        return preg_replace('/[^a-z0-9\-]/', '', $string); // Removes special chars.
    }

    private function cleanString($text)
    {
        $utf8 = [
            '/[áàâãªä]/u' => 'a',
            '/[ÁÀÂÃÄ]/u' => 'A',
            '/[ÍÌÎÏ]/u' => 'I',
            '/[íìîï]/u' => 'i',
            '/[éèêë]/u' => 'e',
            '/[ÉÈÊË]/u' => 'E',
            '/[óòôõºö]/u' => 'o',
            '/[ÓÒÔÕÖ]/u' => 'O',
            '/[úùûü]/u' => 'u',
            '/[ÚÙÛÜ]/u' => 'U',
            '/ç/' => 'c',
            '/Ç/' => 'C',
            '/ñ/' => 'n',
            '/Ñ/' => 'N',
            '/–/' => '-', // UTF-8 hyphen to "normal" hyphen
            '/[’‘‹›‚]/u' => '', // Single quote
            '/[“”«»„]/u' => '', // Double quote
            '/ /' => '-', // Space
        ];
        return preg_replace(array_keys($utf8), array_values($utf8), $text);
    }
}
