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
@Table(name = "vs_confirmation_token")
public class ConfirmationToken {

    @Id
    @Column(name = "confirmation_token_no", length = 25)
    private String confirmationTokenNo;

    @Column(name = "confirmation_token", length = 100)
    private String confirmationToken;

    @Column(name = "employee_No")
    private Integer employeeNo;

    @Column(name = "confirmation_token_expiry_date")
    @Temporal(TemporalType.TIMESTAMP)
    private Date confirmationTokenExpiryDate;

    @Column(name = "confirmation_token_type_no")
    private Integer confirmationTokenTypeNo;

    @Column(name = "confirmed")
    private Boolean confirmed;

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

        if (this.confirmationTokenNo == null) {
            this.confirmationTokenNo = Utils.generateRandomAlphaNumericCharacters();
        }

        if (this.confirmationToken == null) {
            this.confirmationToken = Utils.generateCustomToken();
        }

        if (this.confirmed == null) {
            this.confirmed = false;
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
