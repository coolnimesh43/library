
package com.lftechnology.library.pojo;

import java.io.Serializable;

import com.auth0.jwt.internal.com.fasterxml.jackson.annotation.JsonProperty;
import com.lftechnology.library.model.User;

public class Token implements Serializable {

    @JsonProperty("accessToken")
    private String accessToken;

    @JsonProperty("refreshToken")
    private String refreshtoken;

    @JsonProperty("user")
    private User user;

    public Token() {
        super();
    }

    public Token(String accessToken, String refreshtoken, User user) {
        super();
        this.accessToken = accessToken;
        this.refreshtoken = refreshtoken;
        this.user = user;
    }

    public String getAccessToken() {

        return accessToken;
    }

    public void setAccessToken(String accessToken) {

        this.accessToken = accessToken;
    }

    public String getRefreshtoken() {

        return refreshtoken;
    }

    public void setRefreshtoken(String refreshtoken) {

        this.refreshtoken = refreshtoken;
    }

    public User getUser() {

        return user;
    }

    public void setUser(User user) {

        this.user = user;
    }

}
