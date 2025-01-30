package za.co.ca.api.communication.services;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import za.co.ca.api.communication.repositories.CommunicationMethodRepository;
import za.co.ca.api.common.exceptions.DataNotFoundException;
import za.co.ca.api.communication.enums.CommunicationMethodEnum;
import za.co.ca.api.communication.models.CommunicationMethod;

/**
 * @author Hanno Seegers
 */
@Service
@RequiredArgsConstructor
public class CommunicationMethodService {
    private final CommunicationMethodRepository communicationMethodRepository;

    public CommunicationMethod findByCommunicationMethod(CommunicationMethodEnum communicationMethodEnum) {
        return communicationMethodRepository.findByCommunicationMethod(communicationMethodEnum)
                .orElseThrow(() -> new DataNotFoundException("Communication Method Not Found - '" + communicationMethodEnum.toString() + "'"));
    }

    public CommunicationMethod findByCommunicationMethodNo(String communicationMethodNo) {
        return communicationMethodRepository.findByCommunicationMethodNo(communicationMethodNo)
                .orElseThrow(() -> new DataNotFoundException("Communication Method Not Found - '" + communicationMethodNo + "'"));
    }
}
