import { Genre } from './../../model/movieDetails.model';



import { TMDBApiService } from './../../services/tmdb-api.service';
import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { MovieDetails } from '../../model/movieDetails.model';
import { ActivatedRoute, Router } from '@angular/router';
import { MovieCredits } from '../../model/movieCredits.model';
import { NgIfContext } from '@angular/common';



@Component({
  selector: 'app-film-detail',
  templateUrl: './film-detail.component.html',
  styleUrls: ['./film-detail.component.scss']
})
export class FilmDetailComponent implements OnInit {


  detail: MovieDetails |null = null
  credits: MovieCredits |null = null
  poster: string = ''
  genre: Genre[] = [];
  movie1:number = 343611;



  constructor(activatedRoute: ActivatedRoute,
    private router : Router,
    public TMDBApiService:TMDBApiService) {
    activatedRoute.params.subscribe(val => this.credits)
    activatedRoute.params.subscribe(val => this.detail)
   }
   private getData() {}

  ngOnInit(): void {

    this.getData(); {
      this.TMDBApiService.getMovieCredits( this.movie1).subscribe({
        next: (res) => this.credits = res
      }),
      this.TMDBApiService.getMovieDetails(this.movie1).subscribe({
        next: (res) => this.detail = res
      })
     this.TMDBApiService.getMoviePoster(`https://image.tmdb.org/t/p/original/${this.movie1}`)






  }


  /*private getData() {
    this.TMDBApiService.getMovieCredits( this.movie1).subscribe({
      next: (res) => this.credits = res
    }),
    this.TMDBApiService.getMovieDetails(this.movie1).subscribe({
      next: (res) => this.detail = res
    })
   this.TMDBApiService.getMoviePoster(`https://image.tmdb.org/t/p/original/${this.movie1}`)
     return this.poster*/







  }





}


