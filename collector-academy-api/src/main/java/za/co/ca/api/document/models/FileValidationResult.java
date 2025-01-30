package za.co.ca.api.document.models;

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
public class FileValidationResult {
    private List<FileValidationRow> rows;
    private Boolean allRowsValid;

    public FileValidationResult(List<FileValidationRow> rows) {
        this.rows = rows;
        this.allRowsValid = rows.stream().allMatch(FileValidationRow::getAllCellsValid);
    }
}
