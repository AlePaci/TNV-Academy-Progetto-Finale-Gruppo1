package com.thenetvalue.API_user_authentication.model;

import com.thenetvalue.API_user_authentication.model.User;

public class RequestResponse {
    private User user;
    private String message;

    public RequestResponse(User user, String message) {
        this.user = user;
        this.message = message;
    }

    public User getUser() {
        return user;
    }

    public void setUser(User user) {
        this.user = user;
    }

    public String getMessage() {
        return message;
    }

    public void setMessage(String message) {
        this.message = message;
    }
}
