export interface NewRating {
    movie_rating: number;
    movie_id: number;
    user_id: number;
}

export interface Ratings {
    id: number;
    movie_rating: number;
    movie_id: number;
    user_id: number;
}

export interface Data {
    data: Ratings[];
    Author: string;
}
export interface RatingData {
    Ratings: Data;
    ResponseStatus: number;
}

export interface DeleteMessage {
    message: string;
    ResponseStatus: number;
}