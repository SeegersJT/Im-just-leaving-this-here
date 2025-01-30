package za.co.ca.api.integration.helpers.services;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import za.co.ca.api.integration.helpers.repositories.ThirdPartyLoginDetailsRepository;
import za.co.ca.api.common.exceptions.DataNotFoundException;
import za.co.ca.api.integration.helpers.enums.ThirdPartyLoginApplicationEnum;
import za.co.ca.api.integration.helpers.enums.ThirdPartyLoginUserRoleEnum;
import za.co.ca.api.integration.helpers.models.ThirdPartyLoginApplication;
import za.co.ca.api.integration.helpers.models.ThirdPartyLoginDetails;
import za.co.ca.api.integration.helpers.models.ThirdPartyLoginUserRole;

/**
 * @author Hanno Seegers
 */
@Service
@RequiredArgsConstructor
public class ThirdPartyLoginDetailsService {

    private final ThirdPartyLoginDetailsRepository thirdPartyLoginDetailsRepository;

    private final ThirdPartyLoginApplicationService thirdPartyLoginApplicationService;
    private final ThirdPartyLoginUserRoleService thirdPartyLoginUserRoleService;

    public ThirdPartyLoginDetails findByThirdPartyLoginDetails(String thirdPartyLoginApplicationNo, String thirdPartyLoginUserRoleNo, Integer branchNo) {
        return thirdPartyLoginDetailsRepository.findByThirdPartyLoginApplicationNoAndThirdPartyLoginUserRoleNoAndBranchNo(thirdPartyLoginApplicationNo, thirdPartyLoginUserRoleNo, branchNo)
                .orElseThrow(() -> new DataNotFoundException("Third Party Login Details Not Found :: Application: " + thirdPartyLoginApplicationNo + ", Role: " + thirdPartyLoginUserRoleNo + ", Branch: " + branchNo));

    }

    public ThirdPartyLoginDetails getThirdPartyLoginDetails(ThirdPartyLoginApplicationEnum thirdPartyLoginApplicationEnum, ThirdPartyLoginUserRoleEnum thirdPartyLoginUserRoleEnum, Integer branchNo) {
        ThirdPartyLoginApplication thirdPartyLoginApplication = thirdPartyLoginApplicationService.findByThirdPartyApplication(thirdPartyLoginApplicationEnum);
        ThirdPartyLoginUserRole thirdPartyLoginUserRole = thirdPartyLoginUserRoleService.findByThirdPartyLoginUserRole(thirdPartyLoginUserRoleEnum);

        return findByThirdPartyLoginDetails(thirdPartyLoginApplication.getThirdPartyLoginApplicationNo(), thirdPartyLoginUserRole.getThirdPartyLoginUserRoleNo(), branchNo);
    }
}