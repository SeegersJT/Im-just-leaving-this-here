package za.co.ca.api.common.exceptions;

import com.fasterxml.jackson.core.JsonProcessingException;

/**
 * @author Hanno Seegers
 */
public class ApiLogJsonProcessingException extends JsonProcessingException {
    public ApiLogJsonProcessingException(String message) {
        super(message);
    }
}
