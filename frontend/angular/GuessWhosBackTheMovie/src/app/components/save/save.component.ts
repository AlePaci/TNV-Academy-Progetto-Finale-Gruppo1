import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { TMDBApiService } from 'src/app/services/tmdb-api.service';

import { MovieDetails } from 'src/app/model/movieDetails.model';

@Component({
  selector: 'app-save',
  templateUrl: './save.component.html',
  styleUrls: ['./save.component.scss']
})
export class SaveComponent implements OnInit {

  points: number | null = null;
  movieId: number  = 0
  detail:MovieDetails|null = null;
 
  constructor(
    private route: ActivatedRoute,
    public movieService: TMDBApiService,
  ) { }

  ngOnInit(): void {
  
    this.route.params.subscribe(param =>{
      this.points = +param['points'];
      this.movieId = +param['movieId'];
      this.movieService.getMovieDetails(this.movieId).subscribe({
        next: (res)=>this.detail= res,
        error: (res)=>console.log(res)
      }); 
    });
  }
}
