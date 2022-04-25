import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { MovieDetails } from '../model/movieDetails.model';
import { MovieCredits } from '../model/movieCredits.model';

@Injectable({
  providedIn: 'root'
})
export class TMDBApiService {

  apiKey : string = "8129930b81d6b924c89dc0ca009b2c1a"

  constructor(private http: HttpClient) {}

  getMovieDetails(movieId:number){
    return this.http.get<MovieDetails>(`https://api.themoviedb.org/3/movie/${movieId}?api_key=${this.apiKey}&language=en-US`);
  }

  getMovieCredits(movieId:number){
    return this.http.get<MovieCredits>(`https://api.themoviedb.org/3/movie/${movieId}/credits?api_key=${this.apiKey}&language=en-US`)
  }

  getMoviePoster(path: string | null){
    return `https://image.tmdb.org/t/p/original/${path}`;
  }
}
