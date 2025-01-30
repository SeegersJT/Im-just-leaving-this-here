package za.co.ca.api.communication.repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import za.co.ca.api.communication.enums.CommunicationTypeEnum;
import za.co.ca.api.communication.models.CommunicationType;

import java.util.Optional;

/**
 * @author Hanno Seegers
 */
public interface CommunicationTypeRepository extends JpaRepository<CommunicationType, String> {
    Optional<CommunicationType> findByCommunicationType(CommunicationTypeEnum communicationTypeEnum);
}
