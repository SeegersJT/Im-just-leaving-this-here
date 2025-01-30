package za.co.ca.api.integration.SMSDepot.models;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.Date;

/**
 * @author Hanno Seegers
 */
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class SMSDepotAuthToken {
    private String access_token;
    private String access_token_schema;
    private Date access_token_expire_date;
}
