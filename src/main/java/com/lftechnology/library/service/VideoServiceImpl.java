
package com.lftechnology.library.service;

import java.util.List;

import javax.ejb.Stateless;
import javax.inject.Inject;
import javax.persistence.EntityManager;

import com.lftechnology.library.dao.VideoDAO;
import com.lftechnology.library.model.Video;

@Stateless
public class VideoServiceImpl implements VideoDAO {

    @Inject
    private EntityManager entityManager;

    public List<Video> findAll() {
        return this.entityManager.createQuery("Select v from Video v where v.active=1?", Video.class).setParameter(1, true).getResultList();
    }

    public Video findById(Long id) {
        return this.entityManager.find(Video.class, id);
    }

    public Video save(Video object) {
        this.entityManager.persist(object);
        this.entityManager.flush();
        return object;
    }

    public void delete(Long id) {
        this.entityManager.remove(this.findById(id));
    }

}
