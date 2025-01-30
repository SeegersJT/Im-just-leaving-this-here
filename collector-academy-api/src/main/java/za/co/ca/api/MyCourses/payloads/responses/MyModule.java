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
public class MyModule {
    private String courseModuleNo;
    private String moduleTitle;
    private String moduleDescription;
    private Integer moduleIndex;
    private List<MyPage> myPages;
}
