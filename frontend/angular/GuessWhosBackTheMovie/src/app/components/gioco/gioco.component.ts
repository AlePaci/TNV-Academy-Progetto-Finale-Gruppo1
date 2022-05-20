import {Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { timer } from 'rxjs';
import { MovieCredits,Cast, Crew} from 'src/app/model/movieCredits.model';
import { MovieDetails,Genre } from 'src/app/model/movieDetails.model';
import { TMDBApiService } from 'src/app/services/tmdb-api.service';

import { faFloppyDisk, faPlayCircle} from '@fortawesome/free-regular-svg-icons';
import { faHourglassStart, faHourglassEnd, faHourglassHalf } from '@fortawesome/free-solid-svg-icons';
import { PreferredMovieService } from 'src/app/services/preferred-movie.service';
import { SessionStorageService } from 'src/app/services/session-storage.service';
import { Prefferd } from 'src/app/model/prefferd.model';
import { Suggestion } from 'src/app/model/suggestion.model';
import { SuggestedMovieService } from 'src/app/services/suggested-movie.service';


@Component({
  selector: 'app-gioco',
  templateUrl: './gioco.component.html',
  styleUrls: ['./gioco.component.scss']
})
export class GiocoComponent implements OnInit {
  // booleani usati per mostrare o meno contenuto
  start: boolean = false;
  finish:boolean = false;
  win: boolean = false;
  

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
  director : Crew| null=null;

  // valori per calcolo conutdown e minuti mostrati
  timeLeft: number = 90;
  subscribeTimer: number |null = null;
  seconds : string |null = null;
  minutes : string |null = null;
  

  // valori utilizzati per il blur dell immagine
  blur: number =3;
  blurString: string = "string";

  points: number | null = 0;
  

  giaGiocati: number[]=[];
  filmSuggeriti: number[]=[];
  myMovies: Prefferd[]=[];
  sfida:boolean = false;


  
 //Icone 
  saveIcon = faFloppyDisk;
  time = faHourglassStart;
  half = faHourglassHalf;
  end = faHourglassEnd;
  playIcon = faPlayCircle;

  




  constructor(
    public newMovieService: TMDBApiService,
    private router:Router,
    private prefferredService:PreferredMovieService,
    private sessionService: SessionStorageService,
    private suggestionService:SuggestedMovieService
    ){ }

  ngOnInit(): void {
    this.prefferredService.findAllMoviesbyUserId(this.sessionService.getUserId()).subscribe({
      next: (res)=>{
        res.forEach(movie => { this.giaGiocati.push(movie.movieId)});
        this.suggestionService.getSuggestionByUserId(this.sessionService.getUserId()).subscribe({
          next: (res)=>{res.forEach(suggerito => {
            if(this.giaGiocati.includes(suggerito.movieId)){
              this.suggestionService.deleteSuggestion(suggerito.id).subscribe({
                next:(res)=>console.log(res),
                error:(res)=> console.log(res)
              });
             }
            else this.filmSuggeriti.push(suggerito.movieId)   
          }
          );console.log(this.filmSuggeriti);console.log(this.giaGiocati)},
          error:(res)=>console.log(res)
        });
      },
      error: (res) => console.log(res)
    });
  }
  
  
  /**
   * Funzione per generare un numero random
   * @param max massimo generabile
   * @returns numero generato
   */
   getRandomInt(max:number) {
    return Math.floor(Math.random() * max);
  }
  
 
 // metodo che fa partire la partita
  onStart(num:boolean){
    this.retirveMovie(num);
      setTimeout(() => {
      this.start = true;
      this.countDownTimer();
      console.log('sleep');
      }, 1000);
    }
    
  // metodo che crea il countdown e cambia valore ai cari campi per renderli visibili
    countDownTimer() {
      const source = timer(1000, 1000);
      const abc = source.subscribe(val => {
        if(val === 10) this.showDate = true;
        if(val === 20) this.showActors[2] = true;
        if(val === 30){ this.showGenres[0] = true; this.time= this.half;}
        if(val === 40) this.showDirector = true;
        if(val === 50) this.showGenres[1] = true;
        if(val === 60){ this.showActors[1] = true; this.time = this.end;}
        if(val === 70) this.showActors[0] = true;
        if(this.subscribeTimer === 0) {
          this.finish = true;
          this.win = false;
          return }
        if(this.finish && this.win) return
        this.subscribeTimer = this.timeLeft - val,
        this.minutes = Math.floor(this.subscribeTimer % 3600 / 60).toString().padStart(2,'0'),
        this.seconds = Math.floor(this.subscribeTimer % 60).toString().padStart(2,'0')
        this.blur -= 0.035;
        this.blurString = `blur(${this.blur}rem)`;
        
      });
    }
  
  
  // metodo che recupera tutte le informazioni utili dall Api esterna e fa controli su presenza poster e gia giocati  
    retirveMovie(num: boolean){
    console.log(this.giaGiocati)
    if(num)this.movieId = this.getRandomInt(this.maxRandom);
    else {
      this.movieId = this.filmSuggeriti[0];
      this.filmSuggeriti.shift();
      
    }
    
    if(!this.giaGiocati.includes(this.movieId)){
    this.newMovieService.getMovieDetails(this.movieId).subscribe({
      next: (res)=> {
        this.movieDetails = res;
        this.genres = res.genres;
        if(this.movieDetails === null || this.movieDetails.poster_path === null) this.retirveMovie(num);
        this.newMovieService.getMovieCredits(this.movieId).subscribe({
        next:(res)=>{
          this.movieCredits = res;
          let directors = this.movieCredits.crew?.filter(crew => crew.job ==="Director");
          this.director = directors[0];
          this.cast = this.movieCredits.cast;
        }
      });
      },
      error: (res)=> {
        console.log(res);
        this.retirveMovie(num); },
        });

      }else this.retirveMovie(num);
  }
  guessed(){
    this.finish = true;
    this.win = true;
    this.points = this.subscribeTimer;
    this.blurString = `blur(0)`; 
    this.showActors.forEach(element => element = true);
    this.showGenres.forEach(element=>element =true);
    this.showDirector = true;
    this.showDate = true;
  }

  // metodo per fare una nuova partita
  playAgain(){
    this.router.routeReuseStrategy.shouldReuseRoute = () => false;
    this.router.onSameUrlNavigation = 'reload';
    this.router.navigate(["gioco"])
  }

  save(){
    this.router.navigate(['/gioco', this.movieId, this.points]);
  }

}
