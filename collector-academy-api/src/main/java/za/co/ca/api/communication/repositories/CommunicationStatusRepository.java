package za.co.ca.api.communication.repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import za.co.ca.api.communication.enums.CommunicationStatusEnum;
import za.co.ca.api.communication.models.CommunicationStatus;

import java.util.Optional;

/**
 * @author Hanno Seegers
 */
public interface CommunicationStatusRepository extends JpaRepository<CommunicationStatus, String> {
    Optional<CommunicationStatus> findByCommunicationStatus(CommunicationStatusEnum communicationStatusEnum);
}
