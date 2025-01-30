package za.co.ca.api.common.exceptions;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.dao.DataIntegrityViolationException;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authorization.AuthorizationDeniedException;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;
import za.co.ca.api.authentication.payloads.responses.GeneralAPIResponse;

/**
 * @author Hanno Seegers
 */
@RestControllerAdvice
public class GlobalExceptionHandler {

    private static final Logger logger = LoggerFactory.getLogger(GlobalExceptionHandler.class);

    @ExceptionHandler(DataNotFoundException.class)
    public ResponseEntity<GeneralAPIResponse> handleDataNotFoundException(DataNotFoundException exception) {
        logger.error("Data Not Found :: {}", exception.getMessage());
        GeneralAPIResponse response = GeneralAPIResponse.builder()
                .message(exception.getMessage())
                .build();
        return new ResponseEntity<>(response, HttpStatus.NOT_FOUND);
    }

    @ExceptionHandler(InvalidCredentialsException.class)
    public ResponseEntity<GeneralAPIResponse> handleInvalidCredentialsException(InvalidCredentialsException exception) {
        logger.error("Invalid Credentials Attempt :: {}", exception.getMessage());
        GeneralAPIResponse response = GeneralAPIResponse.builder()
                .message(exception.getMessage())

                .build();
        return new ResponseEntity<>(response, HttpStatus.BAD_REQUEST);
    }

    @ExceptionHandler(CommunicationFailureException.class)
    public ResponseEntity<GeneralAPIResponse> handleCommunicationFailureException(CommunicationFailureException exception) {
        logger.error("Communication Failure :: {}", exception.getMessage());
        GeneralAPIResponse response = GeneralAPIResponse.builder()
                .message(exception.getMessage())
                .build();
        return new ResponseEntity<>(response, HttpStatus.INTERNAL_SERVER_ERROR);
    }

    @ExceptionHandler(ApiLogHttpStatusException.class)
    public ResponseEntity<GeneralAPIResponse> handleApiLogHttpStatusException(ApiLogHttpStatusException exception) {
        logger.error("API Log Error :: {}", exception.getMessage());
        GeneralAPIResponse response = GeneralAPIResponse.builder()
                .message(exception.getResponseBodyAsString())
                .build();
        return new ResponseEntity<>(response, exception.getStatusCode());
    }

    @ExceptionHandler(ApiLogJsonProcessingException.class)
    public ResponseEntity<GeneralAPIResponse> handleJsonProcessingException(ApiLogJsonProcessingException exception) {
        logger.error("JSON Processing Error :: {}", exception.getMessage());
        GeneralAPIResponse response = GeneralAPIResponse.builder()
                .message(exception.getMessage())
                .build();
        return new ResponseEntity<>(response, HttpStatus.INTERNAL_SERVER_ERROR);
    }

    @ExceptionHandler(AuthorizationDeniedException.class)
    public ResponseEntity<GeneralAPIResponse> handleGeneralException(AuthorizationDeniedException exception) {
        logger.error("Unauthorized :: {}", exception.getMessage());
        GeneralAPIResponse response = GeneralAPIResponse.builder()
                .message("An unexpected error occurred: " + exception.getMessage())
                .build();
        return new ResponseEntity<>(response, HttpStatus.FORBIDDEN);
    }

    @ExceptionHandler(DataIntegrityViolationException.class)
    public ResponseEntity<GeneralAPIResponse> handleDataIntegrityViolationException(DataIntegrityViolationException exception) {
        logger.error("Duplicate Entry :: {}", exception.getMessage());
        GeneralAPIResponse response = GeneralAPIResponse.builder()
                .message("Duplicate Entry :: Resource is not unique and already exists")
                .build();
        return new ResponseEntity<>(response, HttpStatus.CONFLICT);
    }

    @ExceptionHandler(Exception.class)
    public ResponseEntity<GeneralAPIResponse> handleGeneralException(Exception exception) {
        logger.error("An Unexpected Error Occurred :: {}", exception.getMessage());
        GeneralAPIResponse response = GeneralAPIResponse.builder()
                .message("An unexpected error occurred: " + exception.getMessage())
                .build();
        return new ResponseEntity<>(response, HttpStatus.INTERNAL_SERVER_ERROR);
    }
}
