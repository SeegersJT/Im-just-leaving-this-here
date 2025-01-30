package za.co.ca.api.integration.helpers.models;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.hibernate.annotations.SQLRestriction;
import za.co.ca.api.common.models.*;

import java.util.Date;

/**
 * @author Hanno Seegers
 */
@Data
@Entity
@NoArgsConstructor
@AllArgsConstructor
@Builder
@Table(name = "vs_third_party_login_details")
@SQLRestriction("active = true")
public class ThirdPartyLoginDetails {

    @Id
    @Column(name = "third_party_login_details_no", length = 25)
    private String thirdPartyLoginDetailsNo;

    @Column(name = "third_party_login_application_no")
    private String thirdPartyLoginApplicationNo;

    @Column(name = "employee_no")
    private Integer employeeNo;

    @Column(name = "username")
    private String username;

    @Column(name = "password")
    private String password;

    @Column(name = "third_party_login_user_role_no")
    private String thirdPartyLoginUserRoleNo;

    @Column(name = "branch_No")
    private Integer branchNo;

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
}