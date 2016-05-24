
package com.lftechnology.library.service;

import java.util.List;

import javax.ejb.Stateless;
import javax.inject.Inject;
import javax.persistence.EntityManager;

import com.lftechnology.library.dao.UserDAO;
import com.lftechnology.library.dao.VideoDAO;
import com.lftechnology.library.model.Video;
import com.lftechnology.library.pojo.AuthenticatedUserWrapper;
import com.lftechnology.library.producer.AuthenticatedUser;

@Stateless
public class VideoServiceImpl implements VideoDAO {

    @Inject
    private EntityManager entityManager;

    @Inject
    @AuthenticatedUser
    private AuthenticatedUserWrapper authenticatedUserWrapper;

    @Inject
    private UserDAO userDAO;

    @Override
    public List<Video> findAll() {
        return this.entityManager.createQuery("Select v from Video v where v.active=?1", Video.class).setParameter(1, true).getResultList();
    }

    @Override
    public Video findById(Long id) {
        return this.entityManager.find(Video.class, id);
    }

    @Override
    public Video save(Video object) {
        this.entityManager.persist(object);
        this.entityManager.flush();
        return object;
    }

    @Override
    public void delete(Long id) {
        this.entityManager.remove(this.findById(id));
    }

    @Override
    public Video update(Video t) {
        Video video = this.entityManager.merge(t);
        return video;
    }

}
