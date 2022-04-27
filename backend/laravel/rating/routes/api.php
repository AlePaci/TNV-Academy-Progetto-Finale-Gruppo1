<?php

use App\Http\Controllers\RatingController;
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

Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
    return $request->user();
});

Route::apiResource('/ratings', RatingController::class);

Route::get('/ratingsByMovie/{movie_id}','App\Http\Controllers\RatingController@getRatingByMovieId' );

Route::get('/ratingsByUser/{user_id}','App\Http\Controllers\RatingController@getRatingByUserId' );

Route::get('/ratingsByUserMovie/{user_id}/{movie_id}','App\Http\Controllers\RatingController@getRatingByUserMovie');

