import { Component, Input, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { PartComment } from 'src/app/model/comment.model';
import { SavePrefferd } from 'src/app/model/prefferd.model';
import { NewRating } from 'src/app/model/ratings.model';
import { CommentsService } from 'src/app/services/comments.service';
import { PreferredMovieService } from 'src/app/services/preferred-movie.service';
import { RatingsService } from 'src/app/services/ratings.service';
import { SessionStorageService } from 'src/app/services/session-storage.service';
import { faFloppyDisk } from '@fortawesome/free-regular-svg-icons';

@Component({
  selector: 'app-saving-form',
  templateUrl: './saving-form.component.html',
  styleUrls: ['./saving-form.component.scss']
})
export class SavingFormComponent implements OnInit {

  saveIcon = faFloppyDisk;
  
  @Input(('movieId'))movieId!: number ;
  @Input(('points'))points!: number;


  constructor(
    private sessionService: SessionStorageService,
    private preffService: PreferredMovieService,
    private reviewService: CommentsService,
    private ratingService: RatingsService,
    private router: Router
  ) { }

  ngOnInit(): void {
  }

  save(savingForm: NgForm){

    let userId: number  = this.sessionService.getUserId();
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
      }, 1000); 
    


  }
}
