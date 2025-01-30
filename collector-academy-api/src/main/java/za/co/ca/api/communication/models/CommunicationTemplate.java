package za.co.ca.api.communication.models;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.hibernate.annotations.Filter;
import org.hibernate.annotations.SQLRestriction;
import org.hibernate.annotations.Where;

import java.util.Date;

/**
 * @author Hanno Seegers
 */
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
@Entity
@Table(name = "vs_communication_template")
@SQLRestriction("active = true")
public class CommunicationTemplate {

    @Id
    @Column(name = "communication_template_no", length = 25)
    private String communicationTemplateNo;

    @Column(name = "communication_method_no")
    private String communicationMethodNo;

    @Column(name = "communication_type_no")
    private String communicationTypeNo;

    @Column(name = "communication_template", columnDefinition = "LONGTEXT")
    private String communicationTemplate;

    @Column(name = "communication_subject")
    private String communicationSubject;

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
