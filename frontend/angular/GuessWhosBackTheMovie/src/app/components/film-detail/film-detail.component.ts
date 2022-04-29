import { CommentsService } from './../../services/comments.service';
import { TMDBApiService } from './../../services/tmdb-api.service';
import { Component, OnInit } from '@angular/core';
import { MovieDetails, Genre } from '../../model/movieDetails.model';
import { ActivatedRoute, Router } from '@angular/router';
import { MovieCredits, Crew, Cast } from '../../model/movieCredits.model';
import { RatingsService } from '../../services/ratings.service';
import { Comment } from '../../model/comment.model';



@Component({
  selector: 'app-film-detail',
  templateUrl: './film-detail.component.html',
  styleUrls: ['./film-detail.component.scss']
})

export class FilmDetailComponent implements OnInit {

// info film
  detail: MovieDetails |null = null
  credits: MovieCredits |null = null
  poster: string = ''
  genres: Genre[] | undefined = [];
  comment: Comment |null = null;
  rating: RatingsService| null = null;
  director : Crew  [] = [];
  actors : Cast [] = [];
  crew : MovieCredits | null=null;
  cast : MovieCredits | null=null;

  movie1 : number = 343611;
  user : number = 1;



  constructor(private activatedRoute: ActivatedRoute,
              private commenService: CommentsService,
              private ratingService: RatingsService,

    public TMDBApiService:TMDBApiService) {

   }
   private getData() {}
// metodo che recupera tutte le informazioni utili dall Api esterna
  ngOnInit(): void {

      this.commenService.getComment(this.user, this.movie1).subscribe({
      next: (res)=>
       this.comment = res
    }),
      this.activatedRoute.params.subscribe((val) => this.movie1 = +val['movieId'])
      this.TMDBApiService.getMovieCredits( this.movie1).subscribe({
        next: (res: MovieCredits | null) =>
        this.credits = res

       }),
      this.TMDBApiService.getMovieDetails(this.movie1).subscribe({
        next: (res: MovieDetails | null) =>{
           this.detail = res;
           this.genres = res?.genres;
              }
           })

           this.TMDBApiService.getMovieCredits(this.movie1).subscribe({
      next:(res)=> {
        this.crew = res;
      this.director = this.crew.crew.filter(crew => crew.job ==="Director")}
       });
       this.TMDBApiService.getMovieCredits(this.movie1).subscribe({
        next:(res)=> {
          this.cast = res;
        this.actors = this.cast.cast.filter(cast => cast.name )}
         });


  }
}






















//function cc(cc: any) {
//  throw new Error('Function not implemented.');
//}

