import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Comment, CommentData, CommentDelete, PartComment } from '../model/comment.model';

@Injectable({
  providedIn: 'root'
})
export class CommentsService {

  constructor(private http: HttpClient) { }

  createComment(newComment :PartComment){
    return this.http.post<CommentData>("http://localhost:5201/comment",newComment);
  }

  getComment(userId: number, movieId: number){
    return this.http.get<CommentData>(`http://localhost:5201/comment/byid/${movieId}/${userId}`);
  }

  deleteComment(id: number){
    return this.http.delete<CommentDelete>(`http://localhost:5201/comment/delete/${id}`);
  }

}
