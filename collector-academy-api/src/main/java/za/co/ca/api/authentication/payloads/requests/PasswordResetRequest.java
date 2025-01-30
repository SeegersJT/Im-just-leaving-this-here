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
public class PasswordResetRequest {
    @NotBlank(message = "Confirmation Token can't be blank")
    private String confirmation_token;

    @NotBlank(message = "Password can't be blank")
    private String password;

    @NotBlank(message = "Confirmed Password can't be blank")
    private String confirmed_password;
}
