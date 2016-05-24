
package com.lftechnology.library.model;

import java.util.List;

import javax.persistence.CascadeType;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.JoinColumn;
import javax.persistence.JoinTable;
import javax.persistence.ManyToMany;
import javax.persistence.ManyToOne;
import javax.persistence.Table;
import javax.validation.constraints.NotNull;

import com.auth0.jwt.internal.com.fasterxml.jackson.annotation.JsonProperty;

@Entity
@Table(name = "album")
public class Album extends AbstractEntity {

    @Column(name = "name", nullable = false)
    @NotNull
    @JsonProperty("name")
    private String name;

    @ManyToMany(cascade = { CascadeType.PERSIST, CascadeType.MERGE }, fetch = FetchType.EAGER)
    @JoinTable(name = "album_video", joinColumns = { @JoinColumn(name = "album_id", referencedColumnName = "id") }, inverseJoinColumns = {
        @JoinColumn(name = "video_id", referencedColumnName = "id") })
    private List<Video> videos;

    @ManyToOne
    private User user;

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public List<Video> getVideos() {
        return videos;
    }

    public void setVideos(List<Video> videos) {
        this.videos = videos;
    }

    public User getUser() {
        return user;
    }

    public void setUser(User user) {
        this.user = user;
    }

    @Override
    public String toString() {
        return "Album [name=" + name + ", videos=" + videos + ", user=" + user + "]";
    }

}
