import {Component, OnInit } from '@angular/core';

import { MovieCredits } from 'src/app/model/movieCredits.model';
import { MovieDetails } from 'src/app/model/movieDetails.model';
import { TMDBApiService } from 'src/app/services/tmdb-api.service';

@Component({
  selector: 'app-gioco',
  templateUrl: './gioco.component.html',
  styleUrls: ['./gioco.component.scss']
})
export class GiocoComponent implements OnInit {

  start: boolean = false;
  movieId: number | null  = null;
  maxRandom: number = 5000;
  movieDetails: MovieDetails| null = null;
  movieCredits: MovieCredits| null = null;
  constructor(public newMovieService: TMDBApiService) { }

  ngOnInit(): void {
  }

   getRandomInt(max:number) {
    return Math.floor(Math.random() * max);
  }

 
  onStart(){
    this.start = true;
    
    this.movieId = this.getRandomInt(this.maxRandom);
    console.log(this.movieId);
    this.newMovieService.getMovieDetails(this.movieId).subscribe({
      next: (res)=> {
        this.movieDetails = res;
    
        },  
      error: (res)=> {
          console.log(res);
          
        },
        
      })
      console.log(this.movieId)
    }
  }

    
    
  
 
