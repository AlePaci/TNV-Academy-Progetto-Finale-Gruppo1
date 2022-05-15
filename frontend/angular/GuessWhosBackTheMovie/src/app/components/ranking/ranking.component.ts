import { PreferredMovieService } from './../../services/preferred-movie.service';
import { Component, OnInit } from '@angular/core';
import { User, UserScore } from '../../model/user.model';
import { Prefferd } from '../../model/prefferd.model';
import { AccessApiService } from '../../services/access-api.service';

@Component({
  selector: 'app-ranking',
  templateUrl: './ranking.component.html',
  styleUrls: ['./ranking.component.scss']
})
export class RankingComponent implements OnInit {
  movie : Prefferd [] | null=null;
  userScore : UserScore [] = [];


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
               res.forEach(
                 totalRank=>{
                   score += totalRank.gameScore
                 }
               )
               this.userScore.push({user : user , score : score})
               this.userScore = this.order();
             }
          })
        });
       console.log (this.userScore)
       
      },
      error: (res)=>console.log(res)
    })



  }

  order(){
    return this.userScore.sort((a,b)=> b.score - a.score)
  }
}
