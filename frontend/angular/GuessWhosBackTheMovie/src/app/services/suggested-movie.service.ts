import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { NewSuggestion, Suggestion, SuggestionData, SuggestionDelete } from '../model/suggestion.model';

@Injectable({
  providedIn: 'root'
})
export class SuggestedMovieService {

  constructor(private http: HttpClient) { }


  createSuggestion(suggestion:NewSuggestion){
    return this.http.post<SuggestionData>('http://localhost:8081/sugg',suggestion);
  }

  deleteSuggestion(id:number){
    return this.http.delete<SuggestionDelete>(`http://localhost:8081/sugg/${id}`);
  }

  getSuggestionByUserId(userId:number){
    return this.http.get<Suggestion[]>(`http://localhost:8081/sugg/${userId}`);
  }
}
 