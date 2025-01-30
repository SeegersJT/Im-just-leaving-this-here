package za.co.ca.api.common.services;

import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import za.co.ca.api.common.enums.EmployeeTypeEnum;
import za.co.ca.api.common.models.Branch;
import za.co.ca.api.common.models.Employee;
import za.co.ca.api.common.models.EmployeeType;
import za.co.ca.api.common.models.Gender;
import za.co.ca.api.common.payload.response.BranchResponse;
import za.co.ca.api.common.payload.response.EmployeeTypeResponse;
import za.co.ca.api.common.payload.response.GenderResponse;
import za.co.ca.api.common.payload.response.PerformanceManagerResponse;

import java.util.ArrayList;
import java.util.List;

/**
 * @author Hanno Seegers
 */
@Service
@RequiredArgsConstructor
public class CommonService {

    @Autowired
    BranchService branchService;

    @Autowired
    GenderService genderService;

    @Autowired
    EmployeeTypeService employeeTypeService;

    @Autowired
    EmployeeService employeeService;

    public List<BranchResponse> getAllBranches() {
        List<Branch> branches = branchService.findAll();
        List<BranchResponse> branchResponses = new ArrayList<BranchResponse>();

        for (Branch branch : branches) {
            BranchResponse branchResponse = BranchResponse.builder()
                    .branchNo(branch.getBranchNo())
                    .branchName(branch.getBranchName().name())
                    .branchAbbreviation(branch.getBranchAbbreviation())
                    .countryNo(branch.getCountryNo())
                    .build();
            branchResponses.add(branchResponse);
        }
        return branchResponses;
    }

    public List<GenderResponse> getAllGenders() {
        List<Gender> genders = genderService.findAll();

        List<GenderResponse> genderResponses = new ArrayList<GenderResponse>();

        for (Gender gender : genders) {
            GenderResponse genderResponse = GenderResponse.builder()
                    .genderNo(gender.getGenderNo())
                    .gender(gender.getGender().name())
                    .build();
            genderResponses.add(genderResponse);
        }
        return genderResponses;
    }

    public List<EmployeeTypeResponse> getAllEmployeeTypes() {
        List<EmployeeType> employeeTypes = employeeTypeService.findAll();

        List<EmployeeTypeResponse> employeeTypeResponses = new ArrayList<EmployeeTypeResponse>();

        for (EmployeeType employeeType : employeeTypes) {
            EmployeeTypeResponse employeeTypeResponse = EmployeeTypeResponse.builder()
                    .employeeTypeNo(employeeType.getEmployeeTypeNo())
                    .employeeType(employeeType.getEmployeeType().name())
                    .build();
            employeeTypeResponses.add(employeeTypeResponse);
        }
        return employeeTypeResponses;
    }

    public List<PerformanceManagerResponse> getAllPerformanceManagers() {
        List<Employee> performanceManagerEmployees = employeeService.findAllByPerformanceManagers();

        List<PerformanceManagerResponse> performanceManagerResponses = new ArrayList<PerformanceManagerResponse>();

        PerformanceManagerResponse NAPerformanceManagerResponse = PerformanceManagerResponse.builder()
                .performanceManagerEmployeeNo(1)
                .performanceManagerUsername("N/A")
                .performanceManagerCountryNo(1)
                .build();

        performanceManagerResponses.add(NAPerformanceManagerResponse);

        for (Employee performanceManager: performanceManagerEmployees) {
            PerformanceManagerResponse performanceManagerResponse = PerformanceManagerResponse.builder()
                    .performanceManagerEmployeeNo(performanceManager.getEmployeeNo())
                    .performanceManagerUsername(performanceManager.getUsername())
                    .performanceManagerCountryNo(performanceManager.getBranch().getCountryNo())
                    .build();
            performanceManagerResponses.add(performanceManagerResponse);
        }

        return performanceManagerResponses;
    }
}
