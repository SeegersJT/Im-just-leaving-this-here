package za.co.ca.api.user.payloads.requests;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

/**
 * @author Hanno Seegers
 */
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class UserUpdateRequest {
    private String username;
    private Integer branchNo;
    private String name;
    private String surname;
    private String idNumber;
    private String emailAddress;
    private String mobileNumber;
    private Integer genderNo;
    private Integer employeeTypeNo;
    private Integer performanceManagerEmployeeNo;
}
