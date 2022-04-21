package com.thenetvalue.API_user_authentication.model.exceptions;

public class NoUsernameException extends RuntimeException{
    public NoUsernameException() {
    }
    public String printException(){
        return "NO_USERNAME_ERR";
    }
}
