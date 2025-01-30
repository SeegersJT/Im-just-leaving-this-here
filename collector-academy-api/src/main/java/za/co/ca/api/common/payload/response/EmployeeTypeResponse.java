package za.co.ca.api.common.payload.response;

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
public class EmployeeTypeResponse {
    private Integer employeeTypeNo;
    private String employeeType;
}
