import { Component, Input, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { StoreFriend } from 'src/app/model/friends.model';
import { SuggestedMovieService } from 'src/app/services/suggested-movie.service';

@Component({
  selector: 'app-suggestion-form',
  templateUrl: './suggestion-form.component.html',
  styleUrls: ['./suggestion-form.component.scss']
})
export class SuggestionFormComponent implements OnInit {
  @Input(('friends'))friends!:StoreFriend[];
  @Input(('movieId'))movieId!:number;

  constructor(private suggestionService:SuggestedMovieService) { }

  ngOnInit(): void {
  }

  suggest(suggestionForm:NgForm){
    console.log(suggestionForm.value);
    this.suggestionService.createSuggestion({userId: suggestionForm.value.suggestion, movieId:this.movieId}).subscribe({
      next:(res)=> console.log(res),
      error:(res)=>console.log(res)
    })
  }
}
