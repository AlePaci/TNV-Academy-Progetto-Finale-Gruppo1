import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/model/user.model';
import { AccessApiService } from 'src/app/services/access-api.service';
import { SessionStorageService } from 'src/app/services/session-storage.service';
import { Router } from '@angular/router';
import { PreferredMovieService } from 'src/app/services/preferred-movie.service';
import { CommentsService } from 'src/app/services/comments.service';
import { RatingsService } from 'src/app/services/ratings.service';



@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {

  //Proprietà per il salvataggio dati 
  user: User |null= null;
  username: string = "";
  
  constructor(
    private sessionService: SessionStorageService,
    private accessService: AccessApiService,
    private preferredService: PreferredMovieService,
    private commentService: CommentsService,
    private ratingService: RatingsService,
    private router: Router,
  ) { }

  ngOnInit(): void {
   this.getUser();
  }

  /**
   * Metodo per recuperare le info sull utente conesso
   */
  getUser(){
    this.accessService.getUserById(this.sessionService.getUserId()).subscribe({
      next:(res)=>{
         this.user = res;
         this.username = this.user.username;
      },
      error:(res)=>console.log(res)
    })
  }
  
 

/**
 * Metodo per cancellare un utente e tutti i suoi film preferiti, commenti e ratings
 */
 cancella(){
  this.preferredService.findAllMoviesbyUserId(this.sessionService.getUserId()).subscribe({
    next: (res) =>  {
        res.forEach(movie => {
          this.deleteComment(movie.movieId);
          this.deleteRating(movie.movieId);
          this.preferredService.deletePreferredMovie(movie.id).subscribe({
            next:(res) => console.log(res),
            error:(res)=> console.log(res)
         }); 
       });
       setTimeout(() => {
       this.accessService.deleteUser(this.sessionService.getUserId()).subscribe({
        next:(res)=> {
          console.log(res);   
        },
        error:(res)=> console.log(res)
      });
      this.sessionService.deleteUser();
          this.sessionService.setLogged(false);
          this.router.navigate([""]);
      }, 2000);
    },
    error:(res)=> console.log(res)
  });
}

/**
 * Metodo per cancellare tutti ci commenti di un film 
 * @param movieId da cancellare 
 */
 deleteComment(movieId:number){
  this.commentService.getComment(this.sessionService.getUserId(),movieId).subscribe({
    next:(res) => this.commentService.deleteComment(res.data.id).subscribe({
      next:(res)=> console.log(res),
      error:(res)=> console.log(res)
    }),
    error:(res)=> console.log(res)
  });
}

/**
 * Metodo per cancellare tutti ci ratings di un film 
 * @param movieId da cancellare 
 */
deleteRating(movieId:number){
  this.ratingService.getRating(this.sessionService.getUserId(),movieId).subscribe({
    next:(res)=> this.ratingService.deleteRating(res.Ratings.data[0].id).subscribe({
      next:(res)=>console.log(res),
      error:(res)=>console.log(res)
    }),
    error:(res)=>console.log(res)
  });
}

/**
 * Metodo per ricaricare i contenuti 
 */
reloadCurrentRoute() {
    let currentUrl = this.router.url;
    this.router.navigateByUrl('/', {skipLocationChange: true}).then(() => {
        this.router.navigate([currentUrl]);
    });
}

}



