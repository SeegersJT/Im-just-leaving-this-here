package za.co.ca.api.MyCourses.payloads.responses;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.Date;

/**
 * @author Hanno Seegers
 */
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class MyCourseResult {
    private String courseResultNo;
    private Integer courseStatusNo;
    private String courseStatus;
    private String courseStatusDescription;
    private Integer courseResultStatusNo;
    private String courseResultStatus;
    private Integer courseAssignedBy;
    private String courseAssignedByUsername;
    private Date courseAssignedDate;
    private Date courseStartedDate;
    private Date courseCompletedDate;
    private Date courseExpiryDate;
    private String courseBreakoutStep;
    private Date courseBreakoutDate;
}
