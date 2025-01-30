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
public class CourseTestAnswerResponse {
    private String courseTestAnswerNo;
    private String courseTestQuestionNo;
    private String testAnswer;
    private Boolean correctAnswer;
    private Integer courseAnswerIndex;
    private Boolean active;
}
