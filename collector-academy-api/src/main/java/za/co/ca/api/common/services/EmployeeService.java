package za.co.ca.api.common.services;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import za.co.ca.api.common.exceptions.DataNotFoundException;
import za.co.ca.api.common.exceptions.InvalidCredentialsException;
import za.co.ca.api.common.models.Employee;
import za.co.ca.api.common.repositories.EmployeeRepository;

import java.util.List;

/**
 * @author Hanno Seegers
 */
@Service
@RequiredArgsConstructor
@Slf4j
public class EmployeeService {

    private final EmployeeRepository employeeRepository;

    public Employee findByUsername(String username) {
        return employeeRepository.findByUsername(username)
                .orElseThrow(() -> new DataNotFoundException("Employee Not Found - '" + username + "'"));
    }

    public Employee findByUsername(String username, Boolean authentication) {
        return employeeRepository.findByUsername(username)
                .orElseThrow(() -> authentication
                        ? new InvalidCredentialsException("Incorrect Username or Password")
                        : new DataNotFoundException("Employee Not Found - '" + username + "'")
                );
    }

    public Employee findByEmployeeNo(Integer employeeNo) {
         return employeeRepository.findByEmployeeNo(employeeNo)
                .orElseThrow(() -> new DataNotFoundException("Employee Not Found - '" + employeeNo + "'"));
    }

    public Employee findByEmailAddress(String emailAddress) {
        return employeeRepository.findByEmailAddress(emailAddress)
                .orElseThrow(() -> new DataNotFoundException("Employee Not Found - '" + emailAddress + "'"));
    }

    public Employee findByIdNumber(String idNumber) {
        return employeeRepository.findByIdNumber(idNumber)
                .orElseThrow(() -> new DataNotFoundException("Employee Not Found - '" + idNumber + "'"));
    }

    public List<Employee> findAllByDeveloper() {
        return employeeRepository.findAll();
    }

    public List<Employee> findAllBySuperUser() {
        return employeeRepository.findAllBySuperuser();
    }

    public List<Employee> findAllByBranchManager(Integer branchNo) {
        return employeeRepository.findAllByBranchManager(branchNo);
    }

    public List<Employee> findAllByPerformanceManager(Integer branchNo, Integer performanceManagerEmployeeNo) {
        return employeeRepository.findAllByPerformanceManager(branchNo, performanceManagerEmployeeNo);
    }

    public List<Employee> findAllByPerformanceManagers() {
        return employeeRepository.findAllByPerformanceManagers();
    }

    public Employee getEmployeeByUsernameOrEmail(String usernameOrEmail) {
        Employee employeeByUsername = findByUsername(usernameOrEmail);

        if (employeeByUsername.getConfirmed()) {
            return employeeByUsername;
        }

        Employee employeeByEmailAddress = findByEmailAddress(usernameOrEmail);

        if (employeeByEmailAddress.getConfirmed()) {
            return employeeByEmailAddress;
        }

        throw new DataNotFoundException("Employee Not Found - '" + usernameOrEmail + "'");
    }

    public void updateEmployee(Employee employee) {
        saveEmployee(employee);
    }

    public void insertEmployee(Employee employee) {
        saveEmployee(employee);
    }

    private void saveEmployee(Employee employee) {
        employeeRepository.save(employee);
    }

    public Boolean isUsernameUnique(String username) {
        try {
            findByUsername(username);

            return false; // Username is not Unique
        } catch (Exception e) {
            return true; // Username is Unique
        }
    }

    public Boolean isIdNumberUnique(String idNumber) {
        try {
            findByIdNumber(idNumber);

            return false; // ID Number is not Unique
        } catch (Exception e) {
            return true; // ID Number is Unique
        }
    }


}
