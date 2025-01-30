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
public class CourseTestQuestionResponse {
    private String courseTestQuestionNo;
    private String courseTestNo;
    private String questionTitle;
    private Integer questionIndex;
    private Boolean active;
}
