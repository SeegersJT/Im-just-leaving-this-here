package za.co.ca.api.user.payloads.responses;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

/**
 * @author Hanno Seegers
 */
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class UploadUserStatusResponse {
    private List<UserDataResponse> successfulUserUploads;
    private List<UserDataResponse> failedUserUploads;
}
