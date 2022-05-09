import { Component, Input, OnInit } from '@angular/core';
import { faCoins } from '@fortawesome/free-solid-svg-icons';
import { Movie } from 'src/app/model/movie.model';

@Component({
  selector: 'app-movie-score',
  templateUrl: './movie-score.component.html',
  styleUrls: ['./movie-score.component.scss']
})
export class MovieScoreComponent implements OnInit {
  
  @Input(('movie'))movie!:Movie;

  coins = faCoins;

  constructor() { }

  ngOnInit(): void {
  }

}
