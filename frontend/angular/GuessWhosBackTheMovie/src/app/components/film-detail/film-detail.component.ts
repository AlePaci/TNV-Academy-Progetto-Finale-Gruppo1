import { CommentsService } from './../../services/comments.service';
import { TMDBApiService } from './../../services/tmdb-api.service';
import { Component, OnInit } from '@angular/core';
import { MovieDetails, Genre } from '../../model/movieDetails.model';
import { ActivatedRoute, Router } from '@angular/router';
import { Cast, Crew, MovieCredits } from '../../model/movieCredits.model';
import { SessionStorageService } from 'src/app/services/session-storage.service';
import { faStar,faTrashCan } from '@fortawesome/free-regular-svg-icons';
import { Comment } from 'src/app/model/comment.model';
import { RatingData, Ratings } from 'src/app/model/ratings.model';
import { RatingsService } from '../../services/ratings.service';
import { PreferredMovieService } from 'src/app/services/preferred-movie.service';




@Component({
  selector: 'app-film-detail',
  templateUrl: './film-detail.component.html',
  styleUrls: ['./film-detail.component.scss']
})

export class FilmDetailComponent implements OnInit {

// info film
  detail: MovieDetails |null = null
  credits: MovieCredits |null = null
  director: Crew[] | null = null
  genres: Genre[] | undefined = [];
  comment: Comment | null= null;
  commentId:number = 0;
  ratingId:number = 0;
  movieid:number = 0;
  preffId:number = 0;
  star = faStar
  trash = faTrashCan
  starArray: number[] = []
  ratingValue:number |null = null;



  constructor(
    private activatedRoute: ActivatedRoute,
    public movieService:TMDBApiService,
    private commentService:CommentsService,
    private ratingService: RatingsService,
    private sessionServise:SessionStorageService,
    private preffService:PreferredMovieService,
    private router: Router
    ) {

   }
   private getData() {}
// metodo che recupera tutte le informazioni utili dall Api esterna
  ngOnInit(): void {
      this.activatedRoute.params.subscribe((val) => this.movieid = +val['movieId'])

      this.preffService.findPreffUserMovie(this.sessionServise.getUserId(),this.movieid).subscribe({
        next: (res)=> this.preffId = res.id,

      });


      this.movieService.getMovieCredits( this.movieid).subscribe({
        next: (res) =>{
          this.credits = res;
          this.director = this.credits.crew?.filter(crew => crew.job ==="Director");
        },
        error:(res) => console.log(res)
      });
      this.movieService.getMovieDetails(this.movieid).subscribe({
        next: (res) =>{
           this.detail = res;
           this.genres = res?.genres;
              },
        error: (res) => console.log(res)    
      });
      this.commentService.getComment(this.sessionServise.getUserId(),this.movieid).subscribe({
        next: (res)=>{
          this.comment = res.data;
          this.commentId = res.data.id;
          console.log(this.comment);
        },
        error: (res)=>console.log(res) 
      });
      this.ratingService.getRating(this.sessionServise.getUserId(),this.movieid).subscribe({
        next: (res)=>{
          console.log(res)
          this.ratingValue = res.Ratings.data[0].movie_rating;
          this.ratingId = res.Ratings.data[0].id;
          
          for(let i=0;i<this.ratingValue;i++){
            this.starArray.push(0);
          }
          
          console.log(this.starArray);
        },
        error: (res)=> console.log(res)
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
    console.log(this.preffId)
    this.preffService.deletePreferredMovie(this.preffId).subscribe({
      next: (res)=> console.log(res),
      error: (res)=> console.log(res)
    });
    this.router.routeReuseStrategy.shouldReuseRoute = () => false;
    this.router.onSameUrlNavigation = 'reload';
    this.router.navigate(['/film'])
    

   
  }



  }











