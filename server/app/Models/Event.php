<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Event extends Model
{
    protected $table = 'events';

    protected $fillable = [
        'name',
        'slug',
        'description',
        'address',
        'time_start',
        'time_end',
        'date_start',
        'date_end',
        'lat',
        'lng',
        'reason_id',
        'type_id',
        'state',
        'picture'
    ];

    public function localities()
    {
        return $this->hasMany('App\Models\Locality', 'event_id', 'id');
    }
    protected $casts = [
        'lat' => 'float',
        'lng' => 'float',
        'date_start' => 'date',
        'date_end' => 'date',
        'time_start' => 'string',
        'time_end' => 'string',
        'state' => 'integer',
    ];
}
