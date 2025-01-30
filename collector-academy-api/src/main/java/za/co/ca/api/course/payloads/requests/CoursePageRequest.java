package za.co.ca.api.course.payloads.requests;

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
public class CoursePageRequest {
    private String pageTitle;
    private String pageDescription;
    private String pageContent;
    private Integer pageIndex;
}
