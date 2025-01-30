package za.co.ca.api.communication.services;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import za.co.ca.api.communication.repositories.CommunicationTypeRepository;
import za.co.ca.api.common.exceptions.DataNotFoundException;
import za.co.ca.api.communication.enums.CommunicationTypeEnum;
import za.co.ca.api.communication.models.CommunicationType;

/**
 * @author Hanno Seegers
 */
@Service
@RequiredArgsConstructor
public class CommunicationTypeService {

    private final CommunicationTypeRepository communicationTypeRepository;

    public CommunicationType findByCommunicationType(CommunicationTypeEnum communicationTypeEnum) {
        return communicationTypeRepository.findByCommunicationType(communicationTypeEnum)
                .orElseThrow(() -> new DataNotFoundException("Communication Type Not Found - '" + communicationTypeEnum.toString() + "'"));
    }
}
