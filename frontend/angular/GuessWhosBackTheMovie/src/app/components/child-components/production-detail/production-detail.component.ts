import { Component, Input, OnInit } from '@angular/core';
import { MovieDetails } from 'src/app/model/movieDetails.model';

@Component({
  selector: 'app-production-detail',
  templateUrl: './production-detail.component.html',
  styleUrls: ['./production-detail.component.scss']
})
export class ProductionDetailComponent implements OnInit {
  
  @Input(('detail'))detail!:MovieDetails;

  constructor() { }

  ngOnInit(): void {
  }

}
