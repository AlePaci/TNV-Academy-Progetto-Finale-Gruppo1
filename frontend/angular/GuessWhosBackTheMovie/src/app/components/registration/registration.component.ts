import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { User, UserDataObject } from 'src/app/model/user.model';


@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.scss']
})
export class RegistrationComponent implements OnInit {

  user: UserDataObject| null = null
  constructor(private http :HttpClient) { }

  ngOnInit(): void {
  }
  login(loginForm: NgForm) {
    this.http.post<UserDataObject>('http://localhost:8080/registration/', loginForm.value).subscribe({
      next: (res) => this.user = res,
      error: () => console.log('error'),
    
    });
    console.log(this.user)
}
}
