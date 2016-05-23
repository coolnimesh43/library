
package com.lftechnology.library.pojo;

import java.io.IOException;
import java.io.Serializable;

import javax.validation.constraints.NotNull;

import com.fasterxml.jackson.core.JsonParseException;
import com.fasterxml.jackson.databind.JsonMappingException;
import com.lftechnology.library.model.User;
import com.lftechnology.library.util.ObjectMapperFactory;

public class Token implements Serializable {

    @NotNull
    private String accessToken;

    @NotNull
    private User user;

    public Token() {
        super();
    }

    public Token(String token)
        throws JsonParseException, JsonMappingException, IOException {
        System.out.println(token);
        Token object = ObjectMapperFactory.objectMapper().readValue(token, Token.class);
        this.accessToken = object.accessToken;
        this.user = object.user;
    }

    public Token(String accessToken, User user) {
        super();
        this.accessToken = accessToken;
        this.user = user;
    }

    public String getAccessToken() {
        return accessToken;
    }

    public void setAccessToken(String accessToken) {
        this.accessToken = accessToken;
    }

    public User getUser() {
        return user;
    }

    public void setUser(User user) {
        this.user = user;
    }

    @Override
    public String toString() {
        return "Token [accessToken=" + accessToken + ", user=" + user + "]";
    }

}
