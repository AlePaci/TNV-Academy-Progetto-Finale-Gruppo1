import { Component, Input, OnInit } from '@angular/core';
import { Movie } from 'src/app/model/movie.model';

@Component({
  selector: 'app-movie-list-body',
  templateUrl: './movie-list-body.component.html',
  styleUrls: ['./movie-list-body.component.scss']
})
export class MovieListBodyComponent implements OnInit {
  @Input(('movie'))movie!:Movie;

  constructor() { }

  ngOnInit(): void {
  }

}
