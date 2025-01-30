package za.co.ca.api.document.models;

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
public class FileValidationCell {
    private String header;
    private String value;
    private Boolean validity;
    private String validityReason;
}
