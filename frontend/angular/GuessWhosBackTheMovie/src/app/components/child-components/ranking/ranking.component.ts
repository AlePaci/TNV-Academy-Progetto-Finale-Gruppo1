import { PreferredMovieService } from '../../../services/preferred-movie.service';
import { Component, OnInit } from '@angular/core';
import { UserRanking } from '../../../model/user.model';
import { AccessApiService } from '../../../services/access-api.service';
import { faRankingStar } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-ranking',
  templateUrl: './ranking.component.html',
  styleUrls: ['./ranking.component.scss']
})
export class RankingComponent implements OnInit {

  
  userScore : UserRanking [] = [];
  rank = faRankingStar;


  constructor(
    private preffered: PreferredMovieService,
    private user: AccessApiService,
    ) {

   }

  ngOnInit(): void {
    this.user.allUsers().subscribe({
      next : (res) => {
        res.forEach(user => {
          this.preffered.findAllMoviesbyUserId(user.id).subscribe({
             next : (res) =>{
               let score : number = 0;
               let partite: number =0;
               res.forEach(movie=>{ 
                 score += movie.gameScore;
                partite+= 1;
                });
               this.userScore.push({user : user , score : score, film : partite});
               this.userScore = this.order();
             }
          })
        });       
      },
      error: (res)=>console.log(res)
    })
  }

  order(){
    return this.userScore.sort((a,b)=> b.score - a.score)
  }
}
