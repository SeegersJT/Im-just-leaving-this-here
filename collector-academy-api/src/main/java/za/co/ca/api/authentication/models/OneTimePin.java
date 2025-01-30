package za.co.ca.api.authentication.models;

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
@Entity
@NoArgsConstructor
@AllArgsConstructor
@Builder
@Table(name = "vs_one_time_pin")
public class OneTimePin {
    @Id
    @Column(name = "one_time_pin_no", length = 25)
    private String oneTimePinNo;

    @Column(name = "confirmation_token_no")
    private String confirmationTokenNo;

    @Column(name = "one_time_pin")
    private Integer oneTimePin;

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

        if (this.oneTimePinNo == null) {
            this.oneTimePinNo = Utils.generateRandomAlphaNumericCharacters();
        }

        if (this.oneTimePin == null) {
            this.oneTimePin = Utils.generateOTP();
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
}
