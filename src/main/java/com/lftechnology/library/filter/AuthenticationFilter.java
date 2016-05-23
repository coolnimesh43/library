
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

import org.apache.logging.log4j.Logger;

import com.auth0.jwt.internal.org.apache.commons.codec.binary.Base64;
import com.lftechnology.library.model.User;
import com.lftechnology.library.pojo.Token;
import com.lftechnology.library.producer.AuthenticatedUser;
import com.lftechnology.library.producer.Secured;
import com.lftechnology.library.service.AuthenticationService;
import com.lftechnology.library.util.ObjectMapperFactory;
import com.lftechnology.library.util.WebTokenUtils;

@Secured
@Provider
@Priority(Priorities.AUTHENTICATION)
public class AuthenticationFilter implements ContainerRequestFilter {

    @Inject
    @AuthenticatedUser
    private Event<User> userAuthenticationEvent;

    @Inject
    private Logger logger;

    @Inject
    private AuthenticationService authenticationService;

    @Override
    public void filter(ContainerRequestContext requestContext)
        throws IOException {
        logger.debug("Header is: {}", requestContext.getHeaderString(HttpHeaders.AUTHORIZATION));

        String authorizationToken = requestContext.getHeaderString(HttpHeaders.AUTHORIZATION);
        if (authorizationToken == null || !authorizationToken.startsWith("Bearer")) {
            throw new NotAuthorizedException("Authorization header must be provided.");
        }

        String token = authorizationToken.substring("Bearer".length()).trim();
        Token userToken = ObjectMapperFactory.objectMapper().readValue(token, Token.class);
        try {
            Map<String, Object> payload = this.authenticationService.validateToken(userToken.getAccessToken());
            logger.debug("payload is: {}", payload);
            if (payload != null) {
                String userEncodedString = payload.get(WebTokenUtils.SUB).toString();
                String userString = new String(Base64.decodeBase64(userEncodedString));
                User user = ObjectMapperFactory.objectMapper().readValue(userString, User.class);
                logger.debug("user is: {}", user);
                userAuthenticationEvent.fire(user);
            }
            else {
                requestContext.abortWith(Response.status(Status.UNAUTHORIZED).entity("Error while validating token.").build());
            }
        }
        catch (Exception e) {
            logger.error("Exeption is: {}", e);
            requestContext.abortWith(Response.status(Status.UNAUTHORIZED).entity(e).build());
        }

    }

}
