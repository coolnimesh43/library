
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

import org.apache.logging.log4j.Logger;

import com.auth0.jwt.internal.org.apache.commons.codec.digest.DigestUtils;
import com.lftechnology.library.config.ConfigurationProperties;
import com.lftechnology.library.dao.UserDAO;
import com.lftechnology.library.model.User;
import com.lftechnology.library.producer.Secured;

@Path("user")
public class UserResource {

    @Inject
    private UserDAO userDAO;

    @Inject
    private transient Logger logger;

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
        return this.userDAO.findById(Long.valueOf(userId));
    }

    @GET
    @Produces(MediaType.APPLICATION_JSON)
    @Secured
    public List<User> getAll() {
        logger.debug("Inside UserResource#getAll method.");
        return this.userDAO.findAll();
    }
}
