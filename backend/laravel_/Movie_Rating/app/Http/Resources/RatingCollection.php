<?php

namespace App\Http\Resources;

use Illuminate\Http\Resources\Json\ResourceCollection;

class RatingCollection extends ResourceCollection {
    /**
     * Trasforma le ResourceCollection in array
     *
     * @param \Illuminate\Http\Request   $request
     * @return array|\Illuminate\Contracts\Support\Arrayable|\JsonSerializable
     */

     public function toArray($request)
     {
         return[
            'data'=> $this->collection,
            'author'=> 'Marco Loddo'
         ];
     }
}
