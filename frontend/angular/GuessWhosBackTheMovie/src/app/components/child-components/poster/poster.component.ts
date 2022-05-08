import { Component, Input, OnInit } from '@angular/core';
import { TMDBApiService } from 'src/app/services/tmdb-api.service';
import { MovieDetails } from 'src/app/model/movieDetails.model';

@Component({
  selector: 'app-poster',
  templateUrl: './poster.component.html',
  styleUrls: ['./poster.component.scss']
})
export class PosterComponent implements OnInit {
@Input (('detail'))   detail!: MovieDetails;

  constructor(
    public movieService:TMDBApiService
  ) { }

  ngOnInit(): void {
  }

}
