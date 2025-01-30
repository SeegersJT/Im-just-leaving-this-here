package za.co.ca.api.authentication.models;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import za.co.ca.api.common.enums.EmployeeTypeEnum;
import za.co.ca.api.common.enums.GenderEnum;

/**
 * @author Hanno Seegers
 */

@Builder
@Data
@NoArgsConstructor
@AllArgsConstructor
public class AuthenticatedEmployee {
    private Integer employeeNo;
    private Integer branchNo;
    private String username;
    private String name;
    private String surname;
    private String idNumber;
    private String emailAddress;
    private String mobileNumber;
    private GenderEnum gender;
    private EmployeeTypeEnum employeeType;
    private Integer performanceManagerEmployeeNo;
    private Boolean confirmed;
    private Boolean active;
}