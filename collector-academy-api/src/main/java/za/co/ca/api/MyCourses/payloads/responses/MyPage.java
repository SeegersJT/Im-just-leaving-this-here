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
public class MyPage {
    private String coursePageNo;
    private String pageTitle;
    private String pageDescription;
    private Integer pageIndex;
    private String pageContent;
}
