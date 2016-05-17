
package com.lftechnology.library.dao;

import com.lftechnology.library.model.User;

public interface UserDAO extends GenericDAO<User, Long> {

    User findByemailAndPassword(String email, String password);

}
