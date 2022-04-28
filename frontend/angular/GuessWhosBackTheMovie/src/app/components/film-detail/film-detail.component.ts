import { TMDBApiService } from './../../services/tmdb-api.service';
import { Component, OnInit } from '@angular/core';

import { MovieDetails, Genre } from '../../model/movieDetails.model';
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
  poster: string = ''
  genres: Genre[] | undefined = [];

  movie1:number = 343611;



  constructor(private activatedRoute: ActivatedRoute,

    public TMDBApiService:TMDBApiService) {

   }
   private getData() {}

  ngOnInit(): void {
      this.activatedRoute.params.subscribe((val) => this.movie1 = +val['movieId'])


      this.TMDBApiService.getMovieCredits( this.movie1).subscribe({
        next: (res: MovieCredits | null) => this.credits = res
      }),
      this.TMDBApiService.getMovieDetails(this.movie1).subscribe({
        next: (res: MovieDetails | null) =>{
           this.detail = res;
           this.genres = res?.genres;
              }
           })
     this.TMDBApiService.getMoviePoster(`https://image.tmdb.org/t/p/original/${this.movie1}`)
  }



}














