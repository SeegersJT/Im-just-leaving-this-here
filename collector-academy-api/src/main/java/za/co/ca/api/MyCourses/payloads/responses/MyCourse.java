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
public class MyCourse {
    private String courseNo;
    private String courseTitle;
    private String courseDescription;
    private Integer courseDuration;
    private Integer courseDifficultyNo;
    private String courseDifficulty;
    private List<MyModule> myModules;
    private List<MyTest> myTests;
}
