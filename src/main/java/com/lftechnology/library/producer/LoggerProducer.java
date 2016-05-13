
package com.lftechnology.library.producer;

import javax.ejb.Stateless;
import javax.enterprise.inject.Produces;
import javax.enterprise.inject.spi.InjectionPoint;

import org.apache.logging.log4j.LogManager;
import org.apache.logging.log4j.Logger;

/**
 * Producer class to create injectable {@link Logger}
 * 
 * @author nimesh
 */
@Stateless
public class LoggerProducer {

    @Produces
    public Logger logger(InjectionPoint injectionPoint) {
        return LogManager.getLogger(injectionPoint.getMember().getDeclaringClass().getName());
    }
}
