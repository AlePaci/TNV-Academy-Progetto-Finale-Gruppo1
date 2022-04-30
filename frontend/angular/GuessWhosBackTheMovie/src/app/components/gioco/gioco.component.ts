import {Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { timer } from 'rxjs';
import { MovieCredits,Cast, Crew} from 'src/app/model/movieCredits.model';
import { MovieDetails,Genre } from 'src/app/model/movieDetails.model';
import { TMDBApiService } from 'src/app/services/tmdb-api.service';
import { faFloppyDisk } from '@fortawesome/free-regular-svg-icons';

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
  director : Crew[] = [];

  // valori per calcolo conutdown e minuti mostrati
  timeLeft: number = 90;
  subscribeTimer: number |null = null;
  seconds : string |null = null;
  minutes : string |null = null;
  

  // valori utilizzati per il blur dell immagine
  blur: number =3;
  blurString: string = "string";

  points: number | null = 0;
  trys:number = 0;

  saveIcon = faFloppyDisk;
  




  constructor(
    public newMovieService: TMDBApiService,
    private router:Router
    ){ }

  ngOnInit(): void {
  }



   getRandomInt(max:number) {
    return Math.floor(Math.random() * max);
  }
  
 
 // metodo che fa partire la partita
  onStart(){
    this.retirveMovie();
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
        if(val === 30) this.showGenres[0] = true;
        if(val === 40) this.showDirector = true;
        if(val === 50) this.showActors[1] = true;
        if(val === 60) this.showGenres[1] = true;
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
    retirveMovie(){

    this.movieId = this.getRandomInt(this.maxRandom);

    this.newMovieService.getMovieDetails(this.movieId).subscribe({
      next: (res)=> {
        this.movieDetails = res;
        this.genres = res.genres;
        if(this.movieDetails === null || this.movieDetails.poster_path === null) this.retirveMovie();
        this.newMovieService.getMovieCredits(this.movieId).subscribe({
        next:(res)=>{
          this.movieCredits = res;
          this.director = this.movieCredits.crew?.filter(crew => crew.job ==="Director");
          this.cast = this.movieCredits.cast;
        }
      });
      },
      error: (res)=> {
        console.log(res);
        this.retirveMovie(); },
        });

    
  }
  
// Metodo per valutare l input sul tentativo titolo
  guess(guessForm: NgForm){
    if(this.movieDetails?.title.toLowerCase()===guessForm.value.guessTitle){
      this.finish = true;
      this.win = true;
      this.points = this.subscribeTimer;
      this.blurString = `blur(0)`;      
      console.log("indovinato");
    }
    else{
      this.trys+=1;
      console.log("Sbagliato");
    }
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
