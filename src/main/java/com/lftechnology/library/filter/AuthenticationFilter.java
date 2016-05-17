
package com.lftechnology.library.filter;

import java.io.IOException;

import javax.annotation.Priority;
import javax.enterprise.event.Event;
import javax.inject.Inject;
import javax.ws.rs.NotAuthorizedException;
import javax.ws.rs.Priorities;
import javax.ws.rs.container.ContainerRequestContext;
import javax.ws.rs.container.ContainerRequestFilter;
import javax.ws.rs.core.HttpHeaders;
import javax.ws.rs.core.Response;
import javax.ws.rs.core.Response.Status;
import javax.ws.rs.ext.Provider;

import com.lftechnology.library.producer.AuthenticatedUser;
import com.lftechnology.library.producer.Secured;

@Secured
@Provider
@Priority(Priorities.AUTHENTICATION)
public class AuthenticationFilter implements ContainerRequestFilter {

    @Inject
    @AuthenticatedUser
    private Event<String> userAuthenticationEvent;

    @Override
    public void filter(ContainerRequestContext requestContext)
        throws IOException {
        String authorizationToken = requestContext.getHeaderString(HttpHeaders.AUTHORIZATION);
        if (authorizationToken == null || !authorizationToken.startsWith("Bearer")) {
            throw new NotAuthorizedException("Authorization header must be provided.");
        }
        String token = authorizationToken.substring("Bearer".length()).trim();
        try {
            // validateToken(token);
            // userAuthenticationEvent.fire(userName);
        }
        catch (Exception e) {
            requestContext.abortWith(Response.status(Status.UNAUTHORIZED).build());
        }

    }

}
