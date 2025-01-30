package za.co.ca.api.communication.services;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import za.co.ca.api.communication.repositories.CommunicationTemplateRepository;
import za.co.ca.api.common.exceptions.DataNotFoundException;
import za.co.ca.api.communication.enums.CommunicationMethodEnum;
import za.co.ca.api.communication.enums.CommunicationTypeEnum;
import za.co.ca.api.communication.models.CommunicationMethod;
import za.co.ca.api.communication.models.CommunicationTemplate;
import za.co.ca.api.communication.models.CommunicationType;

/**
 * @author Hanno Seegers
 */
@Service
@RequiredArgsConstructor
public class CommunicationTemplateService {

    private final CommunicationTemplateRepository communicationTemplateRepository;

    private final CommunicationMethodService communicationMethodService;
    private final CommunicationTypeService communicationTypeService;

    public CommunicationTemplate findByCommunicationTypeNoAndCommunicationMethodNo(CommunicationMethod communicationMethod, CommunicationType communicationType) {
        return communicationTemplateRepository.findByCommunicationMethodNoAndCommunicationTypeNo(communicationMethod.getCommunicationMethodNo(), communicationType.getCommunicationTypeNo())
                .orElseThrow(() -> new DataNotFoundException("Communication Template Not Found - '" + communicationMethod.getCommunicationMethod() + ": " + communicationType.getCommunicationType() + "'"));
    }

    public CommunicationTemplate getCommunicationTemplate(CommunicationMethodEnum communicationMethodEnum, CommunicationTypeEnum communicationTypeEnum) {
        CommunicationMethod communicationMethod = communicationMethodService.findByCommunicationMethod(communicationMethodEnum);
        CommunicationType communicationType = communicationTypeService.findByCommunicationType(communicationTypeEnum);

        return findByCommunicationTypeNoAndCommunicationMethodNo(communicationMethod, communicationType);
    }
}
