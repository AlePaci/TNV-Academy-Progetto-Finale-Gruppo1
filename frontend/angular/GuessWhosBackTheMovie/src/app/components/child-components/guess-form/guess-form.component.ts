import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { NgForm } from '@angular/forms';
import { MovieDetails } from 'src/app/model/movieDetails.model';

@Component({
  selector: 'app-guess-form',
  templateUrl: './guess-form.component.html',
  styleUrls: ['./guess-form.component.scss']
})
export class GuessFormComponent implements OnInit {
  @Input(('movieDetails'))movieDetails!:MovieDetails;
  @Output() callParentFunc: EventEmitter<any> = new EventEmitter<any>();
  
  trys:number = 0;

  constructor() { }

  ngOnInit(): void {
  }

  guess(guessForm: NgForm){
   
    if(this.movieDetails?.title.toLowerCase()===guessForm.value.guessTitle.toLowerCase()){
      this.callParentFunc.emit();
      console.log("indovinato");
    }
    else{
      this.trys+=1;
      console.log("Sbagliato");
    }
  }
}
