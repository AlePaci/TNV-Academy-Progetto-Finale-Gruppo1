import { Component, OnInit } from '@angular/core';
import { Movie } from '../../model/movie.model';
import { PreferredMovieService } from '../../services/preferred-movie.service';
import { MovieDetails } from '../../model/movieDetails.model';
import { Prefferd } from '../../model/prefferd.model';
import { SessionStorageService } from '../../services/session-storage.service';
import { TMDBApiService } from '../../services/tmdb-api.service';

@Component({
  selector: 'app-movie-list',
  templateUrl: './movie-list.component.html',
  styleUrls: ['./movie-list.component.scss']
})
export class MovieListComponent implements OnInit {
  prefferedMovies:Prefferd[] = [];
  movieList:Movie[]= [];
  

  constructor(private prefferedService: PreferredMovieService,
    private sessionService: SessionStorageService,
    public movieService:TMDBApiService) { }

  ngOnInit(): void {
    this.prefferedService.findAllMoviesbyUserId(this.sessionService.getUserId()).subscribe({
      next: (res) =>{
        this.prefferedMovies=res;
        this.prefferedMovies.forEach(element => {
          this.movieService.getMovieDetails(element.movieId).subscribe({
          next: (res)=> {
            this.movieList.push({movieDetail:res,movieScore:element.gameScore});
            console.log(this.movieList)
        }, 
        error: (res) => console.log(res)
      });
       });
      
       
      },
    error:(res) => console.log(res)
    });

     
      
   
    

    console.log("this.movieList");
    
  }

}
