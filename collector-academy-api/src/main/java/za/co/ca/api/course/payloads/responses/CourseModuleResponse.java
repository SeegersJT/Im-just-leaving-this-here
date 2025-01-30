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
public class CourseModuleResponse {
    private String courseModuleNo;
    private String courseNo;
    private String courseTitle;
    private String moduleTitle;
    private String moduleDescription;
    private Integer moduleIndex;
    private Boolean active;
}
