package za.co.ca.api.integration.SMSDepot.models;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

/**
 * @author Hanno Seegers
 */
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class BulkMessageSendOptions {
    /*
        Should the messages be sent or is this a test of the API?
        If testMode = true then it will return the result but won’t send the data, and won’t appear in any sent report.
    */
    private Boolean testMode;
    private Integer validityPeriod;
}
