package za.co.ca.api.communication.repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import za.co.ca.api.communication.models.CommunicationRequest;

import java.util.Optional;

/**
 * @author Hanno Seegers
 */
public interface CommunicationRequestRepository extends JpaRepository<CommunicationRequest, String> {
    Optional<CommunicationRequest> findByCommunicationRequestNo(String communicationRequestNo);
}