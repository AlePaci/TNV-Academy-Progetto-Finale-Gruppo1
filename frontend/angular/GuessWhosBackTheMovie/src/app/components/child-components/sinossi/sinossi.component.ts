import { Component, Input, OnInit } from '@angular/core';
import { MovieDetails } from 'src/app/model/movieDetails.model';

@Component({
  selector: 'app-sinossi',
  templateUrl: './sinossi.component.html',
  styleUrls: ['./sinossi.component.scss']
})
export class SinossiComponent implements OnInit {
  
  @Input(('detail'))detail!:MovieDetails;

  constructor() { }

  ngOnInit(): void {
  }

}
