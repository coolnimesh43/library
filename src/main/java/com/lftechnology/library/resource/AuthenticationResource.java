
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
}
