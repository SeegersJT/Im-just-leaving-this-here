package za.co.ca.api.authentication.payloads.requests;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
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
public class OneTimePinRequest {
    @NotBlank(message = "Confirmation Token can't be Blank")
    private String confirmation_token;

    @NotNull(message = "One Time Pin can't be Blank")
    private Integer one_time_pin;
}
