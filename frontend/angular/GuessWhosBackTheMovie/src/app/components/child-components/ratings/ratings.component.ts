import { Component, OnInit ,Input, Output, EventEmitter} from '@angular/core';
import { faStar } from '@fortawesome/free-regular-svg-icons';
import { faPencil } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-ratings',
  templateUrl: './ratings.component.html',
  styleUrls: ['./ratings.component.scss']
})
export class RatingsComponent implements OnInit {
  @Input(('starArray')) starArray!:number[] ;
  @Output() callParentFunc: EventEmitter<any> = new EventEmitter<any>();


  star = faStar;
  pencil = faPencil;
 

  constructor() { }

  ngOnInit(): void {
  }

  modifica(){
   this.callParentFunc.emit();
  }
}
