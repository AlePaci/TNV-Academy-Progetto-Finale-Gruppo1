package com.thenetvalue.API_user_authentication.model;

public class StringUpdate {
    private String oldOne;
    private String newOne;

    public StringUpdate(String oldOne, String newOne) {
        this.oldOne = oldOne;
        this.newOne = newOne;
    }

    public String getOldOne() {
        return oldOne;
    }

    public void setOldOne(String oldOne) {
        this.oldOne = oldOne;
    }

    public String getNewOne() {
        return newOne;
    }

    public void setNewOne(String newOne) {
        this.newOne = newOne;
    }
}
