package za.co.ca.api.communication.repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import za.co.ca.api.communication.models.CommunicationTemplate;

import java.util.Optional;

/**
 * @author Hanno Seegers
 */
public interface CommunicationTemplateRepository extends JpaRepository<CommunicationTemplate, String> {
    Optional<CommunicationTemplate> findByCommunicationMethodNoAndCommunicationTypeNo(String communicationMethodNo, String communicationTypeNo);
}
