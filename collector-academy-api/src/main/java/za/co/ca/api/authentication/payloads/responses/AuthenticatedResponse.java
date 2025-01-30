package za.co.ca.api.authentication.payloads.responses;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

/**
 * @author Hanno Seegers
 */

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class AuthenticatedResponse {
    private String access_token ;
    private String refresh_token ;
}
