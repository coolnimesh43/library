
package com.lftechnology.library.pojo;

import java.io.Serializable;

import javax.validation.constraints.NotNull;

public class LoginPOJO implements Serializable {

    @NotNull
    private String email;

    @NotNull
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

    @Override
    public String toString() {
        return "LoginPOJO [email=" + email + ", password=" + password + "]";
    }

}
