package za.co.ca.api.authentication.payloads.requests;

import jakarta.validation.constraints.NotBlank;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

/**
 * @author Hanno Seegers
 */
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class VerifyConfirmationTokenRequest {
    @NotBlank(message = "Confirmation Token can't be Blank")
    private String confirmation_token;
}
