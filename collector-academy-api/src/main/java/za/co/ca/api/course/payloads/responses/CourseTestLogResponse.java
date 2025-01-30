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
public class CourseTestLogResponse {
    private String courseTestLogNo;
    private String courseTestResultNo;
    private String courseTestQuestionNo;
    private String courseTestAnswerNo;
    private Boolean active;
}
