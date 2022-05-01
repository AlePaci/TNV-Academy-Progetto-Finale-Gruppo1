export interface Prefferd {
    id:        number;
    movieId:   number;
    userId:    number;
    gameScore: number;
    createdAt: Date;
    updatedAt: Date;
}

export interface SavePrefferd{
    movieId:   number | null;
    userId:    number;
    gameScore: number | null; 
}
export interface PreffDelete {
    message: string;
}