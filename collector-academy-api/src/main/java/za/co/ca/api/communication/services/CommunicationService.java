package za.co.ca.api.communication.services;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import za.co.ca.api.common.helpers.Utils;
import za.co.ca.api.communication.models.CommunicationMethod;
import za.co.ca.api.communication.models.CommunicationRequest;
import za.co.ca.api.communication.models.CommunicationTemplate;
import za.co.ca.api.communication.payloads.requests.CommunicationDataRequest;
import za.co.ca.api.integration.SMSDepot.models.BulkMessageRequest;
import za.co.ca.api.integration.SMSDepot.models.BulkMessageSendOptions;
import za.co.ca.api.integration.SMSDepot.models.BulkMessagesRequestMessage;
import za.co.ca.api.integration.SMSDepot.props.SMSDepotProps;
import za.co.ca.api.integration.SMSDepot.services.SMSDepotService;

import java.util.ArrayList;
import java.util.List;

/**
 * @author Hanno Seegers
 */
@Service
@RequiredArgsConstructor
@Slf4j
public class CommunicationService {

    private final CommunicationRequestService communicationRequestService;
    private final CommunicationMethodService communicationMethodService;
    private final SMSDepotService smsDepotService;

    private final SMSDepotProps smsDepotProps;

    public void requestCommunication(CommunicationTemplate communicationTemplate, List<CommunicationDataRequest> communicationDataRequestList, Integer branchNo, Integer touchEmployeeNo, Integer touchBranchNo) throws Exception {
        for (CommunicationDataRequest communicationDataRequest : communicationDataRequestList) {
            CommunicationRequest communicationRequest = communicationRequestService.generateAndSaveCommunicationRequest(communicationTemplate, communicationDataRequest.getEmployeeNo(), touchEmployeeNo, touchBranchNo);

            communicationDataRequest.setCommunicationRequest(communicationRequest);
        }

        sendCommunication(communicationTemplate, communicationDataRequestList, branchNo, touchEmployeeNo, touchBranchNo);

        log.info("Communication Successful :: Communication Template: '" +  communicationTemplate.getCommunicationTemplate() + "'");
    }

    private void sendCommunication(CommunicationTemplate communicationTemplate, List<CommunicationDataRequest> communicationDataRequestList, Integer branchNo, Integer touchEmployeeNo, Integer touchBranchNo) throws Exception {
        CommunicationMethod communicationMethod = communicationMethodService.findByCommunicationMethodNo(communicationTemplate.getCommunicationMethodNo());

        switch (communicationMethod.getCommunicationMethod()) {
            case SMS -> sendSMSCommunication(communicationTemplate.getCommunicationTemplate(), communicationDataRequestList, branchNo, touchEmployeeNo, touchBranchNo);
            case EMAIL -> sendEMAILCommunication(communicationTemplate.getCommunicationTemplate(), communicationDataRequestList, branchNo, touchEmployeeNo, touchBranchNo);
        };
    }

    private void sendSMSCommunication(String template, List<CommunicationDataRequest> communicationDataRequestList, Integer branchNo, Integer touchEmployeeNo, Integer touchBranchNo) throws Exception {
        List<BulkMessagesRequestMessage> bulkMessagesRequestMessageList = new ArrayList<BulkMessagesRequestMessage>();

        for (CommunicationDataRequest communicationDataRequest : communicationDataRequestList) {
            String parsedSMSTemplate = Utils.replaceSMSTemplatePlaceholders(template, communicationDataRequest.getParseData());

            BulkMessagesRequestMessage bulkMessagesRequestMessage = BulkMessagesRequestMessage.builder()
                    .content(parsedSMSTemplate)
                    .destination(communicationDataRequest.getDestination())
                    .customerId(communicationDataRequest.getCommunicationRequest().getCommunicationRequestNo())
                    .build();

            bulkMessagesRequestMessageList.add(bulkMessagesRequestMessage);
        }

        BulkMessageSendOptions bulkMessageSendOptions = BulkMessageSendOptions.builder()
                .testMode(smsDepotProps.SMS_DEPOT_TEST_MODE)
                .validityPeriod(smsDepotProps.SMS_DEPOT_VALIDITY_PERIOD)
                .build();

        BulkMessageRequest bulkMessageRequest = BulkMessageRequest.builder()
                .messages(bulkMessagesRequestMessageList)
                .sendOptions(bulkMessageSendOptions)
                .build();

        smsDepotService.performSendBulkMessages(bulkMessageRequest, communicationDataRequestList, branchNo, touchEmployeeNo, touchBranchNo);
    }

    private void sendEMAILCommunication(String template, List<CommunicationDataRequest> communicationDataRequests, Integer branchNo, Integer touchEmployeeNo, Integer touchBranchNo) {
        // DO EMAIL STUFF
    }
}
