
package com.lftechnology.library.producer;

import javax.enterprise.context.RequestScoped;
import javax.enterprise.event.Observes;
import javax.enterprise.inject.Produces;

import com.lftechnology.library.model.User;
import com.lftechnology.library.pojo.AuthenticatedUserWrapper;

@RequestScoped
public class AuthenticatedUserProducer {

    @Produces
    @RequestScoped
    @AuthenticatedUser
    private AuthenticatedUserWrapper authenticatedUserWrapper;

    public void handleAuthenticationEvent(@Observes @AuthenticatedUser User user) {
        this.authenticatedUserWrapper = new AuthenticatedUserWrapper();
        this.authenticatedUserWrapper.setUser(user);
    }
}
