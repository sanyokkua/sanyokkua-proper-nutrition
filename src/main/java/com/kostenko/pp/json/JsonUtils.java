package com.kostenko.pp.json;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.core.type.TypeReference;
import com.fasterxml.jackson.databind.ObjectMapper;
import lombok.extern.slf4j.Slf4j;

import java.io.IOException;

@Slf4j
class JsonUtils {
    private final static ObjectMapper OBJECT_MAPPER = new ObjectMapper();

    static String writeObjectAsString(Object object) {
        String resultJson = "";
        try {
            resultJson = OBJECT_MAPPER.writeValueAsString(object);
        } catch (JsonProcessingException e) {
            log.warn("Problem with converting object to json string", e);
        }
        return resultJson;
    }

    static <T> T readListWithType(String jsonList, TypeReference<T> typeReference) {
        T result = null;
        try {
            result = OBJECT_MAPPER.readValue(jsonList, typeReference);
        } catch (IOException e) {
            log.warn("Problem with converting json string to List", e);
        }
        return result;
    }
}
