import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SessionStorageService {

  constructor() { }

  getLogged(){
   
  return sessionStorage.getItem("logged")=== "true";
}
  setLogged(logged: boolean){
    sessionStorage.setItem("logged",`${logged}`);

  }
  getUserId(){
    return sessionStorage.getItem("userId");
  }

  setUserId(userid: number){
    sessionStorage.setItem("userId",`${userid}`);
  }
}

