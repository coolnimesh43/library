
package com.lftechnology.library.pojo;

import java.io.Serializable;

import javax.validation.constraints.NotNull;

import com.fasterxml.jackson.annotation.JsonIgnore;

public class LoginPOJO implements Serializable {

    @NotNull
    private String email;

    @JsonIgnore
    private String password;

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }

}
