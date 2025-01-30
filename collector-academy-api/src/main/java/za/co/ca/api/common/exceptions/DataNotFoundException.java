package za.co.ca.api.common.exceptions;

/**
 * @author Hanno Seegers
 */
public class DataNotFoundException extends RuntimeException {
    public DataNotFoundException(String message) {
        super(message);
    }
}
