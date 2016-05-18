
package com.lftechnology.library.filter;

import java.io.IOException;
import java.util.Map;

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

import com.auth0.jwt.internal.org.apache.commons.codec.binary.Base64;
import com.lftechnology.library.model.User;
import com.lftechnology.library.producer.AuthenticatedUser;
import com.lftechnology.library.producer.Secured;
import com.lftechnology.library.service.AuthenticationService;
import com.lftechnology.library.util.WebTokenUtils;

@Secured
@Provider
@Priority(Priorities.AUTHENTICATION)
public class AuthenticationFilter implements ContainerRequestFilter {

    @Inject
    @AuthenticatedUser
    private Event<User> userAuthenticationEvent;

    @Inject
    private AuthenticationService authenticationService;

    @Override
    public void filter(ContainerRequestContext requestContext)
        throws IOException {
        String authorizationToken = requestContext.getHeaderString(HttpHeaders.AUTHORIZATION);
        if (authorizationToken == null || !authorizationToken.startsWith("Bearer")) {
            throw new NotAuthorizedException("Authorization header must be provided.");
        }
        String token = authorizationToken.substring("Bearer".length()).trim();
        try {
            Map<String, Object> payload = this.authenticationService.validateToken(token);
            String userEncodedString = payload.get(WebTokenUtils.SUB).toString();
            String userString = new String(Base64.decodeBase64(userEncodedString));
            User user = this.authenticationService.getUserFromToken(userString);
            userAuthenticationEvent.fire(user);
        }
        catch (Exception e) {
            requestContext.abortWith(Response.status(Status.UNAUTHORIZED).entity(e).build());
        }

    }

}
