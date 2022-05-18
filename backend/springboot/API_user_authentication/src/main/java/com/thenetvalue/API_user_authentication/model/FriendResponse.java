package com.thenetvalue.API_user_authentication.model;

public class FriendResponse {

    Friend friend;

    String message;

    public FriendResponse(Friend friend, String message) {
        this.friend = friend;
        this.message = message;
    }

    public Friend getFriend() {
        return friend;
    }

    public void setFriend(Friend friend) {
        this.friend = friend;
    }

    public String getMessage() {
        return message;
    }

    public void setMessage(String message) {
        this.message = message;
    }
}
