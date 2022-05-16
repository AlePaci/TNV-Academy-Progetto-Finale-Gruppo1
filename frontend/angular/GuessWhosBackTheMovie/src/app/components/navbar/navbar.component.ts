import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { SessionStorageService } from 'src/app/services/session-storage.service';
import { faFilm, faRightToBracket, faRightFromBracket } from '@fortawesome/free-solid-svg-icons';
import { AccessApiService } from 'src/app/services/access-api.service';


@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {
  film = faFilm;
  login = faRightToBracket;
  falogout = faRightFromBracket;
  username:string=""

  constructor(
    public sessionService: SessionStorageService,
    private accessService:AccessApiService,
    public router: Router
    ) {
      router.events.forEach((event) => this.getUsername());
    }
     

  ngOnInit(): void {
    this.getUsername();
    
  }
  logout(){
    this.sessionService.setLogged(false);
    this.sessionService.deleteUser();
  }

  getUsername(){
    this.accessService.getUserById(this.sessionService.getUserId()).subscribe({
      next: (res)=> this.username = res.username,
      error: (res)=> console.log(res)
    });
  }
}
