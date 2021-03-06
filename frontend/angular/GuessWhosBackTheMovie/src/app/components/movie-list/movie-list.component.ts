import { Component, OnInit } from '@angular/core';
import { Movie } from '../../model/movie.model';
import { PreferredMovieService } from '../../services/preferred-movie.service';
import { Prefferd } from '../../model/prefferd.model';
import { SessionStorageService } from '../../services/session-storage.service';
import { TMDBApiService } from '../../services/tmdb-api.service';
import { faArrowUp19 ,faArrowDown91, faArrowDownZA, faArrowUpAZ} from '@fortawesome/free-solid-svg-icons';
import { IconDefinition } from '@fortawesome/fontawesome-svg-core';

@Component({
  selector: 'app-movie-list',
  templateUrl: './movie-list.component.html',
  styleUrls: ['./movie-list.component.scss']
})
export class MovieListComponent implements OnInit {

  searchText: string ="";

  //Proprieta che contengono i film preferiti
  prefferedMovies:Prefferd[] = [];
  unsortedList:Movie[] = []
  movieList:Movie[]= [];

  //proprieta per la visualizzazione
  scorOrder:boolean= true;
  titleOrder:boolean= true;

  //proprietà per le icone
  faScoreUp = faArrowUp19;
  faScoreDown = faArrowDown91;
  faTitleUp = faArrowUpAZ;
  faTitleDown = faArrowDownZA;
  faScoreOrder: IconDefinition = this.faScoreDown;
  faTitleOrder: IconDefinition = this.faTitleDown;
  
  constructor(
    private prefferedService: PreferredMovieService,
    private sessionService: SessionStorageService,
    public movieService:TMDBApiService) { }

  ngOnInit(): void {
    this.prefferedService.findAllMoviesbyUserId(this.sessionService.getUserId()).subscribe({
      next: (res) =>{
        this.prefferedMovies=res;
        this.prefferedMovies.sort((a,b)=>b.gameScore -a.gameScore);
        this.prefferedMovies.forEach(element => {
          this.movieService.getMovieDetails(element.movieId).subscribe({
          next: (res)=> this.unsortedList.push({movieDetail:res,movieScore:element.gameScore}),
          error: (res) => console.log(res)
        });
       }); 
      this.search()
      },
      error:(res) => console.log(res)
    });  
  }

  /**
   * metodo che permette di ordinare per punteggio crescente o decrescente
   */
  ordinaPunteggio(){
    if(this.scorOrder){
      this.movieList.sort((a,b)=> a.movieScore -b.movieScore);
      this.faScoreOrder = this.faScoreUp;
      this.scorOrder = !this.scorOrder;
    }
    else{
      this.movieList.sort((a,b)=> b.movieScore -a.movieScore);
      this.faScoreOrder = this.faScoreDown;
      this.scorOrder = !this.scorOrder
    }
  }

  /**
   * Metodo che permette di ordinare per titolo crescente o decrescente
   */
  ordinaTitolo(){
    if(this.titleOrder){
      this.movieList.sort((a,b)=>{
        if(a.movieDetail.title < b.movieDetail.title) return 1;
        if(a.movieDetail.title > b.movieDetail.title) return -1;
        return 0;
      });
      this.faTitleOrder = this.faTitleDown;
      this.titleOrder = !this.titleOrder;
    }
    else{
      this.movieList.sort((a,b)=>{
        if(b.movieDetail.title < a.movieDetail.title) return 1;
        if(b.movieDetail.title > a.movieDetail.title) return -1;
        return 0;
      });
      this.faTitleOrder = this.faTitleUp;
      this.titleOrder = !this.titleOrder;
  }
}

/**
 * Metodo che riceve dall evento i parametri da cercare
 * @param data stringa che viene digitata
 */
searchKey(data: string) {
  this.searchText = data;
  this.search();
}

/**
 * Metodo che permette di filtrare la lista di film preferiti
 */
search(){
 this.movieList =  this.searchText === ""? 
 this.unsortedList : 
 this.unsortedList.filter((m)=> { return m.movieDetail.title.toLowerCase().includes(this.searchText.toLowerCase())})
}
}
