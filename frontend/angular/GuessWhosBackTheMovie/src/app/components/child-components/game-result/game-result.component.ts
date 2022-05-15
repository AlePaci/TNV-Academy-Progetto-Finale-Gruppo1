import { Component, Input, OnInit } from '@angular/core';
import { faBurst, faTrophy} from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-game-result',
  templateUrl: './game-result.component.html',
  styleUrls: ['./game-result.component.scss']
})
export class GameResultComponent implements OnInit {

  loseIcon = faBurst;
  winIcon = faTrophy;

  @Input(('points'))points!:number;
  @Input(('win'))win!:boolean;

  constructor() { }

  ngOnInit(): void {
  }

}
