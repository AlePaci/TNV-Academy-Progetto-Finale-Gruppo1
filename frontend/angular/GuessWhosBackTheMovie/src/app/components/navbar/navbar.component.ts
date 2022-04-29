import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { SessionStorageService } from 'src/app/services/session-storage.service';


@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {
  
  constructor(
    public sessionService: SessionStorageService,
    public router: Router
    ) { }

  ngOnInit(): void {
  }
  logout(){
    this.sessionService.setLogged(false);
    this.sessionService.deleteUser();
  }
}
