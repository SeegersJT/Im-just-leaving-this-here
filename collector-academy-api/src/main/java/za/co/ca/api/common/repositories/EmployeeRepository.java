package za.co.ca.api.common.repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import za.co.ca.api.common.models.Employee;

import java.util.List;
import java.util.Optional;

/**
 * @author Hanno Seegers
 */
public interface EmployeeRepository extends JpaRepository<Employee, Integer> {

    Optional<Employee> findByUsername(String username);
    Optional<Employee> findByEmployeeNo(Integer employeeNo);
    Optional<Employee> findByEmailAddress(String emailAddress);
    Optional<Employee> findByIdNumber(String idNumber);

    @Query("SELECT e FROM Employee e WHERE e.active = true AND e.employeeType.employeeTypeNo <> 1")
    List<Employee> findAllBySuperuser();

    @Query("SELECT e FROM Employee e WHERE e.branch.branchNo = :branchNo AND e.employeeType.employeeTypeNo <> 1 AND e.active = true")
    List<Employee> findAllByBranchManager(@Param("branchNo") Integer branchNo);

    @Query("SELECT e FROM Employee e WHERE e.branch.branchNo = :branchNo AND e.performanceManagerEmployeeNo = :performanceManagerEmployeeNo AND e.employeeType.employeeTypeNo <> 1 AND e.active = true")
    List<Employee> findAllByPerformanceManager(@Param("branchNo") Integer branchNo, @Param("performanceManagerEmployeeNo") Integer performanceManagerEmployeeNo);

    @Query("SELECT e FROM Employee e WHERE e.employeeType.employeeTypeNo <> 1 AND e.employeeType.employeeTypeNo = 4 AND e.active = true")
    List<Employee> findAllByPerformanceManagers();
}
