
package com.lftechnology.library.resource;

import java.util.ArrayList;
import java.util.List;

import javax.ejb.Stateless;
import javax.inject.Inject;
import javax.validation.Valid;
import javax.ws.rs.Consumes;
import javax.ws.rs.GET;
import javax.ws.rs.POST;
import javax.ws.rs.Path;
import javax.ws.rs.PathParam;
import javax.ws.rs.Produces;
import javax.ws.rs.core.MediaType;
import javax.ws.rs.core.Response;
import javax.ws.rs.core.Response.Status;

import org.apache.logging.log4j.Logger;

import com.lftechnology.library.dao.AlbumDAO;
import com.lftechnology.library.model.Album;
import com.lftechnology.library.model.Video;
import com.lftechnology.library.pojo.AuthenticatedUserWrapper;
import com.lftechnology.library.producer.AuthenticatedUser;
import com.lftechnology.library.producer.Secured;

@Path("album")
@Stateless
public class AlbumResource {

    @Inject
    private AlbumDAO albumDAO;

    @Inject
    private Logger logger;

    @Inject
    @AuthenticatedUser
    private AuthenticatedUserWrapper authenticatedUserWrapper;

    @Secured
    @GET
    @Produces(MediaType.APPLICATION_JSON)
    public Response getAll() {
        logger.debug("Inside AlbumResource#getAll method.");
        List<Album> albums = this.albumDAO.findAll();
        if (albums == null) {
            albums = new ArrayList<>();
        }
        return Response.ok(albums).build();
    }

    @Secured
    @POST
    @Produces(MediaType.APPLICATION_JSON)
    @Path("/{id}")
    public Response getById(@PathParam("id") String albumId) {
        logger.debug("Inside AlbumResource#getById method. id is: {}", albumId);
        long id = Long.parseLong(albumId);
        Album album = this.albumDAO.findById(id);
        if (album == null) {
            album = new Album();
        }
        return Response.ok(album).build();
    }

    @Secured
    @POST
    @Consumes(MediaType.APPLICATION_JSON)
    @Produces(MediaType.APPLICATION_JSON)
    public Response save(@Valid Album album) {
        logger.debug("Inside AlbumResource#save method. album to be saved is: {}", album);
        album = this.albumDAO.save(album);
        return Response.ok(album).build();
    }

    @POST
    @Secured
    @Consumes(MediaType.APPLICATION_JSON)
    @Produces(MediaType.APPLICATION_JSON)
    @Path("/video/{id}")
    public Response saveVideo(@Valid Video video, @PathParam("id") String albumId) {
        logger.debug("Inside AlbumResource#saveVideo method. video is: {}", video);
        if (albumId != null) {
            long id = Long.parseLong(albumId);
            Album savedAlbum = this.albumDAO.saveVideo(video, id);
            return Response.ok(savedAlbum).build();
        }
        return Response.status(Status.BAD_REQUEST).build();
    }

}
