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
  userid : User [] = [];
  userScore : UserScore [] = [];


  constructor(
    private preffered: PreferredMovieService,
    private user: AccessApiService,
    ) {

   }

  ngOnInit(): void {
    this.user.allUsers().subscribe({
      next : (res) => {this.userid = res;
        this.userid.forEach(rank => {
          this.preffered.findAllMoviesbyUserId(rank.id).subscribe({
             next : (res) =>{
               let score : number = 0;
               res.forEach(
                 totalRank=>{
                   score += totalRank.gameScore
                 }
               )
               this.userScore.push({user : rank , score : score})
             }
          })
        });
       console.log (this.userScore)
      },
      error: (res)=>console.log(res)
    })



  }


}
