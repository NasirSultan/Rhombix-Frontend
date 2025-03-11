<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\AuthController;
Route::get('/user', function (Request $request) {
    return $request->user();
})->middleware('auth:sanctum');




route::post('/user' ,[AuthController::class,'user']);


use App\Http\Controllers\SongController;

Route::middleware('auth:sanctum')->group(function () {
    Route::post('/songs', [SongController::class, 'store']);     // Upload a song
    Route::get('/songs', [SongController::class, 'index']);       // Get all songs of user
    Route::get('/songs/{id}', [SongController::class, 'show']);  // Get a specific song
    Route::delete('/songs/{id}', [SongController::class, 'destroy']);
    Route::get('songs/category/{categoryId}', [SongController::class, 'getSongsByCategory']); // Delete a song
});


// routes/api.php


