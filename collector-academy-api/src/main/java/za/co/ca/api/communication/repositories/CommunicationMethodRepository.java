package za.co.ca.api.communication.repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import za.co.ca.api.communication.enums.CommunicationMethodEnum;
import za.co.ca.api.communication.models.CommunicationMethod;

import java.util.Optional;

/**
 * @author Hanno Seegers
 */
public interface CommunicationMethodRepository extends JpaRepository<CommunicationMethod, String> {
    Optional<CommunicationMethod> findByCommunicationMethod(CommunicationMethodEnum communicationMethodEnum);
    Optional<CommunicationMethod> findByCommunicationMethodNo(String communicationMethodNo);
}
