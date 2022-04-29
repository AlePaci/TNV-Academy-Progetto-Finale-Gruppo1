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
    let stringId : string| null = sessionStorage.getItem("userId");
     if(stringId !== null) return +stringId;
    return 0
  }

  setUserId(userid: number){
    sessionStorage.setItem("userId",`${userid}`);
  }

  deleteUser(){
    sessionStorage.removeItem("userId");
  }
}

