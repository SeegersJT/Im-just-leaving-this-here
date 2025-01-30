package za.co.ca.api.authentication.repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import za.co.ca.api.authentication.models.ConfirmationToken;

import java.util.Optional;

/**
 * @author Hanno Seegers
 */

public interface ConfirmationTokenRepository extends JpaRepository<ConfirmationToken, String> {

    Optional<ConfirmationToken> findByConfirmationToken(String confirmationToken);
}
