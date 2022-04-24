import { Component, OnInit } from '@angular/core';
import { Subscription, interval } from 'rxjs'
import { TimeComponents } from 'src/app/model/timer.model';

@Component({
  selector: 'app-count-down',
  templateUrl: './count-down.component.html',
  styleUrls: ['./count-down.component.scss']
})
export class CountDownComponent implements OnInit {

  countDown: TimeComponents = {secondsToEnd: 0, minutesToEnd: 3}
  constructor(private subscription: Subscription) { }

  ngOnInit(): void {
    this.subscription = interval(1000)
    .subscribe(x => { this.countDown });

    
  }

}
