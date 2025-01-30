package za.co.ca.api.communication.payloads.requests;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import za.co.ca.api.communication.enums.CommunicationParseDataEnum;
import za.co.ca.api.communication.models.CommunicationRequest;

import java.util.Map;

/**
 * @author Hanno Seegers
 */
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class CommunicationDataRequest {
    private Integer employeeNo;
    private Integer branchNo;
    private String destination;
    private Map<CommunicationParseDataEnum, String> parseData;
    private CommunicationRequest communicationRequest;
}