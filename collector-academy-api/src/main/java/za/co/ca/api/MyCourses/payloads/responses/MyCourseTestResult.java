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
public class MyCourseTestResult {
    private String courseTestResultNo;
    private Integer courseTestResultStatusNo;
    private String courseTestResultStatus;
    private Double courseTestResultPercentage;
    private List<MyTestLog> myTestLogs;
}
