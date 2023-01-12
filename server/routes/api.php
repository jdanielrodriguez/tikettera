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
Route::group(['middleware' => ['jwt.auth']], function() {
    Route::post('change-password', [App\Http\Controllers\AuthenticateController::class,'changePassword']);
    Route::post('logout', [App\Http\Controllers\AuthenticateController::class,'logout']);
});
Route::post('signup', [App\Http\Controllers\AuthenticateController::class,'signUp']);
Route::post('login', [App\Http\Controllers\AuthenticateController::class,'login']);
Route::post('reset-password', [App\Http\Controllers\AuthenticateController::class,'resetPassword']);
Route::post('validate-captcha', [App\Http\Controllers\AuthenticateController::class,'validarCaptcha']);

Route::get('events/active', [App\Http\Controllers\EventsController::class,'getActives']);
Route::resource('events', App\Http\Controllers\EventsController::class);
Route::get('advertisers/active', [App\Http\Controllers\AdvertisersController::class,'getActives']);
Route::resource('advertisers', App\Http\Controllers\AdvertisersController::class);

Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
    return $request->user();
});
