
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

    @Column(name = "video_id", nullable = false)
    private String videoId;

    @Column(name = "frame_height")
    private Integer frameHeight;

    @Column(name = "frame_width")
    private Integer frameWidth;

    @Column(name = "duration")
    private Float duration;

    @Column(name = "name")
    private String name;

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

    @Override
    public String toString() {
        return "Video [url=" + url + ", videoId=" + videoId + ", frameHeight=" + frameHeight + ", frameWidth=" + frameWidth + ", getId()=" +
            getId() + "]";
    }

}
