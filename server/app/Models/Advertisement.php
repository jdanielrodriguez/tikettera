<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Advertisement extends Model
{
    protected $table = 'advertisements';

    // Permitir asignación masiva de estos campos
    protected $fillable = [
        'name',
        'description',
        'slug',
        'url',
        'picture',
        'type',
        'state',
        'event_id',
        'user_id',
    ];

    /**
     * Relación con el evento.
     */
    public function event()
    {
        return $this->belongsTo(Event::class);
    }

    /**
     * Relación con el usuario.
     */
    public function user()
    {
        return $this->belongsTo(User::class);
    }

    /**
     * Relación con descuentos de anuncios.
     */
    public function discounts()
    {
        return $this->hasMany(AdvertisementsDiscount::class, 'advertisement_id');
    }
}
