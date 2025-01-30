package za.co.ca.api.course.models;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.hibernate.annotations.SQLRestriction;
import za.co.ca.api.common.helpers.Utils;

import java.util.Date;

/**
 * @author Hanno Seegers
 */
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
@Entity
@Table(name = "vs_course_test_result")
@SQLRestriction("active = true")
public class CourseTestResult {

    @Id
    @Column(name = "course_test_result_no", length = 25)
    private String courseTestResultNo;

    @Column(name = "course_result_no")
    private String courseResultNo;

    @Column(name = "course_test_no", length = 25)
    private String courseTestNo;

    @Column(name = "course_test_result_status_no")
    private Integer courseTestResultStatusNo;

    @Column(name = "course_test_result_percentage")
    private Double courseTestResultPercentage;

    @Column(name = "active")
    private Boolean active;

    @Column(name = "system_employee_no")
    private Integer systemEmployeeNo;

    @Column(name = "system_branch_no")
    private Integer systemBranchNo;

    @Column(name = "system_date")
    @Temporal(TemporalType.TIMESTAMP)
    private Date systemDate;

    @Column(name = "touch_employee_no")
    private Integer touchEmployeeNo;

    @Column(name = "touch_branch_no")
    private Integer touchBranchNo;

    @Column(name = "touch_date")
    @Temporal(TemporalType.TIMESTAMP)
    private Date touchDate;

    @PrePersist
    private void autoFillOnInsert() {

        if (this.courseTestResultNo == null) {
            this.courseTestResultNo = Utils.generateRandomAlphaNumericCharacters();
        }

        if (this.active == null) {
            this.active = true;
        }

        if (this.touchEmployeeNo == null && this.systemEmployeeNo != null) {
            this.touchEmployeeNo = this.systemEmployeeNo;
        }

        if (this.touchBranchNo == null && this.systemBranchNo != null) {
            this.touchBranchNo = this.systemBranchNo;
        }

        this.systemDate = new Date();
        this.touchDate = new Date();
    }

    @PreUpdate
    private void autoFillOnUpdate() {
        this.touchDate = new Date();
    }
}
