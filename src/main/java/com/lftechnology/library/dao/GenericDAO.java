
package com.lftechnology.library.dao;

import java.util.List;

/**
 * The generic interface for the Entity DAOs.
 * 
 * @author nimesh
 * @param <T>
 *            The Class type of the entity.
 * @param <R>
 *            The type of the entity's primary key.
 */
public interface GenericDAO<T, R> {

    /**
     * Method to find all Entity.
     * 
     * @author nimesh
     * @return {@link List} of found entity.
     */
    List<T> findAll();

    /**
     * Method to find entity by enity's primary key.
     * 
     * @author nimesh
     * @param id
     *            The primary key of the entity.
     * @return The found Entity.
     */
    T findById(R id);

    /**
     * The method to save/update an entity.
     * 
     * @author nimesh
     * @param object
     *            The entity to be saved/updated.
     * @return The saved/updated entity
     */
    T save(T object);

    /**
     * Method to delete an entity using its primary key.
     * 
     * @author nimesh
     * @param id
     *            The primary key of the entity to be deleted.
     */
    void delete(R id);
}
