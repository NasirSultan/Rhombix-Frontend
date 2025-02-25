<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

Route::get('/user', function (Request $request) {
    return $request->user();
})->middleware('auth:sanctum');


use App\Http\Controllers\Auth\RegisterController;

Route::post('login', [RegisterController::class, 'login']);
Route::post('register', [RegisterController::class, 'register']);



Route::middleware('auth:sanctum')->group(function () {
    Route::post('/update-profile-picture', [RegisterController::class, 'updateProfilePicture']);
});

use App\Http\Controllers\UserController;

Route::post('/user/create-or-update', [RegisterController::class, 'createOrUpdateUser']);
