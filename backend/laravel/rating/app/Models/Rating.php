<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Eloquent;

class Rating extends Model
{
    use HasFactory;

    protected $fillable =['movie_rating','movie_id','user_id'];
}
