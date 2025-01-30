package za.co.ca.api.integration.helpers.repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import za.co.ca.api.integration.helpers.enums.ThirdPartyLoginApplicationEnum;
import za.co.ca.api.integration.helpers.models.ThirdPartyLoginApplication;

import java.util.Optional;

/**
 * @author Hanno Seegers
 */
public interface ThirdPartyLoginApplicationRepository extends JpaRepository<ThirdPartyLoginApplication, String> {
    Optional<ThirdPartyLoginApplication> findByThirdPartyLoginApplication(ThirdPartyLoginApplicationEnum thirdPartyLoginApplicationEnum);
}
