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
public class BulkMessagesRequestMessage {
    private String content;
    private String destination;
    private String customerId;
}
