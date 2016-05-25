
package com.lftechnology.library.resource;

import java.util.List;

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

import com.auth0.jwt.internal.org.apache.commons.codec.digest.DigestUtils;
import com.lftechnology.library.config.ConfigurationProperties;
import com.lftechnology.library.dao.UserDAO;
import com.lftechnology.library.model.Album;
import com.lftechnology.library.model.User;
import com.lftechnology.library.pojo.AuthenticatedUserWrapper;
import com.lftechnology.library.producer.AuthenticatedUser;
import com.lftechnology.library.producer.Secured;

@Path("user")
public class UserResource {

    @Inject
    private UserDAO userDAO;

    @Inject
    private transient Logger logger;

    @Inject
    @AuthenticatedUser
    private AuthenticatedUserWrapper authenticatedUserWrapper;

    private String salt = ConfigurationProperties.instance().getSalt();

    @Produces(MediaType.APPLICATION_JSON)
    @Consumes(MediaType.APPLICATION_JSON)
    @POST
    public User save(@Valid User user) {
        logger.debug("Inside UserResource save method. User to be saved is: {}", user);
        String password = user.getPassword();
        String encryptedPassword = DigestUtils.shaHex((salt + password).getBytes());
        user.setPassword(encryptedPassword);
        user.setActive(Boolean.TRUE);
        return this.userDAO.save(user);
    }

    @GET
    @Produces(MediaType.APPLICATION_JSON)
    @Path("/{id}")
    @Secured
    public User get(@PathParam("id") String userId) {
        logger.debug("Inside UserResource#get method. User id is: {}", userId);
        User user = this.userDAO.findById(Long.valueOf(userId));
        logger.debug("Found user: {}", user);
        return user;
    }

    @GET
    @Produces(MediaType.APPLICATION_JSON)
    @Secured
    public List<User> getAll() {
        logger.debug("Inside UserResource#getAll method.");
        return this.userDAO.findAll();
    }

    @POST
    @Secured
    @Path("album")
    @Consumes(MediaType.APPLICATION_JSON)
    @Produces(MediaType.APPLICATION_JSON)
    public Response saveAlbum(@Valid Album album) {
        logger.debug("Inside UserResource#saveAlbum method. Album to be saved is: {}", album);
        try {
            User user = this.userDAO.findById(this.authenticatedUserWrapper.getUser().getId());
            user.getAlbums().add(album);
            user = this.userDAO.update(user);
            return Response.ok(user).build();
        }
        catch (Exception e) {
            logger.error("Inside UserResoure#saveAlbum method. Exception is: {}", e);
            return Response.status(Status.INTERNAL_SERVER_ERROR).build();
        }
    }

}
