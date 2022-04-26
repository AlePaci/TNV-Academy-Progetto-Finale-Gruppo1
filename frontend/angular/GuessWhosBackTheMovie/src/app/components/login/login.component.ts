import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { RegistrationUser, User } from 'src/app/model/user.model';
import { AccessApiService } from 'src/app/services/access-api.service';
import { SessionStorageService } from 'src/app/services/session-storage.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  user: User |null = null;
  logUser: RegistrationUser ={username:"username",password:"password"};
  logged: boolean = false;
  error: boolean = false;

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
  
 
}
