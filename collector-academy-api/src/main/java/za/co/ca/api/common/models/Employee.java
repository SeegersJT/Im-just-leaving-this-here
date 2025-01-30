package za.co.ca.api.common.models;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.hibernate.annotations.SQLRestriction;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;

import java.util.Collection;
import java.util.Date;
import java.util.List;

/**
 * @author Hanno Seegers
 */
@Data
@Entity
@NoArgsConstructor
@AllArgsConstructor
@Builder
@Table(name = "vs_employee")
@SQLRestriction("active = true AND employee_no <> 1")
public class Employee implements UserDetails {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "employee_no")
    private Integer employeeNo;

    @ManyToOne
    @JoinColumn(name = "branch_no")
    private Branch branch;

    @Column(name = "username", unique = true, nullable = false)
    private String username;

    @Column(name = "name")
    private String name;

    @Column(name = "surname")
    private String surname;

    @Column(name = "id_number")
    private String idNumber;

    @Column(name = "email_address")
    private String emailAddress;

    @Column(name = "mobile_number")
    private String mobileNumber;

    @ManyToOne
    @JoinColumn(name = "gender_no")
    private Gender gender;

    @OneToOne
    @JoinColumn(name = "password_no")
    private Password password;

    @ManyToOne
    @JoinColumn(name = "employee_type_no")
    private EmployeeType employeeType;

    @Column(name = "performance_manager_employee_no")
    private Integer performanceManagerEmployeeNo;

    @Column(name = "confirmed")
    private Boolean confirmed;

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

    @Override
    public Collection<? extends GrantedAuthority> getAuthorities() {
        return List.of(new SimpleGrantedAuthority(employeeType.getEmployeeType().toString()));
    }

    @Override
    public String getUsername() {
        return this.username;
    }

    @Override
    public String getPassword() {
        return password.getPassword() != null ? password.getPassword() : null;
    }

    @Override
    public boolean isAccountNonExpired() {
        return true; // Modify logic based on your business needs
    }

    @Override
    public boolean isAccountNonLocked() {
        return true; // Modify logic based on your business needs
    }

    @Override
    public boolean isCredentialsNonExpired() {
        return true; // Modify logic based on your business needs
    }

    @Override
    public boolean isEnabled() {
        return active != null && active;
    }

    public Password getPasswordData() {
        return this.password;
    }

    @PrePersist
    private void autoFillOnInsert() {

        if (this.confirmed == null) {
            this.confirmed = false;
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