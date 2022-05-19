import { CommentsService } from './../../services/comments.service';
import { TMDBApiService } from './../../services/tmdb-api.service';
import { RatingsService } from '../../services/ratings.service';
import { PreferredMovieService } from 'src/app/services/preferred-movie.service';
import { SessionStorageService } from 'src/app/services/session-storage.service';
import { AccessApiService } from 'src/app/services/access-api.service';
import { Component, OnInit} from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { MovieDetails, Genre } from '../../model/movieDetails.model';
import { Crew, MovieCredits } from '../../model/movieCredits.model';
import { Prefferd } from 'src/app/model/prefferd.model';
import { UserScore } from 'src/app/model/user.model';
import { Comment } from 'src/app/model/comment.model';
import { faTrashCan } from '@fortawesome/free-regular-svg-icons';







@Component({
  selector: 'app-film-detail',
  templateUrl: './film-detail.component.html',
  styleUrls: ['./film-detail.component.scss']
})

export class FilmDetailComponent implements OnInit{
 
 //Proprità per la visulaizzazione dei contenuti della pagina
  isModificaRating: boolean = false;
  isModificaComment:boolean = false;

  //Proprietà info film
  movieId:number = 0;
  detail: MovieDetails |null = null
  credits: MovieCredits |null = null
  director: Crew[] | null = null
  genres: Genre[] | undefined = [];

  //Proprietà per il commento del film
  comment: Comment | null = null;
  commentId:number =0;

  //Proprietà per il rating del film
  ratingId:number = 0;
  starArray: number[] = []
  ratingValue:number |null = null;

  //proprietà per il film preferito
  preffId:number = 0;

  //proprietà per la top3
  topPosition:UserScore[] = [];
  podium:Prefferd[] = [];

  //proprietà per le icone
  trash = faTrashCan;

  
  constructor(
    private activatedRoute: ActivatedRoute,
    public movieService:TMDBApiService,
    private commentService:CommentsService,
    private ratingService: RatingsService,
    private sessionService:SessionStorageService,
    private preffService:PreferredMovieService,
    private router: Router,
    private accessService: AccessApiService
    ) {}
   
// Metodo che recupera tutte le informazioni utili dall Api esterna
  ngOnInit(): void {
      this.activatedRoute.params.subscribe((val) => this.movieId = +val['movieId'])
      this.preffService.findPreffUserMovie(this.sessionService.getUserId(),this.movieId).subscribe({
        next:(res)=>this.preffId=res.id,
        error:(res)=>console.log(res)
      });
      this.getPodium();
      this.getRating();
      this.getComment();
      this.getCredits();
      this.getDetails(); 
  }

  /**
   * Metodo per recuperare tutti gli utenti che han giocato con il film e creare la top tre
   */
  getPodium(){
    this.preffService.findAllMoviesByMovieID(this.movieId).subscribe({
      next: (res)=>{ 
        res.sort((a,b)=>b.gameScore - a.gameScore);
        this.podium = res.slice(0,3)
        this.podium.forEach(element => { 
          this.accessService.getUserById(element.userId).subscribe({
            next:(res)=> this.topPosition.push({user:res ,score:element.gameScore}),
            error:(res)=>console.log(res)
          });
        });       
      },
      error: (res)=> console.log(res)
    });
  }

/**
 * Metodo per cancellare un determinato film preferito
 * fa la chiamata del delete ad ogni api del backend
 */
  cancella(){
    this.commentService.deleteComment(this.commentId).subscribe({
      next: (res)=> console.log(res),
      error: (res)=> console.log(res)
    })
  
    this.ratingService.deleteRating(this.ratingId).subscribe({
      next: (res)=>console.log(res),
      error: (res) => console.log(res)
    });

    this.preffService.deletePreferredMovie(this.preffId).subscribe({
      next: (res)=> console.log(res),
      error: (res)=> console.log(res)
    });
    this.router.routeReuseStrategy.shouldReuseRoute = () => false;
    this.router.onSameUrlNavigation = 'reload';
    this.router.navigate(['/film'])
    
  }
/**
 * Metodo che permette di cambiare la visuale tra commento e modifica commento.
 */
  modificaRating(){
    this.isModificaRating = !this.isModificaRating;
    this.getRating();
  }

  /**
   * Metodo che permette di cambiare la visuale tra commento e modifica commento.
   */
  modificaComment(){
    this.isModificaComment =!this.isModificaComment;
    this.getComment();
  }

/**
 * Metodo per recuperare il rating del film utilizzando chiamata api del backend di Laravel.
 */
  getRating(){
    this.ratingService.getRating(this.sessionService.getUserId(),this.movieId).subscribe({
      next: (res)=>{
        this.ratingValue = res.Ratings.data[0].movie_rating;
        this.ratingId = res.Ratings.data[0].id;
        this.starArray.length = 0;
        for(let i=0;i<this.ratingValue;i++){
          this.starArray.push(0);
        }
      },
      error: (res)=> console.log(res)
    });
  }

  /**
   * Metodo per recuperare il commento di un film utilizzando chiamata api del backend di .NET
   */
  getComment(){
    this.commentService.getComment(this.sessionService.getUserId(),this.movieId).subscribe({
      next: (res)=>{
        this.comment = res.data;
        this.commentId = res.data.id;
      },
      error: (res)=>console.log(res) 
    });
  }

/**
 * Metodo per recuperare tutto il cast e la crew di un film attraverso chiamata ad api esterna di TMBD
 */
  getCredits(){
    this.movieService.getMovieCredits( this.movieId).subscribe({
      next: (res) =>{
        this.credits = res;
        this.director = this.credits.crew?.filter(crew => crew.job ==="Director");
      },
      error:(res) => console.log(res)
    });
  }

  /**
   * Metodo per recuperare tutti i dettagli di un film attraverso chiamata ad Api esterna di TMBD
   */
  getDetails(){
    this.movieService.getMovieDetails(this.movieId).subscribe({
      next: (res) =>{
         this.detail = res;
         this.genres = res?.genres;
            },
      error: (res) => console.log(res)    
    });  
  }


  }











