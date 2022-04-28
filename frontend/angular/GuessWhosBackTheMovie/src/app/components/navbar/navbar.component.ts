import { Component, OnInit } from '@angular/core';
import { SessionStorageService } from 'src/app/services/session-storage.service';


@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {
  isShown:boolean = false;
  constructor(public sessionService: SessionStorageService) { }

  ngOnInit(): void {
  }
  logout(){
    this.sessionService.setLogged(false);
    this.sessionService.deleteUser();
  }
}
