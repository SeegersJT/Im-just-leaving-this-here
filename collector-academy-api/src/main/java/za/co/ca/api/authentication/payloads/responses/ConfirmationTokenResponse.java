package za.co.ca.api.authentication.payloads.responses;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import za.co.ca.api.authentication.enums.ConfirmationTokenTypeEnum;

import java.util.Date;

/**
 * @author Hanno Seegers
 */
@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class ConfirmationTokenResponse {
    private String confirmation_token;
    private ConfirmationTokenTypeEnum confirmation_token_type;
    private Date confirmation_token_expiry_date;
}
