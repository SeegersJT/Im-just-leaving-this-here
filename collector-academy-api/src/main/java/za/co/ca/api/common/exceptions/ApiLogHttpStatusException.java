package za.co.ca.api.common.exceptions;

import lombok.Getter;
import org.springframework.http.HttpStatus;
import org.springframework.http.HttpStatusCode;
import org.springframework.web.client.HttpStatusCodeException;

/**
 * @author Hanno Seegers
 */
@Getter
public class ApiLogHttpStatusException extends HttpStatusCodeException {

    private final String responseBodyAsString;

    public ApiLogHttpStatusException(HttpStatusCode statusCode, String responseBodyAsString) {
        super(statusCode);
        this.responseBodyAsString = responseBodyAsString;
    }

}
