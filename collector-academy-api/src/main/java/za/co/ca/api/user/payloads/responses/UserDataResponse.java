package za.co.ca.api.user.payloads.responses;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

/**
 * @author Hanno Seegers
 */
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class UserDataResponse {
    private Integer employeeNo;
    private Integer employeeTypeNo;
    private String employeeType;
    private Integer performanceManagerEmployeeNo;
    private String performanceManagerUsername;
    private String username;
    private String name;
    private String surname;
    private String idNumber;
    private String emailAddress;
    private String mobileNumber;
    private Integer genderNo;
    private String gender;
    private Integer branchNo;
    private String branchName;
    private String password;
    private List<String> errors;
}
