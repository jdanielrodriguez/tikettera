<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class PasswordRecovery extends Model
{
    protected $table = 'password_recovery';

    /**
     * Campos que pueden ser asignados masivamente.
     */
    protected $fillable = [
        'uuid',
        'current_password',
        'password',
        'password_rep',
        'state',
        'current_auth_method_id',
        'auth_method_id',
        'user_id',
    ];

}
