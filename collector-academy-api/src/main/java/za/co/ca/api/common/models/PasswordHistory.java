package za.co.ca.api.common.models;

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
@Table(name = "vs_password_history")
public class PasswordHistory {
    @Id
    @Column(name = "password_history_no", length = 25)
    private String password_History_No;

    @Column(name = "password_no")
    private Integer passwordNo;

    @Column(name = "password")
    private String password;

    @Column(name = "system_employee_no")
    private Integer system_Employee_No;

    @Column(name = "system_branch_no")
    private Integer system_Branch_No;

    @Column(name = "system_date")
    @Temporal(TemporalType.TIMESTAMP)
    private Date system_Date;

    @Column(name = "touch_employee_no")
    private Integer touch_Employee_No;

    @Column(name = "touch_branch_no")
    private Integer touch_Branch_No;

    @Column(name = "touch_date")
    @Temporal(TemporalType.TIMESTAMP)
    private Date touch_Date;

    @PrePersist
    private void autoFillOnInsert() {
        if (this.password_History_No == null) {
            this.password_History_No = Utils.generateRandomAlphaNumericCharacters();
        }
    }
}
