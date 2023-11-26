<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Locality extends Model
{
    protected $table = 'localities';

    public function places()
    {
        return $this->hasMany('App\Models\Place', 'locality_id', 'id');
    }
}
