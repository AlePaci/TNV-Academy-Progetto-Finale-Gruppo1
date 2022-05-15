import { Component, Input, OnInit } from '@angular/core';
import { FaIconComponent } from '@fortawesome/angular-fontawesome';
import { IconProp } from '@fortawesome/fontawesome-svg-core';

@Component({
  selector: 'app-time',
  templateUrl: './time.component.html',
  styleUrls: ['./time.component.scss']
})
export class TimeComponent implements OnInit {
  @Input(('minutes'))minutes!:string;
  @Input(('seconds'))seconds!:string;
  @Input(('time'))time!:IconProp;

  constructor() { }

  ngOnInit(): void {
  }

}
