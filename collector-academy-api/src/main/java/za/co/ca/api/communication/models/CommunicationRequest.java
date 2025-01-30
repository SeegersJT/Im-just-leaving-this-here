package za.co.ca.api.communication.models;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
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
@Table(name = "vs_communication_request")
public class CommunicationRequest {

    @Id
    @Column(name = "communication_request_no", length = 25)
    private String communicationRequestNo;

    @Column(name = "communication_template_no")
    private String communicationTemplateNo;

    @Column(name = "communication_method_no")
    private String communicationMethodNo;

    @Column(name = "employee_no")
    private Integer employeeNo;

    @Column(name = "sent_date")
    @Temporal(TemporalType.TIMESTAMP)
    private Date sentDate;

    @Column(name = "communication_status_no")
    private String communicationStatusNo;

    @Column(name = "handled")
    private Boolean handled;

    @Column(name = "handle_result")
    private String handleResult;

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

        if (this.communicationRequestNo == null) {
            this.communicationRequestNo = Utils.generateRandomAlphaNumericCharacters();
        }

        if (this.handled == null) {
            this.handled = false;
        }

        if (this.touchEmployeeNo == null && this.systemEmployeeNo != null) {
            this.touchEmployeeNo = this.systemEmployeeNo;
        }

        if (this.touchBranchNo == null && this.systemBranchNo != null) {
            this.touchBranchNo = this.systemBranchNo;
        }

        this.sentDate = new Date();
        this.systemDate = new Date();
        this.touchDate = new Date();
    }

    @PreUpdate
    private void autoFillOnUpdate() {
        this.touchDate = new Date();
    }
}
