package za.co.ca.api.authentication.repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import za.co.ca.api.common.models.Password;

import java.util.Optional;

/**
 * @author Hanno Seegers
 */
public interface PasswordRepository extends JpaRepository<Password, Integer> {
    Optional<Password> findByPasswordNo(Integer passwordNo);
}
