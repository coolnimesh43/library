
package com.lftechnology.library.producer;

import javax.ejb.Stateless;
import javax.enterprise.inject.Produces;
import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;

/**
 * Producer class to create injectable {@link EntityManager}
 * 
 * @author nimesh
 */
@Stateless
public class EntityManagerProducer {

    @PersistenceContext(unitName = "library-persistent-unit")
    private EntityManager entityManager;

    @Produces
    public EntityManager entityManager() {
        return this.entityManager;
    }
}
