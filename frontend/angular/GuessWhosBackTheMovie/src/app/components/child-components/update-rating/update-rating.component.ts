import { Component, Input, OnInit,Output, EventEmitter } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { faFloppyDisk } from '@fortawesome/free-regular-svg-icons';
import { RatingsService } from 'src/app/services/ratings.service';
import { SessionStorageService } from 'src/app/services/session-storage.service';

@Component({
  selector: 'app-update-rating',
  templateUrl: './update-rating.component.html',
  styleUrls: ['./update-rating.component.scss']
})
export class UpdateRatingComponent implements OnInit {

  @Input(('ratingId'))ratingId!:number;
  @Output() callParentFunc: EventEmitter<any> = new EventEmitter<any>();
  saveIcon=faFloppyDisk;

  constructor(
    private ratingService: RatingsService,
    private sessionService: SessionStorageService,
    private router: Router) {
      this.router.routeReuseStrategy.shouldReuseRoute = () => false;
     }

  ngOnInit(): void {
  }

  save(savingForm:NgForm){
    this.ratingService.updateRatings(this.ratingId,{movie_rating:savingForm.value.rating,movie_id:this.ratingId,user_id:this.sessionService.getUserId()}).subscribe({
      next:(res)=>{
        console.log(res);
        this.callParentFunc.emit();
      }
    })
  }

}
