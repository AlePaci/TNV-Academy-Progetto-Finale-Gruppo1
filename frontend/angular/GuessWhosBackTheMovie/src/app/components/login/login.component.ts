import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { User } from 'src/app/model/user.model';
import { AccessApiService } from 'src/app/services/access-api.service';
import { SessionStorageService } from 'src/app/services/session-storage.service';
import { faEye} from '@fortawesome/free-regular-svg-icons';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  user: User |null = null;

  //Proprieta per la visulaizzazione dei contenuti pagina
  logged: boolean = false;
  error: boolean = false;
  show: boolean = false;

  //proprieta per le icone
  eyeOpen = faEye;

  constructor( 
    private accessService: AccessApiService,
    private sessionService: SessionStorageService,
    private router:Router) { }

  ngOnInit(): void {
  }

  /**
   * Metodo per il login 
   * @param loginForm Parametri che arrivano dal form
   */
  login(loginForm: NgForm){
    this.accessService.loginUser(loginForm.value).subscribe({
      next: (res)=>{
      this.sessionService.setUserId(res.user.id);
      this.sessionService.setLogged(true);
      this.logged = true;
     setTimeout(() => {
      this.router.navigate([""]);
      }, 1000);
      },
      error: (res) => this.error = true  
    });
  }

  /**
   * Metodo che permette di modificare la visualizzazione della Password
   */
  password(){
    this.show = !this.show;
  }
  
 
}
