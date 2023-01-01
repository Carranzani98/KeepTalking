<?php

use App\Http\Controllers\AuthController;
use App\Http\Controllers\ChatController;
use App\Http\Controllers\CountryController;
use App\Http\Controllers\LanguageController;
use App\Http\Controllers\UserController;
use App\Http\Controllers\CalendarController;

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

    //REST
    Route::post('/register', [UserController::class, 'store']);

    Route::post('/login', [AuthController::class, 'login']);

    Route::post('/logout', [AuthController::class, 'logout']);

    Route::get('/languages', [LanguageController::class, 'index']);

    Route::get('/countries', [CountryController::class, 'index']);

    Route::get('/user', [UserController::class, 'index']);

    Route::put('/update', [UserController::class, 'update']);

    Route::get('/matching_users', [UserController::class, 'matchingUsers']);

    Route::get('/chats', [ChatController::class, 'index']);

    Route::delete('/delete_all', [ChatController::class, 'deleteAllChats']);

    Route::post('/delete_chat', [ChatController::class, 'deleteChat']);

    Route::post('/get_messages', [ChatController::class, 'fetchMessages']);

    Route::post('/messages', [ChatController::class, 'sendMessage']);

    Route::get('/meets', [CalendarController::class, 'index']);

    Route::post('/meet', [CalendarController::class, 'createMeet']);

    Route::post('/delete_meet', [CalendarController::class, 'deleteMeet']);
    