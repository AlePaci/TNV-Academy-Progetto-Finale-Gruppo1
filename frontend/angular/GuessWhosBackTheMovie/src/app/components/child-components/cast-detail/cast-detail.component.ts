import { Component, Input, OnInit } from '@angular/core';
import { MovieCredits,Crew } from 'src/app/model/movieCredits.model';

@Component({
  selector: 'app-cast-detail',
  templateUrl: './cast-detail.component.html',
  styleUrls: ['./cast-detail.component.scss']
})
export class CastDetailComponent implements OnInit {
  @Input(('credits'))credits!:MovieCredits;
  @Input(('director'))director!:Crew[];

  constructor() { }

  ngOnInit(): void {
  }

}
