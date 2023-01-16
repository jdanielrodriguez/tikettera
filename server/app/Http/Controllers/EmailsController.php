<?php

namespace App\Http\Controllers;

use Illuminate\Mail\Message;
use Illuminate\Support\Facades\Mail;

define('CORREO', 'send@tikettera.com');
define('EMPRESA', 'Tikettera');
abstract class EmailsController extends Controller
{
    const CORREO = 'send@tikettera.com';
    const EMPRESA = 'Tikettera';
    public static function enviarConfirm($objectRequest, $objectSee)
    {
        if (env('MAIL_USERNAME') && env('MAIL_DRIVER') == 'smtp') {
            $names = ($objectSee->names != '' || $objectSee->lastnames != '') ? $objectSee->names . ' ' . $objectSee->lastnames : $objectSee->username;
            Mail::send(
                'emails.confirm',
                [
                    'empresa' => self::EMPRESA,
                    'url' => 'https://www.tikettera.com/login',
                    'app' => 'http://me.JoseDanielRodriguez.gt',
                    'password' => $objectRequest->user->password,
                    'username' => $objectSee->username,
                    'email' => $objectSee->email,
                    'name' => $names,
                ],
                function (Message $message) use ($objectSee, $names) {
                    $message->from(self::CORREO, self::EMPRESA)
                        ->sender(self::CORREO, self::EMPRESA)
                        ->to($objectSee->email, $names)
                        ->replyTo(self::CORREO, self::EMPRESA)
                        ->subject('Usuario Creado');
                }
            );
        }
    }

    public static function enviarRecovery($objectUpdate, $pass)
    {
        if (env('MAIL_USERNAME') && env('MAIL_DRIVER') == 'smtp') {
            Mail::send(
                'emails.recovery',
                [
                    'empresa' => $objectUpdate->empresaMostrar,
                    'url' => $objectUpdate->url,
                    'password' => $pass,
                    'username' => $objectUpdate->username,
                    'email' => $objectUpdate->email,
                    'name' => $objectUpdate->namesProveedor
                ],
                function (Message $message) use ($objectUpdate) {
                    $message->from($objectUpdate->email, $objectUpdate->names)
                        ->sender($objectUpdate->email, $objectUpdate->names)
                        ->to($objectUpdate->email, $objectUpdate->namesProveedor)
                        ->replyTo($objectUpdate->email, $objectUpdate->names)
                        ->subject('Contraseña Reestablecida');
                }
            );
        }
    }

    public static function enviarFactura($objectRequest, $objectSee)
    {
        if (env('MAIL_USERNAME') && env('MAIL_DRIVER') == 'smtp') {
            Mail::send(
                'emails.factura',
                [
                    'empresa' => self::EMPRESA,
                    'url' => 'https://www.tikettera.com/inicio',
                    'app' => 'http://me.JoseDanielRodriguez.gt',
                    'password' => $objectRequest->user->password,
                    'username' => $objectSee->username,
                    'email' => $objectSee->email,
                    'name' => $objectSee->names . ' ' . $objectSee->lastnames,
                ],
                function (Message $message) use ($objectSee) {
                    $message->from(self::CORREO, self::EMPRESA)
                        ->sender(self::CORREO, self::EMPRESA)
                        ->to($objectSee->email, $objectSee->names . ' ' . $objectSee->lastnames)
                        ->replyTo(self::CORREO, self::EMPRESA)
                        ->subject('Usuario Creado');
                }
            );
        }
    }

    public static function enviarPago($objectRequest, $objectSee)
    {
        if (env('MAIL_USERNAME') && env('MAIL_DRIVER') == 'smtp') {
            Mail::send('emails.pago', ['empresa' => self::EMPRESA, 'url' => 'https://www.tikettera.com/' . ($objectRequest->proveedor ? $objectRequest->proveedor->names . "/inicio" : "inicio"), 'app' => 'http://me.JoseDanielRodriguez.gt', 'password' => $objectRequest->user->password, 'username' => $objectSee->username, 'email' => $objectSee->email, 'name' => $objectSee->names . ' ' . $objectSee->lastnames,], function (Message $message) use ($objectSee) {
                $message->from(self::CORREO, self::EMPRESA)
                    ->sender(self::CORREO, self::EMPRESA)
                    ->to($objectSee->email, $objectSee->names . ' ' . $objectSee->lastnames)
                    ->replyTo(self::CORREO, self::EMPRESA)
                    ->subject('Usuario Creado');
            });
        }
    }

    public static function enviarConfirmacionVenta($objectRequest, $objectSee)
    {
        if (env('MAIL_USERNAME') && env('MAIL_DRIVER') == 'smtp') {
            Mail::send('emails.facturaConfirm', ['empresa' => self::EMPRESA, 'url' => 'https://www.tikettera.com/' . ($objectRequest->proveedor ? $objectRequest->proveedor->names . "/inicio" : "inicio"), 'app' => 'http://me.JoseDanielRodriguez.gt', 'password' => $objectRequest->user->password, 'username' => $objectSee->username, 'email' => $objectSee->email, 'name' => $objectSee->names . ' ' . $objectSee->lastnames,], function (Message $message) use ($objectSee) {
                $message->from(self::CORREO, self::EMPRESA)
                    ->sender(self::CORREO, self::EMPRESA)
                    ->to($objectSee->email, $objectSee->names . ' ' . $objectSee->lastnames)
                    ->replyTo(self::CORREO, self::EMPRESA)
                    ->subject('Usuario Creado');
            });
        }
    }
}
