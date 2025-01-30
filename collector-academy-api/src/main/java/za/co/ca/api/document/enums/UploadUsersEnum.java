package za.co.ca.api.document.enums;

import lombok.Getter;

/**
 * @author Hanno Seegers
 */
@Getter
public enum UploadUsersEnum {
    NAME("Name"),
    SURNAME("Surname"),
    ID_NUMBER("ID Number"),
    EMAIL_ADDRESS("Email Address"),
    MOBILE_NUMBER("Mobile Number"),
    GENDER("Gender"),
    BRANCH_NAME("Branch Name"),
    PERFORMANCE_MANAGER("Performance Manager Username (Optional)")
    ;

    private final String headerName;

    UploadUsersEnum(String headerName) {
        this.headerName = headerName;
    }

}
