import { CommentsService } from './../../services/comments.service';
import { TMDBApiService } from './../../services/tmdb-api.service';
import { Component, OnInit } from '@angular/core';
import { MovieDetails, Genre } from '../../model/movieDetails.model';
import { ActivatedRoute, Router } from '@angular/router';
import { Cast, Crew, MovieCredits } from '../../model/movieCredits.model';
import { SessionStorageService } from 'src/app/services/session-storage.service';
import { faStar } from '@fortawesome/free-regular-svg-icons';
import { Comment } from 'src/app/model/comment.model';
import { RatingData, Ratings } from 'src/app/model/ratings.model';
import { RatingsService } from '../../services/ratings.service';




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
  poster: string = ''
  genres: Genre[] | undefined = [];
  comment: Comment | null= null;
  rating: Ratings[]| null = null;
  movieid:number = 0;
  star = faStar
  starArray: number[] = []



  constructor(
    private activatedRoute: ActivatedRoute,
    public movieService:TMDBApiService,
    private commentService:CommentsService,
    private ratingService: RatingsService,
    private sessionServise:SessionStorageService) {

   }
   private getData() {}
// metodo che recupera tutte le informazioni utili dall Api esterna
  ngOnInit(): void {
      this.activatedRoute.params.subscribe((val) => this.movieid = +val['movieId'])


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
          console.log(this.comment);
        },
        error: (res)=>console.log(res) 
      });
      this.ratingService.getRating(this.sessionServise.getUserId(),this.movieid).subscribe({
        next: (res)=>{
          this.rating = res.Ratings;
         
          
          console.log(this.rating);
        },
        error: (res)=> console.log(res)
      });

      
  }



  }











