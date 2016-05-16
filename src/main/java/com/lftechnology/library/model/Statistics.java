
package com.lftechnology.library.model;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Table;

@Entity
@Table(name = "statistics")
public class Statistics extends AbstractEntity {

    @Column(name = "view_count")
    private long viewCount;

    @Column(name = "like_count")
    private long likeCount;

    @Column(name = "dislike_count")
    private long dislikeCount;

    public long getViewCount() {
        return viewCount;
    }

    public void setViewCount(long viewCount) {
        this.viewCount = viewCount;
    }

    public long getLikeCount() {
        return likeCount;
    }

    public void setLikeCount(long likeCount) {
        this.likeCount = likeCount;
    }

    public long getDislikeCount() {
        return dislikeCount;
    }

    public void setDislikeCount(long dislikeCount) {
        this.dislikeCount = dislikeCount;
    }

    @Override
    public String toString() {
        return "Statistics [viewCount=" + viewCount + ", likeCount=" + likeCount + ", dislikeCount=" + dislikeCount + ", getId()=" +
            getId() + "]";
    }

}
