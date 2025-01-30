package za.co.ca.api.common.repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import za.co.ca.api.common.enums.GenderEnum;
import za.co.ca.api.common.models.Gender;

import java.util.Optional;

/**
 * @author Hanno Seegers
 */
public interface GenderRepository extends JpaRepository<Gender, Integer> {
    Optional<Gender> findByGenderNo(Integer genderNo);
    Optional<Gender> findByGender(GenderEnum genderEnum);
}
