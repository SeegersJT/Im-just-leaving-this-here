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
@Table(name = "vs_course_result")
@SQLRestriction("active = true")
public class CourseResult {

    @Id
    @Column(name = "course_result_no", length = 25)
    private String courseResultNo;

    @Column(name = "course_no", length = 25)
    private String courseNo;

    @Column(name = "employee_no")
    private Integer employeeNo;

    @Column(name = "course_status_no")
    private Integer courseStatusNo;

    @Column(name = "course_result_status_no")
    private Integer courseResultStatusNo;

    @Column(name = "course_assigned_by")
    private Integer courseAssignedBy;

    @Column(name = "course_assigned_date")
    @Temporal(TemporalType.TIMESTAMP)
    private Date courseAssignedDate;

    @Column(name = "course_started_date")
    @Temporal(TemporalType.TIMESTAMP)
    private Date courseStartedDate;

    @Column(name = "course_completed_date")
    @Temporal(TemporalType.TIMESTAMP)
    private Date courseCompletedDate;

    @Column(name = "course_expiry_date")
    @Temporal(TemporalType.TIMESTAMP)
    private Date courseExpiryDate;

    @Column(name = "course_breakout_step", columnDefinition = "LONGTEXT")
    private String courseBreakoutStep;

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

        if (this.courseResultNo == null) {
            this.courseResultNo = Utils.generateRandomAlphaNumericCharacters();
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
