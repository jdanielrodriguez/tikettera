<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Locality extends Model
{
    protected $table = 'localities';

    protected $fillable = [
        'name',
        'description',
        'slug',
        'price',
        'tasa_cambio',
        'iva',
        'tasa_iva',
        'comision',
        'sold',
        'withdrawall',
        'state',
        'event_id'
    ];

    public function places()
    {
        return $this->hasMany('App\Models\Place', 'locality_id', 'id');
    }
    public function event()
    {
        return $this->belongsTo('App\Models\Event', 'event_id', 'id');
    }
    protected $casts = [
        'price' => 'float',
        'tasa_cambio' => 'float',
        'iva' => 'float',
        'tasa_iva' => 'float',
        'comision' => 'float',
        'sold' => 'integer',
        'withdrawall' => 'integer',
        'state' => 'integer',
    ];
}
