package za.co.ca.api.communication.models;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import za.co.ca.api.communication.enums.CommunicationStatusEnum;

import java.util.Date;

/**
 * @author Hanno Seegers
 */
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
@Entity
@Table(name = "vs_communication_status")
public class CommunicationStatus {

    @Id
    @Column(name = "communication_status_no", length = 25)
    private String communicationStatusNo;

    @Enumerated(EnumType.STRING)
    @Column(name = "communication_status")
    private CommunicationStatusEnum communicationStatus;

    @Column(name = "communication_status_description")
    private String communicationStatusDescription;

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
