package za.co.ca.api.authentication.repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import za.co.ca.api.authentication.enums.ConfirmationTokenTypeEnum;
import za.co.ca.api.authentication.models.ConfirmationTokenType;

import java.util.Optional;

/**
 * @author Hanno Seegers
 */
public interface ConfirmationTokenTypeRepository extends JpaRepository<ConfirmationTokenType, Integer> {
    Optional<ConfirmationTokenType> findByConfirmationTokenType(ConfirmationTokenTypeEnum confirmationTokenType);

    Optional<ConfirmationTokenType> findByConfirmationTokenTypeNo(Integer confirmationTokenTypeNo);
}
