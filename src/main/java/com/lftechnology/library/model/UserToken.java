
package com.lftechnology.library.model;

import java.time.LocalDateTime;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.Table;
import javax.validation.constraints.NotNull;

@Entity
@Table(name = "user_token")
public class UserToken extends AbstractEntity {

    @Column(name = "access_token", unique = true, columnDefinition = "TEXT")
    @NotNull
    private String accessToken;

    @NotNull
    @ManyToOne
    @JoinColumn(name = "user_id", referencedColumnName = "id")
    private User user;

    @Column(name = "expires_at")
    private LocalDateTime expiresAt;

    public UserToken() {
        super();
    }

    public UserToken(User user, LocalDateTime localDateTime, String accessToken) {
        super();
        this.accessToken = accessToken;
        this.user = user;
        this.expiresAt = localDateTime;
    }

    public User getUser() {

        return user;
    }

    public void setUser(User user) {

        this.user = user;
    }

    public LocalDateTime getExpiresAt() {

        return expiresAt;
    }

    public void setExpiresAt(LocalDateTime expiresAt) {

        this.expiresAt = expiresAt;
    }

    public String getAccessToken() {
        return accessToken;
    }

    public void setAccessToken(String accessToken) {
        this.accessToken = accessToken;
    }

    @Override
    public String toString() {
        return "UserToken [accessToken=" + accessToken + ", user=" + user + ", expiresAt=" + expiresAt + "]";
    }

}
