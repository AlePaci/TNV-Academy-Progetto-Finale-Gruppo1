import { Component, Input, OnInit } from '@angular/core';
import { faCircleQuestion } from '@fortawesome/free-regular-svg-icons';
import { Cast, Crew, MovieCredits } from 'src/app/model/movieCredits.model';
import { MovieDetails } from 'src/app/model/movieDetails.model';

@Component({
  selector: 'app-guess-data',
  templateUrl: './guess-data.component.html',
  styleUrls: ['./guess-data.component.scss']
})
export class GuessDataComponent implements OnInit {

  guessIcon = faCircleQuestion;

  @Input(('showGenres'))showGenres!:boolean[];
  @Input(('showDirector'))showDirector!:boolean;
  @Input(('showActors'))showActors!:boolean[];
  @Input(('showDate'))showDate!:boolean;
  @Input(('movieDetails'))movieDetails!:MovieDetails;
  @Input(('director'))director!:Crew[];
  @Input(('cast'))cast!:Cast[];
  
  constructor() { }

  ngOnInit(): void {
  }

}
