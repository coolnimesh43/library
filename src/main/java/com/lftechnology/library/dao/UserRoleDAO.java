
package com.lftechnology.library.dao;

import java.util.List;

import com.lftechnology.library.model.User;
import com.lftechnology.library.model.UserRole;

public interface UserRoleDAO extends GenericDAO<UserRole, Long> {

    List<UserRole> findByUser(User user);
}
