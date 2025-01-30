package za.co.ca.api.communication.services;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import za.co.ca.api.communication.repositories.CommunicationStatusRepository;
import za.co.ca.api.common.exceptions.DataNotFoundException;
import za.co.ca.api.communication.enums.CommunicationStatusEnum;
import za.co.ca.api.communication.models.CommunicationStatus;

/**
 * @author Hanno Seegers
 */
@Service
@RequiredArgsConstructor
public class CommunicationStatusService {

    private final CommunicationStatusRepository communicationStatusRepository;

    public CommunicationStatus findByCommunicationStatus(CommunicationStatusEnum communicationStatusEnum) {
        return communicationStatusRepository.findByCommunicationStatus(communicationStatusEnum)
                .orElseThrow(() -> new DataNotFoundException("Communication Status Not Found - '" + CommunicationStatusEnum.REQUESTED.toString() + "'"));
    }
}
