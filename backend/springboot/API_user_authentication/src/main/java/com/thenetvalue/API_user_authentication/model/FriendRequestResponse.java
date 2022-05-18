package com.thenetvalue.API_user_authentication.model;

public class FriendRequestResponse {

    FriendRequest request;
    String message;

    public FriendRequestResponse(FriendRequest request, String message) {
        this.request = request;
        this.message = message;
    }

    public FriendRequest getRequest() {
        return request;
    }

    public void setRequest(FriendRequest request) {
        this.request = request;
    }

    public String getMessage() {
        return message;
    }

    public void setMessage(String message) {
        this.message = message;
    }
}
