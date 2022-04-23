import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { RegistrationUser, User, UserDataObject } from '../model/user.model';



@Injectable({
  providedIn: 'root'
})
export class AccessApiService {

  constructor(private http: HttpClient) { }

  registerUser(user:RegistrationUser | null){
    return this.http.post<UserDataObject>("http://localhost:8080/registration/", user);
  }

  loginUser(user:RegistrationUser |null){
    return this.http.put<UserDataObject>("http://localhost:8080/login/",user);
  }
}
