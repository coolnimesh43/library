
package com.lftechnology.library.service;

import java.util.List;

import javax.ejb.Stateless;
import javax.inject.Inject;
import javax.persistence.EntityManager;
import javax.transaction.Transactional;

import org.apache.logging.log4j.Logger;

import com.lftechnology.library.dao.UserTokenDAO;
import com.lftechnology.library.model.UserToken;

@Transactional
@Stateless
public class UserTokenServiceImpl implements UserTokenDAO {

    @Inject
    private EntityManager entityManager;

    @Inject
    private Logger logger;

    @Override
    public List<UserToken> findAll() {

        logger.debug("Inside UserTokenServiceImpl#findAll method.");
        return this.entityManager.createQuery("Select uToken from UserToken uToken").getResultList();
    }

    @Override
    public UserToken findById(Long id) {

        logger.debug("Inside UserTokenServiceImpl#findById method. Id is: {}", id);
        return this.entityManager.find(UserToken.class, id);
    }

    @Override
    public UserToken save(UserToken object) {

        logger.debug("Inside UserTokenServiceImpl#save method. user token is: {}", object);
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

        this.entityManager.remove(this.findById(id));
        this.entityManager.flush();
    }

    @Override
    public UserToken findByRefreshToken(String refreshToken) {
        return (UserToken) this.entityManager.createQuery("Select uToken from UserToken uToken where uToken.refreshToken=?1").setParameter(
            1, refreshToken).getSingleResult();
    }

    @Override
    public UserToken findByAccessToken(String accessToken) {
        return (UserToken) this.entityManager.createQuery("Select uToken from UserToken uToken where uToken.accessToken=?1").setParameter(
            1, accessToken).getSingleResult();
    }

}
