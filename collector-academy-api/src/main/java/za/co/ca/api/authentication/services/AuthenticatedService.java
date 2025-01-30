package za.co.ca.api.authentication.services;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.fasterxml.jackson.datatype.jsr310.JavaTimeModule;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;
import za.co.ca.api.authentication.models.AuthenticatedEmployee;
import za.co.ca.api.common.enums.EmployeeTypeEnum;
import za.co.ca.api.common.enums.GenderEnum;

import java.util.Map;

/**
 * @author Hanno Seegers
 */
@Service
@RequiredArgsConstructor
public class AuthenticatedService {

    public AuthenticatedEmployee getAuthenticatedEmployeeDetails() {
        try {
            Authentication authentication = SecurityContextHolder.getContext().getAuthentication();

            if (authentication == null) {
                return null;
            }

            ObjectMapper oMapper = new ObjectMapper();
            oMapper.registerModule(new JavaTimeModule());

            Map authenticationMap = oMapper.convertValue(authentication.getPrincipal(), Map.class);
            Map branchMap = oMapper.convertValue(authenticationMap.get("branch"), Map.class);
            Map genderMap = oMapper.convertValue(authenticationMap.get("gender"), Map.class);
            Map employeeTypeMap = oMapper.convertValue(authenticationMap.get("employeeType"), Map.class);

            return AuthenticatedEmployee.builder()
                    .employeeNo((Integer) authenticationMap.get("employeeNo"))
                    .branchNo((Integer) branchMap.get("branchNo"))
                    .username((String) authenticationMap.get("username"))
                    .name((String) authenticationMap.get("name"))
                    .surname((String) authenticationMap.get("surname"))
                    .idNumber((String) authenticationMap.get("idNumber"))
                    .emailAddress((String) authenticationMap.get("emailAddress"))
                    .mobileNumber((String) authenticationMap.get("mobileNumber"))
                    .gender(GenderEnum.valueOf(genderMap.get("gender").toString()))
                    .employeeType(EmployeeTypeEnum.valueOf(employeeTypeMap.get("employeeType").toString()))
                    .performanceManagerEmployeeNo((Integer) authenticationMap.get("performanceManagerEmployeeNo"))
                    .confirmed((Boolean) authenticationMap.get("confirmed"))
                    .active((Boolean) authenticationMap.get("active"))
                    .build();
        } catch(Exception e) {
            // LOGGER THING
            String name = null;
        }

        return null;
    }
}
