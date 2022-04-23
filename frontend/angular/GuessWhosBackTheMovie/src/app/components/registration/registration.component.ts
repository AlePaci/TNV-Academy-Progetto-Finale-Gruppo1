import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Prefferd } from 'src/app/model/prefferd.model';
import { User, UserDataObject } from 'src/app/model/user.model';
import { AccessApiService } from 'src/app/services/access-api.service';
import { PreferredMovieService } from 'src/app/services/preferred-movie.service';


@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.scss']
})
export class RegistrationComponent implements OnInit {
  movies: Prefferd[]= [];
  userid:number = 11;
  user: UserDataObject| null = null
  constructor(private accessApi: AccessApiService, private api: PreferredMovieService) { }

  ngOnInit(): void { 
    this.api.findAllMoviesbyUserId(this.userid).subscribe({
      next: (res) => this.movies = res
    });
  }
  registration(registrationForm: NgForm) {
    this.accessApi.registerUser(registrationForm.value).subscribe({
      next: (res) => this.user = res,
      error: () => console.log('error'),
    
    });
    console.log(this.user)
   
    console.log("this.movies");
    
}
}
