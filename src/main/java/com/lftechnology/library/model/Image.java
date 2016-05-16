
package com.lftechnology.library.model;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Table;

@Entity
@Table(name = "image")
public class Image extends AbstractEntity {

    @Column(name = "url", nullable = false)
    private String url;

    @Column(name = "width")
    private Short width;

    @Column(name = "height")
    private Short height;

    public String getUrl() {
        return url;
    }

    public void setUrl(String url) {
        this.url = url;
    }

    public Short getWidth() {
        return width;
    }

    public void setWidth(Short width) {
        this.width = width;
    }

    public Short getHeight() {
        return height;
    }

    public void setHeight(Short height) {
        this.height = height;
    }

    @Override
    public String toString() {
        return "Image [url=" + url + ", width=" + width + ", height=" + height + ", getId()=" + getId() + "]";
    }

}
