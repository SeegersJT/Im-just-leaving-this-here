package za.co.ca.api.course.payloads.requests;

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
public class CourseTestRequest {
    private String testTitle;
    private Integer courseDifficultyNo;
    private Integer testDuration;
    private Double testPassPercentage;
    private Integer retries;
}
