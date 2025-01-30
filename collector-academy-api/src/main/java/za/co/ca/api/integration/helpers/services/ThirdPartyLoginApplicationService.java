package za.co.ca.api.integration.helpers.services;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import za.co.ca.api.integration.helpers.repositories.ThirdPartyLoginApplicationRepository;
import za.co.ca.api.common.exceptions.DataNotFoundException;
import za.co.ca.api.integration.helpers.enums.ThirdPartyLoginApplicationEnum;
import za.co.ca.api.integration.helpers.models.ThirdPartyLoginApplication;

/**
 * @author Hanno Seegers
 */
@Service
@RequiredArgsConstructor
public class ThirdPartyLoginApplicationService {

    private final ThirdPartyLoginApplicationRepository thirdPartyLoginApplicationRepository;

    public ThirdPartyLoginApplication findByThirdPartyApplication(ThirdPartyLoginApplicationEnum thirdPartyLoginApplicationEnum) {
        return thirdPartyLoginApplicationRepository.findByThirdPartyLoginApplication(thirdPartyLoginApplicationEnum)
                .orElseThrow(() -> new DataNotFoundException("Third Party Login Application Not Found - '" + thirdPartyLoginApplicationEnum.toString() + "'"));
    }
}
