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
public class CoursePageResponse {
    private String coursePageNo;
    private String courseModuleNo;
    private String pageTitle;
    private String pageDescription;
    private String pageContent;
    private Integer pageIndex;
    private Boolean active;
}
