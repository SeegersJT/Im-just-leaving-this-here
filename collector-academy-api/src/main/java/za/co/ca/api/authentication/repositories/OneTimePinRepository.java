package za.co.ca.api.authentication.repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import za.co.ca.api.authentication.models.OneTimePin;

import java.util.Optional;

/**
 * @author Hanno Seegers
 */
public interface OneTimePinRepository extends JpaRepository<OneTimePin, String> {
    Optional<OneTimePin> findByConfirmationTokenNo(String confirmationTokenNo);
}
