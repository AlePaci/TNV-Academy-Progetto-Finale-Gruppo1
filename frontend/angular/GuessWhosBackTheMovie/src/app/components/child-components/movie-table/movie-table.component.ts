import { Component, Input, OnInit } from '@angular/core';
import { MovieDetails } from 'src/app/model/movieDetails.model';

@Component({
  selector: 'app-movie-table',
  templateUrl: './movie-table.component.html',
  styleUrls: ['./movie-table.component.scss']
})
export class MovieTableComponent implements OnInit {
  @Input (('detail')) detail!: MovieDetails

  constructor() { }

  ngOnInit(): void {
  }

}
