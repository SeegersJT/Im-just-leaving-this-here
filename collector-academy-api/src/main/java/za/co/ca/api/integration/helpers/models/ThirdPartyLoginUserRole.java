package za.co.ca.api.integration.helpers.models;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import za.co.ca.api.integration.helpers.enums.ThirdPartyLoginUserRoleEnum;

import java.util.Date;

/**
 * @author Hanno Seegers
 */
@Data
@Entity
@NoArgsConstructor
@AllArgsConstructor
@Builder
@Table(name = "vs_third_party_login_user_role")
public class ThirdPartyLoginUserRole {

    @Id
    @Column(name = "third_party_login_user_role_no", length = 25)
    private String thirdPartyLoginUserRoleNo;

    @Enumerated(EnumType.STRING)
    @Column(name = "third_party_login_user_role")
    private ThirdPartyLoginUserRoleEnum thirdPartyLoginUserRole;

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