import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { DeleteMessage, NewRating, RatingData } from '../model/ratings.model'

@Injectable({
  providedIn: 'root'
})
export class RatingsService {

  constructor(private http: HttpClient) { }

  saveRating(newRating:NewRating){
    return this.http.post<RatingData>("http://localhost:8000/api/ratings/",newRating);
  }

  getRating(userId :number, movieId: number){
     return this.http.get<RatingData>(`http://127.0.0.1:8000/api/ratingsByUserMovie/${userId}/${movieId}`);

  }
  deleteRating(ratingId:number){
    return this.http.delete<DeleteMessage>(`http://localhost:8000/api/ratings/${ratingId}`);
  }

  
}
