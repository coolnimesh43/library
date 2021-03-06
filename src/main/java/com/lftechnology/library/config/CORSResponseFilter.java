
package com.lftechnology.library.config;

import java.util.List;

import javax.inject.Inject;
import javax.ws.rs.container.ContainerRequestContext;
import javax.ws.rs.container.ContainerResponseContext;
import javax.ws.rs.container.ContainerResponseFilter;
import javax.ws.rs.core.HttpHeaders;
import javax.ws.rs.core.MultivaluedMap;
import javax.ws.rs.ext.Provider;

import org.apache.logging.log4j.Logger;

@Provider
public class CORSResponseFilter implements ContainerResponseFilter {

    public static final String ALLOWED_METHODS = "GET, POST, PUT, DELETE, OPTIONS, HEAD";
    public final static int MAX_AGE = 42 * 60 * 60;
    public final static String DEFAULT_ALLOWED_HEADERS = "origin,accept,content-type";

    @Inject
    private Logger logger;

    @Override
    public void filter(ContainerRequestContext requestContext, ContainerResponseContext responseContext) {
        logger.debug(
            "Auth header: {} Request: {} Response: ", requestContext.getHeaderString(HttpHeaders.AUTHORIZATION), requestContext,
            responseContext);
        try {
            final MultivaluedMap<String, Object> headers = responseContext.getHeaders();
            headers.add("Access-Control-Allow-Origin", "*");
            headers.add("Access-Control-Allow-Headers", getRequestedHeaders(requestContext));
            headers.add("Access-Control-Allow-Credentials", "true");
            headers.add("Access-Control-Allow-Methods", ALLOWED_METHODS);
            headers.add("Access-Control-Max-Age", MAX_AGE);
            headers.add("x-responded-by", "cors-response-filter");
        }
        catch (Exception e) {
            logger.error("Exception inside CORSResponseFilter#filter method. Exception is: {}", e);
        }
    }

    String getRequestedHeaders(ContainerRequestContext responseContext) {
        List<String> headers = responseContext.getHeaders().get("Access-Control-Request-Headers");
        return createHeaderList(headers);
    }

    String createHeaderList(List<String> headers) {
        if (headers == null || headers.isEmpty()) {
            return DEFAULT_ALLOWED_HEADERS;
        }
        StringBuilder retVal = new StringBuilder();
        for (int i = 0; i < headers.size(); i++) {
            String header = headers.get(i);
            retVal.append(header);
            retVal.append(',');
        }
        retVal.append(DEFAULT_ALLOWED_HEADERS);
        return retVal.toString();
    }

}
