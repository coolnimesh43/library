
package com.lftechnology.library.model;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Table;

@Entity
@Table(name = "video")
public class Video extends AbstractEntity {

    private static final long serialVersionUID = 1L;

    @Column(name = "url", nullable = false, unique = true)
    private String url;

    @Column(name = "video_id")
    private String videoId;

    @Column(name = "frame_height")
    private Integer frameHeight;

    @Column(name = "frame_width")
    private Integer frameWidth;

    @Column(name = "duration")
    private Float duration;

    @Column(name = "name")
    private String name;

    @Column(name = "active", nullable = false)
    private Boolean active = Boolean.TRUE;

    @Column(name = "shared", nullable = false)
    private Boolean shared = Boolean.TRUE;

    public Video() {
    }

    public Video(VideoBuilder builder) {
        this.url = builder.url;
        this.videoId = builder.videoId;
        this.frameHeight = builder.frameHeight;
        this.frameWidth = builder.frameWidth;
        this.duration = builder.duration;
        this.active = builder.active;
        this.name = builder.name;
        this.shared = builder.shared;
    }

    public String getUrl() {
        return url;
    }

    public void setUrl(String url) {
        this.url = url;
    }

    public String getVideoId() {
        return videoId;
    }

    public void setVideoId(String videoId) {
        this.videoId = videoId;
    }

    public Integer getFrameHeight() {
        return frameHeight;
    }

    public void setFrameHeight(Integer frameHeight) {
        this.frameHeight = frameHeight;
    }

    public Integer getFrameWidth() {
        return frameWidth;
    }

    public void setFrameWidth(Integer frameWidth) {
        this.frameWidth = frameWidth;
    }

    public Float getDuration() {
        return duration;
    }

    public void setDuration(Float duration) {
        this.duration = duration;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public Boolean getActive() {
        return active;
    }

    public void setActive(Boolean active) {
        this.active = active;
    }

    public Boolean getShared() {
        return shared;
    }

    public void setShared(Boolean shared) {
        this.shared = shared;
    }

    @Override
    public String toString() {
        return "Video [url=" + url + ", videoId=" + videoId + ", frameHeight=" + frameHeight + ", frameWidth=" + frameWidth +
            ", duration=" + duration + ", name=" + name + ", active=" + active + ", getId()=" + getId() + ", shared" + shared + "]";
    }

    public static class VideoBuilder {

        private String url;
        private String videoId;
        private Integer frameHeight;
        private Integer frameWidth;
        private Float duration;
        private String name;
        private Boolean active = Boolean.TRUE;
        private Boolean shared = Boolean.TRUE;

        public VideoBuilder(String url, String videoId, Boolean active) {
            super();
            this.url = url;
            this.videoId = videoId;
            this.active = active;
        }

        public VideoBuilder frameHeight(Integer frameHeight) {
            this.frameHeight = frameHeight;
            return this;
        }

        public VideoBuilder frameWidth(Integer frameWidth) {
            this.frameWidth = frameWidth;
            return this;
        }

        public VideoBuilder duration(Float duration) {
            this.duration = duration;
            return this;
        }

        public VideoBuilder name(String name) {
            this.name = name;
            return this;
        }

        public VideoBuilder shared(Boolean shared) {
            this.shared = shared;
            return this;
        }

        public Video build() {
            return new Video(this);
        }
    }
}
