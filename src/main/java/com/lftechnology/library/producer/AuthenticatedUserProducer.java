
package com.lftechnology.library.producer;

import javax.enterprise.context.RequestScoped;
import javax.enterprise.event.Observes;
import javax.enterprise.inject.Produces;

import com.lftechnology.library.model.User;

@RequestScoped
public class AuthenticatedUserProducer {

    @Produces
    @RequestScoped
    @AuthenticatedUser
    private User authenticatedUser;

    public void handleAuthenticationEvent(@Observes @AuthenticatedUser String userName) {
        // this.authenticatedUser=findUserByUserName(userName);
    }
}
