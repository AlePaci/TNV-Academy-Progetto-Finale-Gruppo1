<?php

namespace App\Http\Controllers;

use App\Http\Resources\RatingCollection;
use App\Http\Resources\RatingResource;
use App\Models\Rating;
use Illuminate\Support\Facades\Validator;
use Illuminate\Http\Request;
use Illuminate\Http\Response;


class RatingController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        return response()->json([
            'Ratings'=>new RatingCollection(Rating::all()),
            'Response Status'=>Response::HTTP_OK
        ]);
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        $validator = Validator::make(
            $request->only(['movie_rating','movie_id','user_id']),
            [
                'movie_rating' => 'required|integer|between:1,5',
                'movie_id' => 'required|integer|min:0',
                'user_id' => 'required|integer|min:0'
            ]);

        if ($validator->fails()) {
            return response()->json(
                $validator->errors(),
                Response::HTTP_UNPROCESSABLE_ENTITY
            );
        }

        $rating = Rating::create($request->only('movie_rating','movie_id','user_id'));
   
        return response()->json([
            'Ratings'=>new RatingResource($rating),
            'Response Status'=>Response::HTTP_OK
            ]);
    }

    /**
     * Display the specified resource.
     *
     * @param  \App\Models\Rating  $rating
     * @return \Illuminate\Http\Response
     */
    public function show(Rating $rating)
    {
        return response()->json([
            'Ratings'=>new RatingResource($rating),
            'Response Status'=>Response::HTTP_OK
            ]);
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\Models\Rating  $rating
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, Rating $rating)
    {
        $validator = Validator::make(
            $request->only(['movie_rating']),
            [
                'movie_rating' => 'required|integer|between:1,5'
            ]);

        if ($validator->fails()) {
            return response()->json(
                $validator->errors(),
                Response::HTTP_UNPROCESSABLE_ENTITY
            );
        }
        $rating->update($request->only(['movie_rating']));

        return response()->json([
            'Ratings'=>new RatingResource($rating),
            'Response Status' => Response::HTTP_OK
        ]);
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Models\Rating  $rating
     * @return \Illuminate\Http\Response
     */
    public function destroy(Rating $rating)
    {
        
        $rating->delete();
        return response()->json([
            'message'=>'Rating deleted.',
            'Response Status'=>Response::HTTP_NO_CONTENT
        ]);
    }

    /**
     * Display the specified resource.
     *
     * @param  $movie_id 
     * @return \Illuminate\Http\Response
     */
    public function getRatingByMovieId($movie_id){
        
        return response()->json([
            'Ratings'=>new RatingCollection( Rating::where('movie_id','LIKE',$movie_id)->get()),
            'Response Status'=>Response::HTTP_OK
        ]);

    }


    /**
     * Display the specified resource.
     *
     * @param  4user_id
     * @return \Illuminate\Http\Response
     */
    public function getRatingByUserId($user_id){
        
        return response()->json([
            'Ratings'=>new RatingCollection( Rating::where('user_id','LIKE',$user_id)->get()),
            'Response Status'=>Response::HTTP_OK
        ]);
    }

    public function getRatingByUserMovie($user_id,$movie_id){
        
        return response()->json([
            'Ratings'=>new RatingCollection( Rating::where('user_id','LIKE',$user_id)->where('movie_id','LIKE',$movie_id)->get()),
            'Response Status'=>Response::HTTP_OK
        ]);
    }


}

