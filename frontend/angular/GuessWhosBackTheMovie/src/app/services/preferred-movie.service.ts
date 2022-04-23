import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Prefferd } from '../model/prefferd.model';

@Injectable({
  providedIn: 'root'
})
export class PreferredMovieService {

  constructor(private http: HttpClient) { }

  savePrefferredMovie(newPreff:Partial<Prefferd>){
  return this.http.post<Prefferd>("http://localhost:8081/movies/",newPreff);
  }

  findAllMoviesbyUserId(){

  }

  deletePreferredMovie(){

  }
}
