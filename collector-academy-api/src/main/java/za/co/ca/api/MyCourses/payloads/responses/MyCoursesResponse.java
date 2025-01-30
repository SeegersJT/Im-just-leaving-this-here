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
public class MyCoursesResponse {
    private String courseResultNo;
    private String courseNo;
    private String courseTitle;
    private String courseDescription;
    private Integer courseDuration;
    private Integer courseDifficultyNo;
    private String courseDifficulty;
    private Integer employeeNo;
    private String username;
    private Integer courseStatusNo;
    private String courseStatus;
    private String courseStatusDescription;
    private Integer courseResultStatusNo;
    private String courseResultStatus;
    private Integer courseAssignedBy;
    private String courseAssignedUsername;
    private Date courseAssignedDate;
    private Date courseStartedDate;
    private Date courseCompletedDate;
    private Date courseExpiryDate;
    private String courseBreakoutStep;
    private Date courseBreakoutStepDate;
    private Boolean active;
}
