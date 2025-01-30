package za.co.ca.api.common.repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import za.co.ca.api.common.enums.EmployeeTypeEnum;
import za.co.ca.api.common.models.EmployeeType;

import java.util.Optional;

/**
 * @author Hanno Seegers
 */
public interface EmployeeTypeRepository extends JpaRepository<EmployeeType, Integer> {
    Optional<EmployeeType> findByEmployeeTypeNo(Integer employeeTypeNo);
    Optional<EmployeeType> findByEmployeeType(EmployeeTypeEnum employeeTypeEnum);
}
