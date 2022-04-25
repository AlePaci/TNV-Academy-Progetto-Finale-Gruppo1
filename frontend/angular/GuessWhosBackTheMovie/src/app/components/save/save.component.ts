import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { CommentsService } from 'src/app/services/comments.service';
import { PreferredMovieService } from 'src/app/services/preferred-movie.service';
import { TMDBApiService } from 'src/app/services/tmdb-api.service';

@Component({
  selector: 'app-save',
  templateUrl: './save.component.html',
  styleUrls: ['./save.component.scss']
})
export class SaveComponent implements OnInit {

  points: number | null = null;
  movieId: number| null = null;
  posterPath: string | null = null;
  movieTitle: string | null = null;

  constructor(
    private route: ActivatedRoute,
    public movieService: TMDBApiService,
    private preffService: PreferredMovieService,
    private reviewService: CommentsService,
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

  }

}
