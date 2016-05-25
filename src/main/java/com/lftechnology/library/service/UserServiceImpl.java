
package com.lftechnology.library.service;

import java.util.List;

import javax.ejb.Stateless;
import javax.inject.Inject;
import javax.persistence.EntityManager;
import javax.transaction.Transactional;

import org.apache.logging.log4j.Logger;

import com.lftechnology.library.dao.UserDAO;
import com.lftechnology.library.model.User;

@Transactional
@Stateless
public class UserServiceImpl implements UserDAO {

    @Inject
    private EntityManager entityManager;

    @Inject
    private Logger logger;

    @Override
    public List<User> findAll() {
        try {
            return this.entityManager.createQuery("Select user from User user where user.active=?", User.class).setParameter(
                1, true).getResultList();
        }
        catch (Exception e) {
            logger.debug("Inside VideoServieImpl while getting all users. Exception is: {}", e);
            return null;
        }
    }

    @Override
    public User findById(Long id) {
        try {
            return this.entityManager.find(User.class, id);
        }
        catch (Exception e) {
            logger.debug("Inside VideoServieImpl while finding user by id. Exception is: {}", e);
            return null;
        }
    }

    @Override
    public User save(User object) {
        try {
            this.entityManager.persist(object);
            this.entityManager.flush();
            return object;
        }
        catch (Exception e) {
            logger.debug("Inside VideoServieImpl while saving user. Exception is: {}", e);
            return null;
        }
    }

    @Override
    public void delete(Long id) {
        try {
            this.entityManager.remove(this.findById(id));
        }
        catch (Exception e) {
            logger.debug("Inside VideoServieImpl while deleting user. Exception is: {}", e);
        }
    }

    @Override
    public User findByemailAndPassword(String email, String password) {
        try {
            return (User) this.entityManager.createQuery("Select u from User u where u.email=?1 and u.password=?2").setParameter(
                1, email).setParameter(2, password).getSingleResult();
        }
        catch (Exception e) {
            return null;
        }
    }

    @Override
    public User update(User user) {
        logger.debug("Inside UserServiceImpl#update method. Request to update user: {}", user);
        try {
            User updatedUser = this.entityManager.merge(user);
            return updatedUser;
        }
        catch (Exception e) {
            logger.error("Inside VideoServieImpl while updating user. Exception is: {}", e);
            return null;
        }
    }

    @Override
    public User findByUserName(String userName) {
        logger.debug("Inside UserServiceImpl#findByUserName method. User name is: {}", userName);
        try {
            return (User) this.entityManager.createQuery("Select u from User u where u.userName =?1").setParameter(
                1, userName).getSingleResult();
        }
        catch (Exception e) {
            logger.error("Inside UserServiceImpl#findByUserName method. Exception is:{}", e);
            return null;
        }
    }

    @Override
    public User findByEmail(String email) {
        logger.debug("Inside UserServiceImpl#findByEmail method. User name is: {}", email);
        try {
            return (User) this.entityManager.createQuery("Select u from User u where u.email =?1").setParameter(1, email).getSingleResult();
        }
        catch (Exception e) {
            logger.error("Inside UserServiceImpl#findByEmailethod. Exception is:{}", e);
            return null;
        }
    }

}
