import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { User, UserDataObject } from 'src/app/model/user.model';
import { AccessApiService } from 'src/app/services/access-api.service';


@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.scss']
})
export class RegistrationComponent implements OnInit {

  user: UserDataObject| null = null
  constructor(private accessApi: AccessApiService) { }

  ngOnInit(): void {
  }
  registration(registrationForm: NgForm) {
    this.accessApi.registerUser(registrationForm.value).subscribe({
      next: (res) => this.user = res,
      error: () => console.log('error'),
    
    });
    console.log(this.user)
}
}
