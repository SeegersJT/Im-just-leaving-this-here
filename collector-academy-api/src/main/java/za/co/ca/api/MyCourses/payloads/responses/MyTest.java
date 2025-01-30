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
public class MyTest {
    private String courseTestNo;
    private String testTitle;
    private Integer courseDifficultyNo;
    private String courseDifficulty;
    private Integer testDuration;
    private Double testPassPercentage;
    private Integer retries;
    private Integer remainingRetries;
    private List<MyQuestion> myQuestions;
    private MyCourseTestResult myCourseTestResult;
}
