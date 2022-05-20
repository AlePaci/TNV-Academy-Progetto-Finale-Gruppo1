export interface Suggestion {
    id: number;
    movieId: number;
    userId: number;
    updatedAt: Date;
    createdAt: Date;
}

export interface SuggestionData {
    message: string;
    data: Suggestion;
}

export interface NewSuggestion{
    movieId: number;
    userId: number;
}

export interface SuggestionDelete{
    message: string;
}
