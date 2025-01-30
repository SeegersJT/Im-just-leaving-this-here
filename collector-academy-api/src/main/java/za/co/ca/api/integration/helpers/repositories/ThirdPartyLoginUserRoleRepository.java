package za.co.ca.api.integration.helpers.repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import za.co.ca.api.integration.helpers.enums.ThirdPartyLoginUserRoleEnum;
import za.co.ca.api.integration.helpers.models.ThirdPartyLoginUserRole;

import java.util.Optional;

/**
 * @author Hanno Seegers
 */
public interface ThirdPartyLoginUserRoleRepository extends JpaRepository<ThirdPartyLoginUserRole, String> {
    Optional<ThirdPartyLoginUserRole> findByThirdPartyLoginUserRole(ThirdPartyLoginUserRoleEnum thirdPartyLoginUserRoleEnum);
}
