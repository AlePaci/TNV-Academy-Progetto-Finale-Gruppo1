import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { PartComment } from 'src/app/model/comment.model';
import { NewRating } from 'src/app/model/ratings.model';
import { CommentsService } from 'src/app/services/comments.service';
import { PreferredMovieService } from 'src/app/services/preferred-movie.service';
import { RatingsService } from 'src/app/services/ratings.service';
import { SessionStorageService } from 'src/app/services/session-storage.service';
import { TMDBApiService } from 'src/app/services/tmdb-api.service';
import { Prefferd, SavePrefferd } from '../../model/prefferd.model';
import { faFloppyDisk } from '@fortawesome/free-regular-svg-icons';

@Component({
  selector: 'app-save',
  templateUrl: './save.component.html',
  styleUrls: ['./save.component.scss']
})
export class SaveComponent implements OnInit {
  saveIcon = faFloppyDisk;

  isSaved:boolean = false;

  points: number | null = null;
  movieId: number  = 0;
  posterPath: string | null = null;
  movieTitle: string | null = null;

  range: number = 0;
  userId: number = 1;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    public movieService: TMDBApiService,
    private preffService: PreferredMovieService,
    private reviewService: CommentsService,
    private sessionService: SessionStorageService,
    private ratingService:RatingsService
    ) { }

  ngOnInit(): void {
    this.route.params.subscribe(param =>{
      this.points = +param['points'];
      this.movieId = +param['movieId'];
      this.movieService.getMovieDetails(this.movieId).subscribe(res =>{
        this.movieTitle = res.title;
        this.posterPath = res.poster_path;
      })
    })
  }



  save(savingForm: NgForm){

    let userId: number  = this.userId;
    console.log(userId);
    console.log(savingForm.value)
    let newMovie: SavePrefferd ={movieId: this.movieId, userId: userId, gameScore:this.points};
    let newComment: PartComment ={userId: userId, movieId: this.movieId, commentText:savingForm.value.review};
    let newRating: NewRating ={ movie_rating:savingForm.value.rating, movie_id:this.movieId, user_id: userId};

    this.preffService.savePrefferredMovie(newMovie).subscribe({
      next: (res)=> console.log(res),
      error: (res)=> console.log(res)
    });

    this.reviewService.createComment(newComment).subscribe({
      next:(res)=> console.log(res),
      error: (res)=> console.log(res)

    });

    this.ratingService.saveRating(newRating).subscribe({
      next:(res)=>console.log(res),
      error:(res)=>console.log(res)
    })

    setTimeout(() => {
      console.log('sleep');
      this.router.navigate(["/film"]);
      }, 2000); 
    


  }

}
