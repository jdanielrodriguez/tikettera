<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class PaymentType extends Model
{
    use HasFactory;

    protected $table = 'payment_types';

    // Campos permitidos para asignación masiva
    protected $fillable = [
        'type',
        'subtype',
        'is_active',
    ];

    /**
     * Relación con métodos de pago (PaymentMethods).
     */
    public function paymentMethods()
    {
        return $this->hasMany(PaymentMethod::class);
    }
}
