
package com.lftechnology.library.resource;

import javax.inject.Inject;
import javax.ws.rs.GET;
import javax.ws.rs.Path;
import javax.ws.rs.Produces;
import javax.ws.rs.core.MediaType;

import com.lftechnology.library.dao.UserDAO;
import com.lftechnology.library.model.User;

@Path("test")
public class TestResource {

    @Inject
    private UserDAO userDao;

    @GET
    @Produces(MediaType.APPLICATION_JSON)
    public User save() {
        User user = new User.UserBuilder("coolnimesh43", "coolnimesh43@gmail.com", "nimesh").active(true).createdBy(1L).firstName(
            "Nimesh").lastName("Mishra").lastModifiedBy(1L).address("Siddhartha chow, Brt-12, Nepal").build();
        User savedUser = this.userDao.save(user);
        return savedUser;
    }
}
