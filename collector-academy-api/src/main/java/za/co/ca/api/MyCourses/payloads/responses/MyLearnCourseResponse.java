package za.co.ca.api.MyCourses.payloads.responses;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.Date;
import java.util.List;

/**
 * @author Hanno Seegers
 */
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class MyLearnCourseResponse {
    private MyCourseResult myCourseResult;
    private MyCourse myCourse;
}
