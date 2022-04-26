import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { PartComment } from 'src/app/model/comment.model';
import { CommentsService } from 'src/app/services/comments.service';
import { PreferredMovieService } from 'src/app/services/preferred-movie.service';
import { SessionStorageService } from 'src/app/services/session-storage.service';
import { TMDBApiService } from 'src/app/services/tmdb-api.service';
import { Prefferd, SavePrefferd } from '../../model/prefferd.model';

@Component({
  selector: 'app-save',
  templateUrl: './save.component.html',
  styleUrls: ['./save.component.scss']
})
export class SaveComponent implements OnInit {

  points: number | null = null;
  movieId: number  = 0;
  posterPath: string | null = null;
  movieTitle: string | null = null;
  range: number = 0;

  constructor(
    private route: ActivatedRoute,
    public movieService: TMDBApiService,
    private preffService: PreferredMovieService,
    private reviewService: CommentsService,
    private sessionService: SessionStorageService
    ) { }

  ngOnInit(): void {
    this.route.params.subscribe(param =>{
      this.points = +param['points'];
      this.movieId = +param['movieId'];
      console.log(this.movieId);
      console.log(this.points);
      this.movieService.getMovieDetails(this.movieId).subscribe(res =>{
        this.movieTitle = res.title;
        this.posterPath = res.poster_path;
      })
    })
  }



  save(savingForm: NgForm){
  
    let userId: number  = this.sessionService.getUserId();
    console.log(userId);
    let preffMovie: SavePrefferd ={movieId: this.movieId, userId: userId, gameScore:this.points};
    let partComment: PartComment ={userId: userId, movieId: this.movieId, commentText:savingForm.value.review};
    this.preffService.savePrefferredMovie(preffMovie).subscribe({
      next: (res)=> console.log(res),
      error: (res)=> console.log(res)
    });

    this.reviewService.createComment(partComment).subscribe({
      next:(res)=> console.log(res),
      error: (res)=> console.log(res)

    });

  }

}
