
package com.lftechnology.library.model;

import java.util.Date;
import java.util.List;

import javax.persistence.CascadeType;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.JoinColumn;
import javax.persistence.JoinTable;
import javax.persistence.ManyToMany;
import javax.persistence.Table;
import javax.persistence.Temporal;
import javax.persistence.TemporalType;

@Entity
@Table(name = "library_user")
public class User extends AbstractEntity {

    @Column(name = "user_name", nullable = false, unique = true)
    private String userName;

    @Column(name = "email", nullable = false, unique = true)
    private String email;

    @Column(name = "password", nullable = false)
    private String password;

    @Column(name = "first_name", nullable = false)
    private String firstName;

    @Column(name = "last_name", nullable = false)
    private String lastName;

    @Column(name = "address")
    private String address;

    @Column(name = "is_active", nullable = false)
    private Boolean active = Boolean.TRUE;

    @Column(name = "last_logged_in")
    @Temporal(TemporalType.TIMESTAMP)
    private Date lastLoggedInDate;

    @ManyToMany(cascade = { CascadeType.MERGE, CascadeType.PERSIST }, fetch = FetchType.EAGER)
    @JoinTable(name = "user_video", joinColumns = { @JoinColumn(name = "user_id", referencedColumnName = "id"), }, inverseJoinColumns = {
        @JoinColumn(name = "video_id", referencedColumnName = "id", unique = true) })
    private List<Video> favouriteVideos;

    public User() {
        super();
    }

    public User(UserBuilder builder) {
        this.userName = builder.userName;
        this.email = builder.email;
        this.password = builder.password;
        this.firstName = builder.firstName;
        this.lastLoggedInDate = builder.lastLoggedInDate;
        this.lastName = builder.lastName;
        this.active = builder.active;
        this.address = builder.address;
        this.setCreatedBy(builder.createdBy);
        this.setLastModifiedBy(builder.lastModifiedBy);
        this.favouriteVideos = builder.favouriteVideos;
    }

    public String getUserName() {
        return userName;
    }

    public void setUserName(String userName) {
        this.userName = userName;
    }

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

    public String getFirstName() {
        return firstName;
    }

    public void setFirstName(String firstName) {
        this.firstName = firstName;
    }

    public String getLastName() {
        return lastName;
    }

    public void setLastName(String lastName) {
        this.lastName = lastName;
    }

    public String getAddress() {
        return address;
    }

    public void setAddress(String address) {
        this.address = address;
    }

    public Boolean getActive() {
        return active;
    }

    public void setActive(Boolean active) {
        this.active = active;
    }

    public Date getLastLoggedInDate() {
        return lastLoggedInDate;
    }

    public void setLastLoggedInDate(Date lastLoggedInDate) {
        this.lastLoggedInDate = lastLoggedInDate;
    }

    public List<Video> getFavouriteVideos() {
        return favouriteVideos;
    }

    public void setFavouriteVideos(List<Video> favouriteVideos) {
        this.favouriteVideos = favouriteVideos;
    }

    public static class UserBuilder {

        private String userName;
        private String email;
        private String password;
        private String firstName;
        private String lastName;
        private String address;
        private Boolean active = Boolean.TRUE;
        private Date lastLoggedInDate;
        private Long createdBy;
        private Long lastModifiedBy;
        private List<Video> favouriteVideos;

        public UserBuilder(String userName, String email, String password) {
            super();
            this.userName = userName;
            this.email = email;
            this.password = password;
        }

        public UserBuilder firstName(String firstName) {
            this.firstName = firstName;
            return this;
        }

        public UserBuilder lastName(String lastName) {
            this.lastName = lastName;
            return this;
        }

        public UserBuilder address(String address) {
            this.address = address;
            return this;
        }

        public UserBuilder active(Boolean active) {
            this.active = active;
            return this;
        }

        public UserBuilder lastLoggedInDate(Date lastLoggedInDate) {
            this.lastLoggedInDate = lastLoggedInDate;
            return this;
        }

        public UserBuilder createdBy(Long createdBy) {
            this.createdBy = createdBy;
            return this;
        }

        public UserBuilder lastModifiedBy(Long lastModifiedBy) {
            this.lastModifiedBy = lastModifiedBy;
            return this;
        }

        public UserBuilder favouriteVideos(List<Video> videos) {
            this.favouriteVideos = videos;
            return this;
        }

        public User build() {
            return new User(this);
        }

    }

}
