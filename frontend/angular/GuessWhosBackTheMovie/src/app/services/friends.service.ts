import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { FriendRequest, FriendRequestData, NewRequest } from '../model/friends.model';

@Injectable({
  providedIn: 'root'
})
export class FriendsService {

  constructor(private http:HttpClient) { }

 createFriendRequest(newRequest:NewRequest){
   return this.http.post<FriendRequestData>('http://localhost:8080/request/',newRequest);
 }

 getRequestsBySender(senderId:number){
   return this.http.get<FriendRequest[]>(`http://localhost:8080/request/bysender/${senderId}`);
 }

 getRequestByReceiver(receiverId:number){
   return this.http.get<FriendRequest[]>(`http://localhost:8080/request/byreceiver/${receiverId}`);
 }

 deleteRequest(requestId:number){
   return this.http.delete<FriendRequestData>(`http://localhost:8080/request/${requestId}`);
 }
}
