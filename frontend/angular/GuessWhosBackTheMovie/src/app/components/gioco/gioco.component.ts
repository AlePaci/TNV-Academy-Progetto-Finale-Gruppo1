import {Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
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
  // booleani usati per mostrare o meno contenuto
  start: boolean = false;
  finish:boolean = false;
  win: boolean | null = null;

  // booleani usati per mostrare o meno info film
  showActors: boolean[] = [false,false,false];
  showGenres: boolean[] = [false,false]
  showDate: boolean = false;
  showDirector: boolean = false

  // id film e massimo range del random
  movieId: number | null  = null;
  maxRandom: number = 5000;

  // info film
  movieDetails: MovieDetails| null = null;
  movieCredits: MovieCredits| null = null;
  genres: Genre[] = [];
  cast: Cast[]= [];
  director : Crew[] = [];

  // valori per calcolo conutdown e minuti mostrati
  timeLeft: number = 90;
  subscribeTimer: number |null = null;
  seconds : string |null = null;
  minutes : string |null = null;
  
  




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
        if(val === 10) this.showDate = true;
        if(val === 20) this.showActors[2] = true;
        if(val === 30) this.showGenres[0] = true;
        if(val === 40) this.showDirector = true;
        if(val === 50) this.showActors[1] = true;
        if(val === 60) this.showGenres[1] = true;
        if(val === 70) this.showActors[0] = true;
        if(this.subscribeTimer === 0) {
          this.finish = true;
          this.win = false;
          return }
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
    });
  }
  

  guess(guessForm: NgForm){
    if(this.movieDetails?.title.toLowerCase()===guessForm.value.guessTitle){
      this.finish = true;
      this.win = true;
      console.log("indovinato");
    }
    else{
      console.log("Sbagliato");
    }

  }
}
