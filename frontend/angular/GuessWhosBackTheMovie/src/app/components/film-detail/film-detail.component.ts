import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { MovieDetails } from '../../model/movieDetails.model';
import { ActivatedRoute, Router } from '@angular/router';
import { TMDBApiService } from '../../services/tmdb-api.service';

@Component({
  selector: 'app-film-detail',
  templateUrl: './film-detail.component.html',
  styleUrls: ['./film-detail.component.scss']
})
export class FilmDetailComponent implements OnInit {

  movieId: number;
  movieDetail: MovieDetails | null = null

  constructor(activatedRoute: ActivatedRoute,
    private router : Router,
    private httpClient: HttpClient) {
    this.movieId = +activatedRoute.snapshot.params['movieId']
   }

  ngOnInit(): void {
  this.httpClient.get<MovieDetails>(`https://api.themoviedb.org/3/movie/${this.movieId}`).subscribe({
    next: (res) => this.movieDetail = res
  })
  }

  navigate(amount:number) {
    const movieId = this.movieId + amount
    this.movieId = movieId;
    this.router.navigateByUrl(`${movieId}`)
    this.getData();

  }
  private getData() {

  }
}


