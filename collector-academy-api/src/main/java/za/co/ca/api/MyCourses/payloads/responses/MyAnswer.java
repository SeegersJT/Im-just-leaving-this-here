package za.co.ca.api.MyCourses.payloads.responses;

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
public class MyAnswer {
    private String courseTestAnswerNo;
    private String courseTestAnswer;
    private Integer courseTestIndex;
}
