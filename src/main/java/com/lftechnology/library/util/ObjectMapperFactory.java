
package com.lftechnology.library.util;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;

public class ObjectMapperFactory {

    private static ObjectMapper objectMapper;

    private ObjectMapperFactory() {
    }

    public static ObjectMapper objectMapper() {
        if (objectMapper == null) {
            objectMapper = new ObjectMapper();
        }
        return objectMapper;
    }

    public static String writeAsString(Object object)
        throws JsonProcessingException {
        objectMapper = objectMapper();
        return objectMapper.writeValueAsString(object);
    }
}
