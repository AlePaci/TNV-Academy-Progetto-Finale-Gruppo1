export interface Comment {
    id: number;
    userId: number;
    movieId: number;
    commentText: string;
}

export interface CommentData {
    data: Comment;
    timeStamp: Date;
}

export interface PartComment{
    userId: number;
    movieId: number;
    commentText: string;
}

export interface CommentDelete {
    message: string;
    timestamp: Date;
}