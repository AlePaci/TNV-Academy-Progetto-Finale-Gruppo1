import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { NewRating, RatingData } from '../model/ratings.model'

@Injectable({
  providedIn: 'root'
})
export class RatingsService {

  constructor(private http: HttpClient) { }

  saveRating(newRating:NewRating){
    return this.http.post<RatingData>("http://localhost:8000/api/ratings/",newRating);
  }


  
}
