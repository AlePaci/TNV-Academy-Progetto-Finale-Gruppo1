

import { TMDBApiService } from './../../services/tmdb-api.service';
import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { MovieDetails } from '../../model/movieDetails.model';
import { ActivatedRoute, Router } from '@angular/router';
import { MovieCredits } from '../../model/movieCredits.model';


@Component({
  selector: 'app-film-detail',
  templateUrl: './film-detail.component.html',
  styleUrls: ['./film-detail.component.scss']
})
export class FilmDetailComponent implements OnInit {


  detail: MovieDetails |null = null
  credits: MovieCredits |null = null


  constructor(activatedRoute: ActivatedRoute,
    private router : Router,
    private TMDBApiService:TMDBApiService) {
    activatedRoute.params.subscribe(val => this.credits)
    activatedRoute.params.subscribe(val => this.detail)
   }

  ngOnInit(): void {
    this.getData();

  }


  private getData() {
    this.TMDBApiService.getMovieCredits(343611).subscribe({
      next: (res) => this.credits = res
    }),
    this.TMDBApiService.getMovieDetails(343611).subscribe({
      next: (res) => this.detail = res
    })
  }
}


