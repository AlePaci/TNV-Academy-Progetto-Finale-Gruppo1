import { Component, OnInit } from '@angular/core';
import { AccessApiService } from 'src/app/services/access-api.service';
import { SessionStorageService } from 'src/app/services/session-storage.service';
import { faCirclePlus } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-friends',
  templateUrl: './friends.component.html',
  styleUrls: ['./friends.component.scss']
})
export class FriendsComponent implements OnInit {

  plusIcon = faCirclePlus;

  constructor(
    private accessService: AccessApiService,
    private sessionService: SessionStorageService) { }

  ngOnInit(): void {
  }

}
