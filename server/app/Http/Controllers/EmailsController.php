<?php

namespace App\Http\Controllers;

use Illuminate\Mail\Message;
use Illuminate\Support\Facades\Mail;

abstract class EmailsController extends Controller
{
    const CORREO = 'send@tikettera.com';
    const EMPRESA = 'Tikettera';

    public static function enviarConfirm($objectRequest, $objectSee)
    {
        self::enviarCorreo(
            'emails.confirm',
            [
                'empresa' => self::EMPRESA,
                'url' => 'https://www.tikettera.com/login',
                'app' => 'http://me.JoseDanielRodriguez.gt',
                'password' => $objectRequest->user->password,
                'username' => $objectSee->username,
                'email' => $objectSee->email,
                'name' => self::getNombreCompleto($objectSee)
            ],
            $objectSee,
            'Usuario Creado'
        );
    }

    public static function enviarRecovery($objectUpdate, $pass)
    {
        self::enviarCorreo(
            'emails.recovery',
            [
                'empresa' => self::EMPRESA,
                'url' => $objectUpdate->url,
                'password' => $pass,
                'username' => $objectUpdate->username,
                'email' => $objectUpdate->email,
                'name' => $objectUpdate->names
            ],
            $objectUpdate,
            'Contraseña Reestablecida'
        );
    }

    public static function enviarRestoreLink($objectUpdate, $uuid)
    {
        self::enviarCorreo(
            'emails.restore',
            [
                'empresa' => self::EMPRESA,
                'url' => 'https://www.tikettera.com/auth/',
                'uuid' => $uuid,
                'username' => $objectUpdate->username,
                'email' => $objectUpdate->email,
                'name' => $objectUpdate->names
            ],
            $objectUpdate,
            'Restablecimiento de Contraseña'
        );
    }

    public static function enviarFactura($objectRequest, $objectSee)
    {
        self::enviarCorreo(
            'emails.factura',
            [
                'empresa' => self::EMPRESA,
                'url' => 'https://www.tikettera.com/inicio',
                'app' => 'http://me.JoseDanielRodriguez.gt',
                'password' => $objectRequest->user->password,
                'username' => $objectSee->username,
                'email' => $objectSee->email,
                'name' => self::getNombreCompleto($objectSee)
            ],
            $objectSee,
            'Factura Generada'
        );
    }

    public static function enviarPago($objectRequest, $objectSee)
    {
        $url = 'https://www.tikettera.com/' . ($objectRequest->proveedor ? $objectRequest->proveedor->names . "/inicio" : "inicio");
        self::enviarCorreo(
            'emails.pago',
            [
                'empresa' => self::EMPRESA,
                'url' => $url,
                'app' => 'http://me.JoseDanielRodriguez.gt',
                'password' => $objectRequest->user->password,
                'username' => $objectSee->username,
                'email' => $objectSee->email,
                'name' => self::getNombreCompleto($objectSee)
            ],
            $objectSee,
            'Pago Procesado'
        );
    }

    public static function enviarConfirmacionVenta($objectRequest, $objectSee)
    {
        $url = 'https://www.tikettera.com/' . ($objectRequest->proveedor ? $objectRequest->proveedor->names . "/inicio" : "inicio");
        self::enviarCorreo(
            'emails.facturaConfirm',
            [
                'empresa' => self::EMPRESA,
                'url' => $url,
                'app' => 'http://me.JoseDanielRodriguez.gt',
                'password' => $objectRequest->user->password,
                'username' => $objectSee->username,
                'email' => $objectSee->email,
                'name' => self::getNombreCompleto($objectSee)
            ],
            $objectSee,
            'Confirmación de Venta'
        );
    }

    /**
     * Método genérico para envío de correos.
     */
    private static function enviarCorreo($view, $data, $objectSee, $subject)
    {
        try {
            if (self::esConfiguracionValida()) {
                Mail::send(
                    $view,
                    $data,
                    function (Message $message) use ($objectSee, $subject) {
                        $message->from(self::CORREO, self::EMPRESA)
                            ->sender(self::CORREO, self::EMPRESA)
                            ->to($objectSee->email, self::getNombreCompleto($objectSee))
                            ->replyTo(self::CORREO, self::EMPRESA)
                            ->subject($subject);
                    }
                );
            }
        } catch (\Exception $e) {
        }
    }

    /**
     * Validación de configuración SMTP.
     */
    private static function esConfiguracionValida()
    {
        return env('MAIL_DRIVER') === 'smtp' && env('MAIL_HOST') === '172.16.0.8';
    }

    /**
     * Obtener nombre completo de un objeto de usuario.
     */
    private static function getNombreCompleto($objectSee)
    {
        $names = $objectSee->names ?? 'Usuario';
        return trim("$names");
    }
}
