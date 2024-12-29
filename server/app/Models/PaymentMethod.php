<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class PaymentMethod extends Model
{
    use HasFactory;

    protected $table = 'payment_methods';

    // Campos permitidos para asignación masiva
    protected $fillable = [
        'user_id',
        'payment_type_id',
        'card_number',
        'card_name',
        'bank_name',
        'expiration_date',
        'cvv',
        'is_default',
        'encrypted_data',
    ];

    /**
     * Relación con el usuario (User).
     */
    public function user()
    {
        return $this->belongsTo(User::class);
    }

    /**
     * Relación con el tipo de pago (PaymentType).
     */
    public function paymentType()
    {
        return $this->belongsTo(PaymentType::class);
    }
}
