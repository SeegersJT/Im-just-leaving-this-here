package za.co.ca.api.common.exceptions;

/**
 * @author Hanno Seegers
 */
public class InvalidCredentialsException extends RuntimeException {
    public InvalidCredentialsException(String message) {
        super(message);
    }
}
