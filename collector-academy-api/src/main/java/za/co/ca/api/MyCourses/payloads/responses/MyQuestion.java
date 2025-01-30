package za.co.ca.api.MyCourses.payloads.responses;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

/**
 * @author Hanno Seegers
 */
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class MyQuestion {
    private String courseTestQuestionNo;
    private String questionTitle;
    private Integer questionIndex;
    private List<MyAnswer> myAnswers;
}
