package com.thenetvalue.API_user_authentication.model.exceptions;

public class NoPasswordException extends RuntimeException{
    public NoPasswordException() {
    }
    public String printException(){
        return "NO_PSWD_ERR";
    }
}
