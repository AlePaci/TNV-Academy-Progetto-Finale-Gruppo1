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
  error:boolean = false;
  newRequest:boolean = false;
  pendingRequest:StoreFriend[]=[];
  yourRequest:StoreFriend[]=[];
  friends:StoreFriend[]=[];

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

  getFriends(){
    this.friends.length=0
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

  sendRequest(newrequest:NgForm){
    this.accessService.getUserBuUsername(newrequest.value.username).subscribe({
      next:(res) => {
        this.friendService.createFriendRequest({sender: this.sessionService.getUserId(),receiver: res.user.id}).subscribe({
          next:(res)=> console.log(res),
          error:(res)=>console.log(res)
        });
      },
      error:(res)=> console.log(res)
    });
    this.newRequest = !this.newRequest;
    this.getPendingRequest();
  }



  addOne(){
    this.newRequest = !this.newRequest;
  }

  cancelRequest(id:number){
    this.friendService.deleteRequest(id).subscribe({
      next:(res)=> {
        this.ngOnInit();
        this.cd.detectChanges();
        
      },
      error:(res)=> console.log(res)
    });
  }

  addFriend(id: number){
    this.friendService.getRequestById(id).subscribe({
      next:(res)=>{
        this.friendService.createFriend({friendA: res.request.receiver,friendB:res.request.sender}).subscribe({
          next:(res)=> console.log(res),
          error:(res)=> console.log(res)
        });
        this.friendService.deleteRequest(res.request.id).subscribe({
          next:(res)=> console.log(res),
          error:(res)=>console.log(res)
        });
      }
    })
  }

}
