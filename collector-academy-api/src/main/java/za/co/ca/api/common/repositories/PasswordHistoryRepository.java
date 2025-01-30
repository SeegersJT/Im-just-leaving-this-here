package za.co.ca.api.common.repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import za.co.ca.api.common.models.PasswordHistory;

import java.util.List;

/**
 * @author Hanno Seegers
 */
public interface PasswordHistoryRepository extends JpaRepository<PasswordHistory, String> {
    List<PasswordHistory> findByPasswordNo(Integer passwordNo);
}
