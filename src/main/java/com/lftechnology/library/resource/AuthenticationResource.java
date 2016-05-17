
package com.lftechnology.library.resource;

import javax.inject.Inject;
import javax.ws.rs.Consumes;
import javax.ws.rs.FormParam;
import javax.ws.rs.POST;
import javax.ws.rs.Path;
import javax.ws.rs.Produces;
import javax.ws.rs.core.MediaType;
import javax.ws.rs.core.Response;

import org.apache.logging.log4j.Logger;

@Path("authentication")
public class AuthenticationResource {

    @Inject
    private Logger logger;

    @POST
    @Produces(MediaType.APPLICATION_JSON)
    @Consumes(MediaType.APPLICATION_FORM_URLENCODED)
    public Response authenticateUser(@FormParam("userName") String userName, @FormParam("password") String password) {
        logger.debug("Inside AuthenticationResource#authenticateUser method. userName is: {} and password is: {}", userName, password);
        try {
            // authenticate(userName,password);
            // String token=issueToken(userName);
            // return Response.ok(token).build();
        }
        catch (Exception e) {
            // return Response.status(Status.UNAUTHORIZED).build();
        }
        return Response.ok().build();
    }
}
