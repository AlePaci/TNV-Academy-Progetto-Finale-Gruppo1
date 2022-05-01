import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { PreffDelete, Prefferd, SavePrefferd } from '../model/prefferd.model';

@Injectable({
  providedIn: 'root'
})
export class PreferredMovieService {

  constructor(private http: HttpClient) { }

  savePrefferredMovie(newPreff:SavePrefferd){
  return this.http.post<Prefferd>("http://localhost:8081/movies/",newPreff);
  }

  findAllMoviesbyUserId(userId : number| null){
    return this.http.get<Prefferd[]>(`http://localhost:8081/usermovies/${userId}`);
  }

  deletePreferredMovie(id:number){
    return this.http.delete<PreffDelete>(`http://localhost:8080/movie/${id}`);
  }

  findPreffUserMovie(user_id : number | null, movie_id : number| null){
    return this.http.get<Prefferd>(`http://localhost:8081/idmovie/${user_id}/${movie_id}`);
  }
}
