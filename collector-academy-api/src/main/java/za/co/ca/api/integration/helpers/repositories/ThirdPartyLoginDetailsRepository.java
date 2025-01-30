package za.co.ca.api.integration.helpers.repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import za.co.ca.api.integration.helpers.models.ThirdPartyLoginDetails;

import java.util.Optional;

/**
 * @author Hanno Seegers
 */
public interface ThirdPartyLoginDetailsRepository extends JpaRepository<ThirdPartyLoginDetails, String> {
    Optional<ThirdPartyLoginDetails> findByThirdPartyLoginApplicationNoAndThirdPartyLoginUserRoleNoAndBranchNo(String thirdPartyLoginApplicationNo, String thirdPartyLoginUserRoleNo, Integer branchNo);
}
