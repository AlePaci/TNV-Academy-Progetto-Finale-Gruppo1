import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { NgForm } from '@angular/forms';
import { faFloppyDisk } from '@fortawesome/free-regular-svg-icons';
import { Comment } from 'src/app/model/comment.model';
import { CommentsService } from 'src/app/services/comments.service';
import { SessionStorageService } from 'src/app/services/session-storage.service';


@Component({
  selector: 'app-update-comment',
  templateUrl: './update-comment.component.html',
  styleUrls: ['./update-comment.component.scss']
})
export class UpdateCommentComponent implements OnInit {
  @Input(('comment'))comment!:Comment;
  @Output() callParentFunc: EventEmitter<any> = new EventEmitter<any>();

  saveIcon = faFloppyDisk;

  constructor(private commentService:CommentsService,
    private sessionStorage:SessionStorageService) { }

  ngOnInit(): void {
    
  }

  save(savingForm:NgForm){
    this.commentService.updateComment(this.comment.id,{commentText: savingForm.value.review, userId:this.sessionStorage.getUserId(),movieId:this.comment.movieId}).subscribe({
      next: (res)=>{
        console.log(res);
        this.callParentFunc.emit();

      }
    })


  }

}
