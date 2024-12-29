<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/

Route::group(['middleware' => ['jwt.auth']], function () {
    Route::post('change-password', [App\Http\Controllers\AuthenticationController::class, 'changePassword']);
    Route::get('users/{id}', [App\Http\Controllers\UsersController::class, 'show']);
    Route::put('users/{id}', [App\Http\Controllers\UsersController::class, 'update']);
    Route::post('logout', [App\Http\Controllers\AuthenticationController::class, 'logout']);
    Route::resource('advertisements', App\Http\Controllers\AdvertisementController::class);
    Route::get('/payment-methods', [App\Http\Controllers\PaymentMethodController::class, 'index']);
    Route::post('/payment-methods', [App\Http\Controllers\PaymentMethodController::class, 'store']);
    Route::put('/payment-methods/{id}/default', [App\Http\Controllers\PaymentMethodController::class, 'setDefault']);
    Route::delete('/payment-methods/{id}', [App\Http\Controllers\PaymentMethodController::class, 'destroy']);
});
Route::post('signup', [App\Http\Controllers\AuthenticationController::class, 'signUp']);
Route::post('login', [App\Http\Controllers\AuthenticationController::class, 'login']);
Route::post('reset-password', [App\Http\Controllers\AuthenticationController::class, 'sendNewPassword']);
Route::post('restore-password', [App\Http\Controllers\AuthenticationController::class, 'restorePassword']);
Route::post('recovery-password', [App\Http\Controllers\AuthenticationController::class, 'recoveryPassword']);
Route::post('validate-captcha', [App\Http\Controllers\AuthenticationController::class, 'validarCaptcha']);

Route::get('events/active', [App\Http\Controllers\EventsController::class, 'getActives']);
Route::get('events/localities/{slug}', [App\Http\Controllers\EventsController::class, 'getLocalities']);
Route::get('events/{event_slug}/localities/{slug}', [App\Http\Controllers\EventsController::class, 'getLocality']);
Route::resource('events', App\Http\Controllers\EventsController::class);
Route::get('advertisements/active', [App\Http\Controllers\AdvertisementController::class, 'getActives']);

Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
    return $request->user();
});
