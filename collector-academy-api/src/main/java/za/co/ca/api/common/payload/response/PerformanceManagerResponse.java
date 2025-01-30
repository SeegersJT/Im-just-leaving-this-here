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
public class PerformanceManagerResponse {
    private Integer performanceManagerEmployeeNo;
    private String performanceManagerUsername;
    private Integer performanceManagerCountryNo;
}
