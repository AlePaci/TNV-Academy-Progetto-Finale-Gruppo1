export interface NewRating {
    movie_rating: number;
    movie_id: number;
    user_id: number;
}

export interface Ratings {
    movie_rating: number;
    movie_id: number;
    user_id: number;
}

export interface RatingData {
    Ratings: Ratings[];
    ResponseStatus: number;
}

export interface DeleteMessage {
    message: string;
    ResponseStatus: number;
}