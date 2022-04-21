package com.thenetvalue.API_user_authentication.model.exceptions;

public class WrongPasswordException extends RuntimeException{

    public WrongPasswordException() {
    }
    public String printException(){
        return "WRONG_PSWD";
    }
}
