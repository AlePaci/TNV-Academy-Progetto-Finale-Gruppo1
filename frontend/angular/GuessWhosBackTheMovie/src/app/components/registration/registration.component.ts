import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { RegistrationUser, UserDataObject } from 'src/app/model/user.model';
import { AccessApiService } from 'src/app/services/access-api.service';
import { PreferredMovieService } from 'src/app/services/preferred-movie.service';
import { faEye} from '@fortawesome/free-regular-svg-icons';


@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.scss']
})
export class RegistrationComponent implements OnInit {
  eyeOpen = faEye;
  show:boolean = false;
  user: UserDataObject| null = null;
  error: boolean = false;
  registered:boolean = false;

  constructor(
    private accessApi: AccessApiService,
     private api: PreferredMovieService,
     private router: Router) { }

  ngOnInit(): void { }


  registration(registrationForm: NgForm) {
    if(registrationForm.value.password === registrationForm.value.confirmPassword){
      this.accessApi.registerUser(registrationForm.value).subscribe({
        next: (res) =>{ 
          this.user = res;
          this.registered = true;
          setTimeout(() => {
            console.log('sleep');
            this.router.navigate(["/login"]);
            }, 2000); 
        },
        error: () => console.log('error'),
      });
    }else this.error = true;
  }

}
