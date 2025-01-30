package za.co.ca.api.communication.services;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import za.co.ca.api.communication.repositories.CommunicationRequestRepository;
import za.co.ca.api.communication.enums.CommunicationStatusEnum;
import za.co.ca.api.communication.models.CommunicationRequest;
import za.co.ca.api.communication.models.CommunicationStatus;
import za.co.ca.api.communication.models.CommunicationTemplate;

/**
 * @author Hanno Seegers
 */
@Service
@RequiredArgsConstructor
public class CommunicationRequestService {

    private final CommunicationRequestRepository communicationRequestRepository;
    private final CommunicationStatusService communicationStatusService;

    public CommunicationRequest generateAndSaveCommunicationRequest(CommunicationTemplate communicationTemplate, Integer employeeNo, Integer touchEmployeeNo, Integer touchBranchNo) {
        CommunicationStatus communicationStatus = communicationStatusService.findByCommunicationStatus(CommunicationStatusEnum.REQUESTED);

        CommunicationRequest communicationRequest = generateCommunicationRequest(communicationTemplate, communicationStatus, employeeNo, touchEmployeeNo, touchBranchNo);

        saveCommunicationRequest(communicationRequest);

        return communicationRequest;
    }

    public CommunicationRequest generateCommunicationRequest(CommunicationTemplate communicationTemplate, CommunicationStatus communicationStatus, Integer employeeNo, Integer touchEmployeeNo, Integer touchBranchNo) {
        return CommunicationRequest.builder()
                .communicationTemplateNo(communicationTemplate.getCommunicationTemplateNo())
                .communicationMethodNo(communicationTemplate.getCommunicationMethodNo())
                .communicationStatusNo(communicationStatus.getCommunicationStatusNo())
                .employeeNo(employeeNo)
                .systemEmployeeNo(touchEmployeeNo)
                .systemBranchNo(touchBranchNo)
                .build();
    }

    public void handleAndSaveCommunicationRequest(CommunicationRequest communicationRequest, String handleResult, CommunicationStatusEnum communicationStatusEnum, Integer touchEmployeeNo, Integer touchBranchNo) {
        CommunicationStatus communicationStatus = communicationStatusService.findByCommunicationStatus(communicationStatusEnum);

        communicationRequest.setHandled(true);
        communicationRequest.setHandleResult(handleResult);
        communicationRequest.setCommunicationStatusNo(communicationStatus.getCommunicationStatusNo());
        communicationRequest.setTouchEmployeeNo(touchEmployeeNo);
        communicationRequest.setTouchBranchNo(touchBranchNo);

        saveCommunicationRequest(communicationRequest);
    }

    public void saveCommunicationRequest(CommunicationRequest communicationRequest) {
        communicationRequestRepository.save(communicationRequest);
    }
}
