
package com.lftechnology.library.service;

import java.util.List;

import javax.ejb.Singleton;
import javax.inject.Inject;
import javax.persistence.EntityManager;
import javax.transaction.Transactional;

import org.apache.logging.log4j.Logger;

import com.lftechnology.library.dao.UserRoleDAO;
import com.lftechnology.library.model.User;
import com.lftechnology.library.model.UserRole;

@Transactional
@Singleton
public class UserRoleServiceImpl implements UserRoleDAO {

    @Inject
    private EntityManager entityManager;

    @Inject
    private Logger logger;

    @SuppressWarnings("unchecked")
    @Override
    public List<UserRole> findAll() {
        logger.debug("Inside UserRoleService#findAll method.");
        return this.entityManager.createQuery("Select uRole from UserRole uRole").getResultList();
    }

    @Override
    public UserRole findById(Long id) {
        logger.debug("Inside UserRoleServiceImpl#findById method. id is: []", id);
        return this.entityManager.find(UserRole.class, id);
    }

    @Override
    public UserRole save(UserRole object) {
        logger.debug("Inside UserRoleServiceImpl#save method. UserRole to be saved is: {}", object);
        try {
            this.entityManager.persist(object);
            this.entityManager.flush();
            return object;
        }
        catch (Exception e) {
            return null;
        }
    }

    @Override
    public void delete(Long id) {
        logger.debug("Inside UserRoleServiceImpl#delete method. primary key is: {}", id);
        this.entityManager.remove(this.findById(id));
        this.entityManager.flush();
    }

    @Override
    public List<UserRole> findByUser(User user) {
        logger.debug("Inside UserRoleServiceImpl#findByUser method. User is: {}", user);
        if (user != null) {
            return this.entityManager.createQuery("Select uRole from UserRole uRole where uRole.user.id=?1").setParameter(
                1, user.getId()).getResultList();
        }
        return null;
    }

    @Override
    public UserRole update(UserRole t) {
        UserRole userRole = this.entityManager.merge(t);
        return userRole;
    }

}
