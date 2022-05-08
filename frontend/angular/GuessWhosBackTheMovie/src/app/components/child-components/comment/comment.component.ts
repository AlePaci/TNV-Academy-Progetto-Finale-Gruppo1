import { Component, OnInit, Input } from '@angular/core';
import { Comment } from 'src/app/model/comment.model';
import { faPencil } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-comment',
  templateUrl: './comment.component.html',
  styleUrls: ['./comment.component.scss']
})
export class CommentComponent implements OnInit {

  @Input(('comment')) comment!: Comment ;
 
  pencil = faPencil

  constructor() { }

  ngOnInit(): void {

  }

}
