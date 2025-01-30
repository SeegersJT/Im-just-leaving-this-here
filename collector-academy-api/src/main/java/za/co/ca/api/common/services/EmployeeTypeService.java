package za.co.ca.api.common.services;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import za.co.ca.api.common.repositories.EmployeeTypeRepository;
import za.co.ca.api.common.enums.EmployeeTypeEnum;
import za.co.ca.api.common.exceptions.DataNotFoundException;
import za.co.ca.api.common.models.EmployeeType;

import java.util.List;

/**
 * @author Hanno Seegers
 */
@Service
@RequiredArgsConstructor
public class EmployeeTypeService {

    private final EmployeeTypeRepository employeeTypeRepository;

    public EmployeeType findByEmployeeTypeNo(Integer employeeTypeNo) {
        return employeeTypeRepository.findByEmployeeTypeNo(employeeTypeNo)
                .orElseThrow(() -> new DataNotFoundException("Employee Type not found - '" + employeeTypeNo.toString() + "'"));
    }

    public EmployeeType findByEmployeeType(EmployeeTypeEnum employeeTypeEnum) {
        return employeeTypeRepository.findByEmployeeType(employeeTypeEnum)
                .orElseThrow(() -> new DataNotFoundException("Employee Type not found - '" + employeeTypeEnum.name() + "'"));
    }

    public List<EmployeeType> findAll() {
        return employeeTypeRepository.findAll();

    }
}
