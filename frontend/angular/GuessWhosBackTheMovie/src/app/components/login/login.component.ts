import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { LoginUser, User } from 'src/app/model/user.model';
import { AccessApiService } from 'src/app/services/access-api.service';
import { SessionStorageService } from 'src/app/services/session-storage.service';
import { faEye} from '@fortawesome/free-regular-svg-icons';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  user: User |null = null;
  logged: boolean = false;
  error: boolean = false;
  show: boolean = false;
  eyeOpen = faEye;

  constructor( 
    private accessService: AccessApiService,
     private sessionService: SessionStorageService,
      private router:Router) { }

  ngOnInit(): void {
  }

  login(loginForm: NgForm){
    this.accessService.loginUser(loginForm.value).subscribe({
      next: (res)=>{
      this.user = res.user;
      this.sessionService.setUserId(this.user.id);
      this.sessionService.setLogged(true);
      this.logged = true;
     setTimeout(() => {
      console.log('sleep');
      this.router.navigate([""]);
      }, 2000);
      },
      error: (res) => {
        console.log(res);
        this.error = true;
      }
    });
  }
  password(){
    this.show = !this.show;
  }
  
 
}
