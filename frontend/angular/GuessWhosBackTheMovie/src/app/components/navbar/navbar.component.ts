import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { SessionStorageService } from 'src/app/services/session-storage.service';
import { faFilm, faRightToBracket, faRightFromBracket } from '@fortawesome/free-solid-svg-icons';
import { faUser } from '@fortawesome/free-regular-svg-icons';
import { AccessApiService } from 'src/app/services/access-api.service';


@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {
  filmIcon = faFilm;
  loginIcon = faRightToBracket;
  logoutIcon = faRightFromBracket;
  userIcon = faUser;
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
    if(this.sessionService.getLogged()){
    this.accessService.getUserById(this.sessionService.getUserId()).subscribe({
      next: (res)=> this.username = res.username,
      error: (res)=> console.log(res)
    });
  }
}
}
