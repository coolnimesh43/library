
package com.lftechnology.library.resource;

import javax.ejb.Stateless;
import javax.inject.Inject;
import javax.ws.rs.Consumes;
import javax.ws.rs.POST;
import javax.ws.rs.Path;
import javax.ws.rs.Produces;
import javax.ws.rs.core.MediaType;
import javax.ws.rs.core.Response;
import javax.ws.rs.core.Response.Status;

import org.apache.logging.log4j.Logger;

import com.lftechnology.library.exception.InvalidAccessTokenException;
import com.lftechnology.library.pojo.LoginPOJO;
import com.lftechnology.library.pojo.Token;
import com.lftechnology.library.service.AuthenticationService;

@Path("auth")
@Stateless
public class AuthenticationResource {

    @Inject
    private Logger logger;

    @Inject
    private AuthenticationService authenticationService;

    @POST
    @Produces(MediaType.APPLICATION_JSON)
    @Consumes(MediaType.APPLICATION_JSON)
    @Path("login")
    public Response authenticateUser(LoginPOJO loginPojo) {
        logger.debug("Inside AuthenticationResource#authenticateUser method. login pojo is: {}", loginPojo);
        try {
            Token token = this.authenticationService.authenticate(loginPojo);
            return Response.ok(token).build();
        }
        catch (Exception e) {
            logger.error("Inside AuthenticationResource#authenticateUser method. Excpetion is: {}", e);
            return Response.status(Status.UNAUTHORIZED).build();
        }
    }

    @POST
    @Produces(MediaType.APPLICATION_JSON)
    @Consumes(MediaType.APPLICATION_JSON)
    @Path("logout")
    public Response logout(Token token) {
        logger.debug("Inside AuthenticationResource#authenticateUser method.Token is: {}", token);
        try {
            this.authenticationService.logout(token);
            return Response.ok().build();
        }
        catch (InvalidAccessTokenException e) {
            logger.error("Inside AuthentiationResource#logout method. Exception is: {}", e);
            return Response.status(Status.UNAUTHORIZED).build();
        }
        catch (Exception e) {
            logger.error("Inside AuthentiationResource#logout method. Exception is: {}", e);
            return Response.status(Status.UNAUTHORIZED).build();
        }
    }
}
