package za.co.ca.api.common.exceptions;

import com.fasterxml.jackson.core.JsonProcessingException;

/**
 * @author Hanno Seegers
 */
public class CommunicationFailureException extends RuntimeException {
    public CommunicationFailureException(String message) {
        super(message);
    }
}
