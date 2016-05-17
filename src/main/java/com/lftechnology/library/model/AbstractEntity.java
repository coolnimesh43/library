
package com.lftechnology.library.model;

import java.io.Serializable;

import javax.persistence.Column;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.MappedSuperclass;
import javax.persistence.PrePersist;
import javax.persistence.PreUpdate;
import javax.persistence.Temporal;
import javax.persistence.TemporalType;

import org.joda.time.DateTime;

import com.fasterxml.jackson.databind.annotation.JsonSerialize;
import com.lftechnology.library.util.LocalDateTimeSerializer;

@MappedSuperclass
public class AbstractEntity implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    @Column(name = "id")
    private Long id;

    @Column(name = "created_by", nullable = false)
    private Long createdBy;

    @Column(name = "last_modified_by", nullable = false)
    private Long lastModifiedBy;

    @Column(name = "created_date")
    @Temporal(TemporalType.TIMESTAMP)
    @JsonSerialize(using = LocalDateTimeSerializer.class)
    private DateTime createdDate;

    @Column(name = "last_modified_last")
    @Temporal(TemporalType.TIMESTAMP)
    @JsonSerialize(using = LocalDateTimeSerializer.class)
    private DateTime lastModifiedDate;

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Long getCreatedBy() {
        return createdBy;
    }

    public void setCreatedBy(Long createdBy) {
        this.createdBy = createdBy;
    }

    public Long getLastModifiedBy() {
        return lastModifiedBy;
    }

    public void setLastModifiedBy(Long lastModifiedBy) {
        this.lastModifiedBy = lastModifiedBy;
    }

    public DateTime getCreatedDate() {
        return createdDate;
    }

    public void setCreatedDate(DateTime createdDate) {
        this.createdDate = createdDate;
    }

    public DateTime getLastModifiedDate() {
        return lastModifiedDate;
    }

    public void setLastModifiedDate(DateTime lastModifiedDate) {
        this.lastModifiedDate = lastModifiedDate;
    }

    @PrePersist
    public void prePersist() {
        this.setCreatedBy(1L);
        this.setLastModifiedBy(1L);
        this.setCreatedDate(new DateTime());
    }

    @PreUpdate
    public void preUpdate() {
        this.setLastModifiedBy(1L);
        this.setLastModifiedDate(new DateTime());
    }

}
