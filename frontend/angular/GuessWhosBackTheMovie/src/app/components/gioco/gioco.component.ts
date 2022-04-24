import {Component, OnInit } from '@angular/core';
import { timer } from 'rxjs';

import { MovieCredits,Cast, Crew} from 'src/app/model/movieCredits.model';
import { MovieDetails,Genre } from 'src/app/model/movieDetails.model';

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
  genres: Genre[] = [];
  cast: Cast[]= [];
  timeLeft: number = 60;
  subscribeTimer: number |null = null;
  seconds : string |null = null;
  minutes : string |null = null;
  director : Crew[] = [];
  




  constructor(public newMovieService: TMDBApiService)
     { }

  ngOnInit(): void {
  }

   getRandomInt(max:number) {
    return Math.floor(Math.random() * max);
  }
  
 
 
  onStart(){
    this.start = true;
    this.retirveMovie();
    this.countDownTimer();
    
     
    }
    
  
    countDownTimer() {
      const source = timer(1000, 1000);
      const abc = source.subscribe(val => {
        if(this.subscribeTimer === 0) return 
        this.subscribeTimer = this.timeLeft - val,
        this.minutes = Math.floor(this.subscribeTimer % 3600 / 60).toString().padStart(2,'0'),
        this.seconds = Math.floor(this.subscribeTimer % 60).toString().padStart(2,'0')
      });
    }

    
     retirveMovie(){

    this.movieId = this.getRandomInt(this.maxRandom);

    this.newMovieService.getMovieDetails(this.movieId).subscribe({
      next: (res)=> {
        this.movieDetails = res;
        this.genres = res.genres;
        if(this.movieDetails === null || this.movieDetails.poster_path === null) this.retirveMovie();},  
      error: (res)=> {
          console.log(res);
          this.retirveMovie(); },
        });

    this.newMovieService.getMovieCredits(this.movieId).subscribe({
      next:(res)=>{
        this.movieCredits = res;
        this.director = this.movieCredits.crew?.filter(crew => crew.job ==="Director");
        this.cast = this.movieCredits.cast;
      }
    })
    
  }
  
}
