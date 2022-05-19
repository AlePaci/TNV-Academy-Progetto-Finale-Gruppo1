import { Component, Input, OnInit } from '@angular/core';
import { UserScore } from 'src/app/model/user.model';
import { faRankingStar } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-top3-film',
  templateUrl: './top3-film.component.html',
  styleUrls: ['./top3-film.component.scss']
})
export class Top3FilmComponent implements OnInit {

  @Input(('topPosition'))topPosition!:UserScore[];

  rank = faRankingStar;

  constructor() { }

  ngOnInit(): void {
  }

}
