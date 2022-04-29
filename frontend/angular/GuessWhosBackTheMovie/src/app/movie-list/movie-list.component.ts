import { Component, OnInit } from '@angular/core';
import { PreferredMovieService } from 'src/app/services/preferred-movie.service';
import { MovieDetails } from '../model/movieDetails.model';
import { Prefferd } from '../model/prefferd.model';
import { SessionStorageService } from '../services/session-storage.service';
import { TMDBApiService } from '../services/tmdb-api.service';

@Component({
  selector: 'app-movie-list',
  templateUrl: './movie-list.component.html',
  styleUrls: ['./movie-list.component.scss']
})
export class MovieListComponent implements OnInit {
  prefferedMovies:Prefferd[] = [];
  movieList:MovieDetails[]= [];
  numbers:number[]= [1,2,3,4,5,6,7]

  constructor(private prefferedService: PreferredMovieService,
    private sessionService: SessionStorageService,
    public movieService:TMDBApiService) { }

  ngOnInit(): void {
    this.prefferedService.findAllMoviesbyUserId(this.sessionService.getUserId()).subscribe({
      next: (res) =>{
        this.prefferedMovies=res;
        console.log(this.prefferedMovies);
        this.prefferedMovies.forEach(element => {
          this.movieService.getMovieDetails(element.movieId).subscribe({
          next: (res)=> {
            this.movieList.push(res);
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
