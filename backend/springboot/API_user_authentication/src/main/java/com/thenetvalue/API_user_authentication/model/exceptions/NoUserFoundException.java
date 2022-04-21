package com.thenetvalue.API_user_authentication.model.exceptions;

public class NoUserFoundException extends RuntimeException{
    public NoUserFoundException() {
    }

    public String printException(){
        return "USER_NOT_FOUND";
    }
}
