
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

    @Column(name = "refresh_token", unique = true)
    @NotNull
    private String refreshToken;

    @NotNull
    @ManyToOne
    @JoinColumn(name = "user_id", referencedColumnName = "id")
    private User user;

    @Column(name = "expires_at")
    private LocalDateTime expiresAt;

    public UserToken() {
        super();
    }

    public UserToken(String refreshToken, User user, LocalDateTime localDateTime) {
        super();
        this.refreshToken = refreshToken;
        this.user = user;
        this.expiresAt = localDateTime;
    }

    public String getRefreshToken() {

        return refreshToken;
    }

    public void setRefreshToken(String refreshToken) {

        this.refreshToken = refreshToken;
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

    @Override
    public String toString() {

        return "UserToken [refreshToken=" + refreshToken + ", user=" + user + ", getId()=" + getId() + "]";
    }

}
