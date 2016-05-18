
package com.lftechnology.library.util;

import java.io.IOException;
import java.time.LocalDateTime;

import javax.inject.Named;

import com.fasterxml.jackson.core.JsonGenerator;
import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.JsonSerializer;
import com.fasterxml.jackson.databind.SerializerProvider;

@Named
public class LocalDateTimeSerializer extends JsonSerializer<LocalDateTime> {

    @Override
    public void serialize(LocalDateTime arg0, JsonGenerator arg1, SerializerProvider arg2)
        throws IOException, JsonProcessingException {
        String dateAsString = DateUtil.formatDateToSqlDateString(arg0);
        arg1.writeString(dateAsString);
    }

}
