
package com.lftechnology.library.service;

import java.util.List;

import javax.ejb.Singleton;
import javax.inject.Inject;
import javax.persistence.EntityManager;
import javax.transaction.Transactional;

import org.apache.logging.log4j.Logger;

import com.lftechnology.library.dao.UserDAO;
import com.lftechnology.library.model.User;

@Transactional
@Singleton
public class UserServiceImpl implements UserDAO {

    @Inject
    private EntityManager entityManager;

    @Inject
    private Logger logger;

    @Override
    public List<User> findAll() {
        return this.entityManager.createQuery("Select user from User user where user.active=?", User.class).setParameter(
            1, true).getResultList();
    }

    @Override
    public User findById(Long id) {
        return this.entityManager.find(User.class, id);
    }

    @Override
    public User save(User object) {
        this.entityManager.persist(object);
        this.entityManager.flush();
        return object;
    }

    @Override
    public void delete(Long id) {
        this.entityManager.remove(this.findById(id));
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
        User updatedUser = this.entityManager.merge(user);
        return updatedUser;
    }

}
