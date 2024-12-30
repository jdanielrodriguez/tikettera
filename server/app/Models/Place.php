<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Place extends Model
{
    protected $table = 'places';

    protected $fillable = [
        'name',
        'description',
        'slug',
        'seat_number',
        'price',
        'x',
        'y',
        'sold',
        'avaliable',
        'state',
        'locality_id'
    ];
    public function locality()
    {
        return $this->belongsTo('App\Models\Locality', 'locality_id', 'id');
    }
    protected $casts = [
        'price' => 'float',
        'x' => 'float',
        'y' => 'float',
        'sold' => 'integer',
        'avaliable' => 'integer',
        'state' => 'integer',
    ];
}
