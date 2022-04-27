<?php

namespace App\Http\Resources;

use Illuminate\Http\Resources\Json\JsonResource;

class RatingResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return array|\Illuminate\Contracts\Support\Arrayable|\JsonSerializable
     */
    public function toArray($request){
        return [
            'movie_rating'=>$this->movie_rating,
            'movie_id'=>$this->movie_id,
            'user_id'=>$this->user_id
        ];
    }
}
