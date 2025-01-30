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
public class FileValidationRow {
    private Integer rowIndex;
    private List<FileValidationCell> cells;
    private Boolean allCellsValid;

    public FileValidationRow(int rowIndex, List<FileValidationCell> cells) {
        this.rowIndex = rowIndex;
        this.cells = cells;
        this.allCellsValid = cells.stream().allMatch(FileValidationCell::getValidity);
    }
}
