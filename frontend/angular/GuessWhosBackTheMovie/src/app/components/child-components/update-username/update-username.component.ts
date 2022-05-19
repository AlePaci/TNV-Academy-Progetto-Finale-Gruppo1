import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { NgForm } from '@angular/forms';
import { faEye} from '@fortawesome/free-regular-svg-icons';
import { AccessApiService } from 'src/app/services/access-api.service';

@Component({
  selector: 'app-update-username',
  templateUrl: './update-username.component.html',
  styleUrls: ['./update-username.component.scss']
})
export class UpdateUsernameComponent implements OnInit {

  @Input(('username'))username!:string;
  @Output() callParentFunc: EventEmitter<any> = new EventEmitter<any>();

  //proprietà per la visulaizzazione contenuti
  show:boolean = false;
  wrongPass:boolean= false;
  userExist:boolean= false;

  //proprietà per icone
  eyeIcon = faEye;
  
  constructor(
    private accessService:AccessApiService
  ) { }

  ngOnInit(): void {
  }

  /**
   * Metodo per modificare il proprio username
   * @param updateUsername campi recuperati dal form
   */
  updateUsernameFunc(updateUsername: NgForm){
    let password: string = updateUsername.value.password;
    this.accessService.updateUsername(updateUsername.value.newUsername,{username: this.username , password: password, confirmPassword:password}).subscribe({
      next: (res)=> {
        if(res.message === "UPDATE_SUCCESSFUL") this.callParentFunc.emit(); 
        if(res.message === "WRONG_PSWD") this.wrongPass = true;
        if(res.message === "USERNAME_EXISTS") this.userExist = true;
      },
      error:(res) => console.log(res)
    })
  }
}
