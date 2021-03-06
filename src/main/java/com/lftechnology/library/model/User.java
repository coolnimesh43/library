
package com.lftechnology.library.model;

import java.time.LocalDateTime;
import java.util.Set;

import javax.persistence.CascadeType;
import javax.persistence.Column;
import javax.persistence.Convert;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.JoinColumn;
import javax.persistence.JoinTable;
import javax.persistence.ManyToMany;
import javax.persistence.Table;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.lftechnology.library.util.LocalDateAttributeConverter;

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

    @Column(name = "is_active")
    private Boolean active = Boolean.TRUE;

    @Column(name = "last_logged_in")
    @Convert(converter = LocalDateAttributeConverter.class)
    @JsonIgnore
    private LocalDateTime lastLoggedInDate;

    @ManyToMany(cascade = { CascadeType.PERSIST, CascadeType.MERGE }, fetch = FetchType.EAGER)
    @JoinTable(name = "user_album", joinColumns = { @JoinColumn(name = "user_id", referencedColumnName = "id") }, inverseJoinColumns = {
        @JoinColumn(name = "album_id", referencedColumnName = "id") })
    private Set<Album> albums;

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
        this.albums = builder.albums;
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

    public LocalDateTime getLastLoggedInDate() {
        return lastLoggedInDate;
    }

    public void setLastLoggedInDate(LocalDateTime lastLoggedInDate) {
        this.lastLoggedInDate = lastLoggedInDate;
    }

    public Set<Album> getAlbums() {
        return albums;
    }

    public void setAlbums(Set<Album> albums) {
        this.albums = albums;
    }

    @Override
    public String toString() {
        return "User [userName=" + userName + ", email=" + email + ", password=" + password + ", firstName=" + firstName + ", lastName=" +
            lastName + ", address=" + address + ", active=" + active + ", lastLoggedInDate=" + lastLoggedInDate + ", albums=" + albums +
            ", getId()=" + getId() + "]";
    }

    public static class UserBuilder {

        private String userName;
        private String email;
        private String password;
        private String firstName;
        private String lastName;
        private String address;
        private Boolean active = Boolean.TRUE;
        private LocalDateTime lastLoggedInDate;
        private Long createdBy;
        private Long lastModifiedBy;
        private Set<Album> albums;

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

        public UserBuilder lastLoggedInDate(LocalDateTime lastLoggedInDate) {
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

        public UserBuilder albums(Set<Album> albums) {
            this.albums = albums;
            return this;
        }

        public User build() {
            return new User(this);
        }

    }

}
