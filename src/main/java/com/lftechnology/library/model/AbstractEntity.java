
package com.lftechnology.library.model;

import java.io.Serializable;
import java.time.LocalDateTime;

import javax.persistence.Column;
import javax.persistence.Convert;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.MappedSuperclass;
import javax.persistence.PrePersist;
import javax.persistence.PreUpdate;

import com.fasterxml.jackson.databind.annotation.JsonSerialize;
import com.lftechnology.library.util.LocalDateAttributeConverter;
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
    @Convert(converter = LocalDateAttributeConverter.class)
    @JsonSerialize(using = LocalDateTimeSerializer.class)
    private LocalDateTime createdDate;

    @Column(name = "last_modified_last")
    @Convert(converter = LocalDateAttributeConverter.class)
    @JsonSerialize(using = LocalDateTimeSerializer.class)
    private LocalDateTime lastModifiedDate;

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

    public LocalDateTime getCreatedDate() {
        return createdDate;
    }

    public void setCreatedDate(LocalDateTime createdDate) {
        this.createdDate = createdDate;
    }

    public LocalDateTime getLastModifiedDate() {
        return lastModifiedDate;
    }

    public void setLastModifiedDate(LocalDateTime lastModifiedDate) {
        this.lastModifiedDate = lastModifiedDate;
    }

    @PrePersist
    public void prePersist() {
        this.setCreatedBy(1L);
        this.setLastModifiedBy(1L);
        this.setCreatedDate(LocalDateTime.now());
    }

    @PreUpdate
    public void preUpdate() {
        this.setLastModifiedBy(1L);
        this.setLastModifiedDate(LocalDateTime.now());
    }

}
