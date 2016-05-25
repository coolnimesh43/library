
package com.lftechnology.library.service;

import java.util.List;

import javax.ejb.Stateless;
import javax.inject.Inject;
import javax.persistence.EntityManager;
import javax.transaction.Transactional;

import org.apache.logging.log4j.Logger;

import com.lftechnology.library.dao.AlbumDAO;
import com.lftechnology.library.dao.UserDAO;
import com.lftechnology.library.dao.VideoDAO;
import com.lftechnology.library.model.Album;
import com.lftechnology.library.model.User;
import com.lftechnology.library.model.Video;
import com.lftechnology.library.pojo.AuthenticatedUserWrapper;
import com.lftechnology.library.producer.AuthenticatedUser;

@Transactional
@Stateless
public class AlbumServiceImpl implements AlbumDAO {

    @Inject
    private EntityManager entityManager;

    @Inject
    private Logger logger;

    @Inject
    private VideoDAO videoDAO;

    @Inject
    @AuthenticatedUser
    private AuthenticatedUserWrapper authenticatedUserWrapper;

    @Inject
    private UserDAO userDAO;

    @Override
    public List<Album> findAll() {
        List<Album> albums = null;
        try {
            albums = this.entityManager.createQuery("Select album from Album album").getResultList();
        }
        catch (Exception e) {
            logger.error("Error inside AlbumServiceImpl while getting all albums. Exception is: {]", e);
        }
        return albums;
    }

    @Override
    public Album findById(Long id) {
        Album album = null;
        try {
            album = this.entityManager.find(Album.class, id);
        }
        catch (Exception e) {
            logger.error("Error inside AlbumServiceImpl while finding album by id. Exception is: {}", e);
        }
        return album;
    }

    @Override
    public Album save(Album object) {
        Album savedAlbum = null;
        try {
            User user = this.authenticatedUserWrapper.getUser();
            this.entityManager.persist(object);
            savedAlbum = object;
            user.getAlbums().add(savedAlbum);
            this.userDAO.update(user);
            this.entityManager.flush();
        }
        catch (Exception e) {
            logger.error("Error inside AlbumServiceImpl while saving album. Exception is: {}", e);
        }
        return savedAlbum;
    }

    @Override
    public void delete(Long id) {
        try {
            this.entityManager.remove(this.findById(id));
        }
        catch (Exception e) {
            logger.error("Error inside AlbumServiceImpl while deleting album. Exception is: {}", e);
        }

    }

    @Override
    public Album update(Album t) {
        Album updatedAlbum = null;
        try {
            updatedAlbum = this.entityManager.merge(t);
        }
        catch (Exception e) {
            logger.error("Error inside AlbumServiceImpl while updating album. Exception is: {}", e);
        }
        return updatedAlbum;
    }

    @Override
    public Album saveVideo(Video video, Long albumId) {
        try {
            Album album = this.findById(albumId);
            video = this.videoDAO.save(video);
            album.getVideos().add(video);
            album = this.update(album);
            return album;
        }
        catch (Exception e) {
            logger.error("Inside AlbumServiceImpl while saving video. Exception is: {}", e);
            return null;
        }
    }

}
