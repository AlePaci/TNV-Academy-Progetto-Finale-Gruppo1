export interface User {
    id: number;
    username: string;
    password: string;
    authority: string;
    enabled: number;
}

export interface UserDataObject {
    user: User;
    message: string;
}