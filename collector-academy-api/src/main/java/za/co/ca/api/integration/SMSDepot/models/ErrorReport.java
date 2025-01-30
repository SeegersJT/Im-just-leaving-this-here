package za.co.ca.api.integration.SMSDepot.models;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

/**
 * @author Hanno Seegers
 */
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class ErrorReport {
    // When SMSDepot returns statusCode 200
    private int noNetwork;
    private int noContents;
    private long contentToLong;
    private int duplicates;
    private int optedOuts;
    private List faults;

    // When SMSDepot returns statusCode !200
    private String errorMessage;
    private String errorCode;
}
