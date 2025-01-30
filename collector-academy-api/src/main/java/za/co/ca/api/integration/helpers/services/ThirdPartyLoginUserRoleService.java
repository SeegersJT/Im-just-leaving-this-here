package za.co.ca.api.integration.helpers.services;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import za.co.ca.api.integration.helpers.repositories.ThirdPartyLoginUserRoleRepository;
import za.co.ca.api.common.exceptions.DataNotFoundException;
import za.co.ca.api.integration.helpers.enums.ThirdPartyLoginUserRoleEnum;
import za.co.ca.api.integration.helpers.models.ThirdPartyLoginUserRole;

/**
 * @author Hanno Seegers
 */
@Service
@RequiredArgsConstructor
public class ThirdPartyLoginUserRoleService {

    private final ThirdPartyLoginUserRoleRepository thirdPartyLoginUserRoleRepository;

    public ThirdPartyLoginUserRole findByThirdPartyLoginUserRole(ThirdPartyLoginUserRoleEnum thirdPartyLoginUserRoleEnum) {
        return thirdPartyLoginUserRoleRepository.findByThirdPartyLoginUserRole(thirdPartyLoginUserRoleEnum)
                .orElseThrow(() -> new DataNotFoundException("Third Party Login User Role - '" + thirdPartyLoginUserRoleEnum.toString() + "'"));
    }
}
