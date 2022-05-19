import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { AccessApiService } from 'src/app/services/access-api.service';
import { SessionStorageService } from 'src/app/services/session-storage.service';
import { faCirclePlus, faCircleMinus } from '@fortawesome/free-solid-svg-icons';
import { NgForm } from '@angular/forms';
import { FriendsService } from 'src/app/services/friends.service';
import { StoreFriend } from 'src/app/model/friends.model';
import { Router } from '@angular/router';

@Component({
  selector: 'app-friends',
  templateUrl: './friends.component.html',
  styleUrls: ['./friends.component.scss']
})
export class FriendsComponent implements OnInit {
  //proprietà usate per gli ngif
  error:boolean = false;
  newRequest:boolean = false;

  //Proprietà che contengono i diversi tipi di amici
  pendingRequest:StoreFriend[]=[];
  yourRequest:StoreFriend[]=[];
  friends:StoreFriend[]=[];

  //Proprietà per icone
  minusIcon = faCircleMinus;
  plusIcon = faCirclePlus;

  constructor(
    private accessService: AccessApiService,
    private friendService: FriendsService,
    private sessionService: SessionStorageService,
    private router:Router,
    private cd: ChangeDetectorRef) { }

  ngOnInit(): void {
    this.getPendingRequest();
    this.getYourRequests();
    this.getFriends();
  }

  /**
   * Metodo che attraverso l utilizzo delle chiamate Api al backend di SpringBoot recupera
   * e inserisce nella proprieta "pendingRequest" tutte le richieste di amicizia 
   * effettuate dall utente e ancora in attesa di risposta.
   */
  getPendingRequest(){
    this.friendService.getRequestsBySender(this.sessionService.getUserId()).subscribe({
      next:(res)=> {
        this.pendingRequest.length=0;
        res.forEach(element => {
          this.accessService.getUserById(element.receiver).subscribe({
            next:(res)=> this.pendingRequest.push({name:res.username, id: element.id}),
            error:(res)=> console.log(res)
          })
        });
      },
      error:(res)=> console.log(res)
    });
  }

  /**
   * Metodo che attraverso l utilizzo delle chiamate Api al backend di SpringBoot recupera
   * e inseriscde nella proprieta "yourRequest" tutte le richieste di amicizia
   * arrivate all utente.
   */
  getYourRequests(){
    this.friendService.getRequestByReceiver(this.sessionService.getUserId()).subscribe({
      next:(res)=> {
        this.yourRequest.length=0;
        res.forEach(element => {
          this.accessService.getUserById(element.sender).subscribe({
            next:(res)=> this.yourRequest.push({name:res.username, id: element.id}),
            error:(res)=> console.log(res)
          })
        });
      },
      error:(res)=> console.log(res)
    });
  }


  /**
   * Metodo che attraverso l utilizzo delle chianate Api al backend di Springboot recupera
   * e inserisce nella proprieta "frinds" tutti gli amici dell utente. 
   */
  getFriends(){
    this.friends.length=0;
      this.friendService.getFriendsbyA(this.sessionService.getUserId()).subscribe({
        next:(res)=>{
          res.forEach(element => {
            this.accessService.getUserById(element.friendB).subscribe({
              next:(res)=>this.friends.push({name:res.username, id: element.id}),
              error:(res)=> console.log(res)
            });
          });
        },
        error:(res)=>console.log(res)
      });
      this.friendService.getFriendsbyB(this.sessionService.getUserId()).subscribe({
        next:(res)=>{
          res.forEach(element => {
            this.accessService.getUserById(element.friendA).subscribe({
              next:(res)=> this.friends.push({name:res.username, id: element.id}),
              error:(res)=> console.log(res)
            });
          });
        },
        error:(res)=>console.log(res)
      });
  }

  /**
   * Metodo che permette attraverso un form di inviare una nuova richiesta di amicizia
   * attraverso chiamata Api al backend di SpringBoot.
   * @param newrequest username recuperato dal form
   */
  sendRequest(newrequest:NgForm){
    this.accessService.getUserBuUsername(newrequest.value.username).subscribe({
      next:(res) => {
        if(res.message==="USER_FOUND"){
        this.friendService.createFriendRequest({sender: this.sessionService.getUserId(),receiver: res.user.id}).subscribe({
          next:(res)=>{
            this.newRequest = !this.newRequest;
            this.ngOnInit();
            this.cd.detectChanges();
          },
          error:(res)=>console.log(res)
        });
      }else{
        this.error = true;
      }
      },
      error:(res)=> console.log(res)
    });
  }
    
/**
 * Metodo che permette di cancellare una richiesta di amicizia sia essa fatta dal user o arrivata a lui.
 * @param id della richiesta di amicizia 
 */
  cancelRequest(id:number){
    this.friendService.deleteRequest(id).subscribe({
      next:(res)=> {
        this.ngOnInit();
        this.cd.detectChanges();
        
      },
      error:(res)=> console.log(res)
    });
  }

  /**
   * Metodo che permette di tramutare una richiesta di amicizia ricevuta in un amicizia
   * attraverso l utilizzo delle chiamate Api del Backend di SpringBoot.
   * @param id della richiesta di amicizia ricevuta
   */
  addFriend(id: number){
    this.friendService.getRequestById(id).subscribe({
      next:(res)=>{
        this.friendService.createFriend({friendA: res.request.receiver,friendB:res.request.sender}).subscribe({
          next:(res)=> { 
            this.friendService.deleteRequest(id).subscribe({
              next:(res)=> { 
                this.ngOnInit();
                this.cd.detectChanges();},
              error:(res)=>console.log(res)
            });
           },
          error:(res)=> console.log(res)
        });
     
       
      },
      error:(res)=>console.log(res)
    });
  }

  /**
   * Metodo che attraverso chiamata Api as backend SpringBoot cancella un amicizia
   * @param id dell amicizia da cancellare
   */
  cancelFriend(id:number){
    this.friendService.deleteFriend(id).subscribe({
      next:(res)=>{
        this.ngOnInit();
        this.cd.detectChanges();
      },
      error:(res)=>console.log(res)
    });
  }

  //Metodo che permette di cambiare l elemento visualizzato
  addOne(){
    this.newRequest = !this.newRequest;
  }


}
