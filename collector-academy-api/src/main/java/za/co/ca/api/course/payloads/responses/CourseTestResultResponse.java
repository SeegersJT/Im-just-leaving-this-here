package za.co.ca.api.course.payloads.responses;

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
public class CourseTestResultResponse {
    private String courseTestResultNo;
    private String courseTestNo;
    private String courseResultNo;
    private Integer courseTestResultStatusNo;
    private String courseTestResultStatus;
    private Double courseTestResultPercentage;
    private Boolean active;
}
