
package com.lftechnology.library.service;

import java.util.List;

import javax.ejb.Stateless;
import javax.inject.Inject;
import javax.persistence.EntityManager;

import org.apache.logging.log4j.Logger;

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
    private Logger logger;

    @Override
    public List<Video> findAll() {
        try {
            return this.entityManager.createQuery("Select v from Video v where v.active=?1 and v.shared=?2", Video.class).setParameter(
                1, true).setParameter(2, true).getResultList();
        }
        catch (Exception e) {
            logger.error("Inside VideoServiceImpl#findAll method while getting videos. Exception is : {}", e);
            return null;
        }
    }

    @Override
    public Video findById(Long id) {
        try {
            return this.entityManager.find(Video.class, id);
        }
        catch (Exception e) {
            logger.debug("Inside VideoServiceImpl#findById method while finding video by id. Exception is: {}", e);
            return null;
        }
    }

    @Override
    public Video save(Video object) {
        try {
            this.entityManager.persist(object);
            this.entityManager.flush();
            return object;
        }
        catch (Exception e) {
            logger.error("Inside VideoServiceImpl#save method while saving video. Exception is: {}", e);
            return null;
        }
    }

    @Override
    public void delete(Long id) {
        try {
            this.entityManager.remove(this.findById(id));
        }
        catch (Exception e) {
            logger.error("Inside VideoServiceImpl#delete method while deleting video. Exception is: {}", e);

        }
    }

    @Override
    public Video update(Video t) {
        try {
            Video video = this.entityManager.merge(t);
            return video;
        }
        catch (Exception e) {
            logger.error("Inside VideoServiceImpl#update method while updating video. Exception is: {}", e);
            return null;
        }
    }

}
