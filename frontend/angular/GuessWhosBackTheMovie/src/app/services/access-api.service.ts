import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { RegistrationUser, UpdatePassword, User, UserDataObject } from '../model/user.model';



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
  
  allUsers(){
    return this.http.get<User[]>("http://localhost:8080/users");
  }

  getUserById(userId:number){
    return this.http.get<User>(`http://localhost:8080/users/${userId}`);
  }

  updateUsername(newUsername:string, user: RegistrationUser){
  return this.http.put<UserDataObject>(`http://localhost:8080/usernameUpdate/${newUsername}/`, user);
  }

  updatePassword(username:string, password :UpdatePassword){
    return this.http.put<UserDataObject>(`http://localhost:8080/passwordUpdate/${username}/`,password);
  }

  deleteUser(userId:number){
    return this.http.delete<string>(`http://localhost:8080/users/${userId}`);
  }

  getUserBuUsername(name:string){
    return this.http.get<UserDataObject>(`http://localhost:8080/username/${name}`);
  }
}
