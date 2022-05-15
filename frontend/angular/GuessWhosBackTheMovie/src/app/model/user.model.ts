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

export interface LoginUser{
    username: string;
    password: string;
}
export interface RegistrationUser{
    username: string;
    password: string;
    confirmPassword: string;
}

export interface UserScore{
    user:User;
    score:number;
  }

