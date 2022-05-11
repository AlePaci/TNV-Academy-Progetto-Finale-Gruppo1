import { CommentsService } from './../../services/comments.service';
import { TMDBApiService } from './../../services/tmdb-api.service';
import { Component, OnInit} from '@angular/core';
import { MovieDetails, Genre } from '../../model/movieDetails.model';
import { ActivatedRoute, Router } from '@angular/router';
import {  Crew, MovieCredits } from '../../model/movieCredits.model';
import { SessionStorageService } from 'src/app/services/session-storage.service';
import {faTrashCan } from '@fortawesome/free-regular-svg-icons';
import { RatingsService } from '../../services/ratings.service';
import { PreferredMovieService } from 'src/app/services/preferred-movie.service';
import { Comment } from 'src/app/model/comment.model';





@Component({
  selector: 'app-film-detail',
  templateUrl: './film-detail.component.html',
  styleUrls: ['./film-detail.component.scss']
})

export class FilmDetailComponent implements OnInit{
  starArray: number[] = []
  ratingValue:number |null = null;

  movieId:number = 0;
  isModificaRating: boolean = false;
  isModificaComment:boolean = false;

// info film
  detail: MovieDetails |null = null
  credits: MovieCredits |null = null
  director: Crew[] | null = null
  genres: Genre[] | undefined = [];
  comment: Comment | null = null;
  commentId:number =0;
  ratingId:number = 0;
  preffId:number = 0;

  trash = faTrashCan;
  
 


  constructor(
    private activatedRoute: ActivatedRoute,
    public movieService:TMDBApiService,
    private commentService:CommentsService,
    private ratingService: RatingsService,
    private sessionService:SessionStorageService,
    private preffService:PreferredMovieService,
    private router: Router
    ) {

   }
// metodo che recupera tutte le informazioni utili dall Api esterna
  ngOnInit(): void {
      this.activatedRoute.params.subscribe((val) => this.movieId = +val['movieId'])

      this.preffService.findPreffUserMovie(this.sessionService.getUserId(),this.movieId).subscribe({
        next: (res)=> this.preffId = res.id,
        error:(res)=> console.log(res)
      });

      this.getRating();

      this.getComment();

      this.movieService.getMovieCredits( this.movieId).subscribe({
        next: (res) =>{
          this.credits = res;
          this.director = this.credits.crew?.filter(crew => crew.job ==="Director");
        },
        error:(res) => console.log(res)
      });
      
      this.movieService.getMovieDetails(this.movieId).subscribe({
        next: (res) =>{
           this.detail = res;
           this.genres = res?.genres;
              },
        error: (res) => console.log(res)    
      });  
  }


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

  modificaRating(){
    this.isModificaRating = !this.isModificaRating;
    this.getRating();
  }
  modificaComment(){
    this.isModificaComment =!this.isModificaComment;
    this.getComment();
  }

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

  getComment(){
    this.commentService.getComment(this.sessionService.getUserId(),this.movieId).subscribe({
      next: (res)=>{
        this.comment = res.data;
        this.commentId = res.data.id;
      },
      error: (res)=>console.log(res) 
    });
  }


  }











