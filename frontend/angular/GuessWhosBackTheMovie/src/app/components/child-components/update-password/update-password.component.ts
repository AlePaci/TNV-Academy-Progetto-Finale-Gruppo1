import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { NgForm } from '@angular/forms';
import { AccessApiService } from 'src/app/services/access-api.service';
import { faEye} from '@fortawesome/free-regular-svg-icons';

@Component({
  selector: 'app-update-password',
  templateUrl: './update-password.component.html',
  styleUrls: ['./update-password.component.scss']
})
export class UpdatePasswordComponent implements OnInit {

  @Input(('username'))username!:string;
  @Output() callParentFunc: EventEmitter<any> = new EventEmitter<any>();

  //Proprietà per la visulaizzazione contenuti
  show:boolean = false;
  wrongPass:boolean= false;

  //Proprietà per le icone
  eyeIcon = faEye;

  constructor(
    private accessService:AccessApiService
  ) { }

  ngOnInit(): void {
  }

   /**
   * Metodo per modificare la password
   * @param updatePassword campi recuperati dal form
   */
  updatePasswordFunc(updatePassword:NgForm){
    this.accessService.updatePassword(this.username,{oldOne: updatePassword.value.password, newOne: updatePassword.value.nuovaPassword}).subscribe({
      next:(res) => {
        if(res.message === "UPDATE_SUCCESSFUL") this.callParentFunc.emit(); 
        if(res.message === "WRONG_PSWD") this.wrongPass = true;
        
      },
      error:(res)=>console.log(res)
    })
  }
}
