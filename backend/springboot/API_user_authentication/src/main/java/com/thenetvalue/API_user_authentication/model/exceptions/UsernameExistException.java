package com.thenetvalue.API_user_authentication.model.exceptions;

public class UsernameExistException extends RuntimeException{
    public UsernameExistException() {
    }
    public String printException(){
        return "USERNAME_EXISTS";
    }
}
