<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Event extends Model
{
    protected $table = 'events';

    public function localities()
    {
        return $this->hasMany('App\Models\Locality', 'event_id', 'id');
    }
}
