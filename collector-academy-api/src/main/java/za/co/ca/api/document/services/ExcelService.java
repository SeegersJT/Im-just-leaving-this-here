package za.co.ca.api.document.services;

import lombok.AllArgsConstructor;
import org.apache.poi.ss.usermodel.*;
import org.apache.poi.xssf.usermodel.XSSFWorkbook;
import org.springframework.stereotype.Service;
import za.co.ca.api.common.enums.BranchEnum;
import za.co.ca.api.common.models.Branch;
import za.co.ca.api.common.models.Country;
import za.co.ca.api.common.props.IDValidationProps;
import za.co.ca.api.common.services.BranchService;
import za.co.ca.api.common.services.CountryService;
import za.co.ca.api.common.services.EmployeeService;
import za.co.ca.api.document.enums.UploadUsersEnum;
import za.co.ca.api.document.models.FileValidationCell;
import za.co.ca.api.document.models.FileValidationResult;
import za.co.ca.api.document.models.FileValidationRow;
import za.co.ca.api.common.models.Employee;
import za.co.ca.api.document.enums.DocumentsEnum;

import java.io.ByteArrayOutputStream;
import java.io.IOException;
import java.io.InputStream;
import java.util.ArrayList;
import java.util.List;
import java.util.regex.Pattern;

/**
 * @author Hanno Seegers
 */
@Service
@AllArgsConstructor
public class ExcelService {

    private final BranchService branchService;
    private final CountryService countryService;
    private final EmployeeService employeeService;

    private final IDValidationProps idValidationProps;

    public byte[] generateExcelWithHeaders(DocumentsEnum documentsEnum) throws IOException {
        Workbook workbook = new XSSFWorkbook();
        Sheet sheet = workbook.createSheet("Document");

        // Create a cell style for text formatting
        CellStyle textStyle = workbook.createCellStyle();
        DataFormat format = workbook.createDataFormat();
        textStyle.setDataFormat(format.getFormat("@")); // "@" sets cell format to text

        // Apply bold font and thick border to header cells
        CellStyle headerStyle = workbook.createCellStyle();
        headerStyle.cloneStyleFrom(textStyle);
        Font headerFont = workbook.createFont();
        headerFont.setBold(true);
        headerStyle.setFont(headerFont);

        // Set thick border for header cells
        headerStyle.setBorderTop(BorderStyle.THIN);
        headerStyle.setBorderBottom(BorderStyle.THIN);
        headerStyle.setBorderLeft(BorderStyle.THIN);
        headerStyle.setBorderRight(BorderStyle.THIN);

        // Determine headers based on the document type
        List<String> headers;
        switch (documentsEnum) {
            case USERS -> headers = List.of(UploadUsersEnum.values()).stream().map(UploadUsersEnum::getHeaderName).toList();
            // Add cases for other document types here with respective headers
            // case OTHER_DOCUMENT_TYPE -> headers = List.of(/* Other Enum Values Here */);
            default -> throw new IllegalArgumentException("Unsupported document type: " + documentsEnum);
        }

        // Create header row with thick borders and text formatting
        Row headerRow = sheet.createRow(0);
        int columnIndex = 0;
        for (String header : headers) {
            Cell cell = headerRow.createCell(columnIndex);
            cell.setCellValue(header);
            cell.setCellStyle(headerStyle); // Apply header style with thick border

            // Apply text format to the entire column
            sheet.setDefaultColumnStyle(columnIndex, textStyle);
            columnIndex++;
        }

        // Set column width for better readability
        for (int i = 0; i < columnIndex; i++) {
            sheet.autoSizeColumn(i);
        }

        // Convert to byte array
        ByteArrayOutputStream bos = new ByteArrayOutputStream();
        workbook.write(bos);
        workbook.close();
        return bos.toByteArray();
    }

    public FileValidationResult validateExcelFile(InputStream excelFile, DocumentsEnum documentsEnum) throws IOException {
        Workbook workbook = new XSSFWorkbook(excelFile);
        Sheet sheet = workbook.getSheetAt(0);

        // Choose the enum based on document type
        Enum<?>[] headersEnum;
        switch (documentsEnum) {
            case USERS -> headersEnum = UploadUsersEnum.values();
            // Add cases for other document types with their specific enum
            // case ANOTHER_DOCUMENT_TYPE -> headersEnum = AnotherDocumentEnum.values();
            default -> throw new IllegalArgumentException("Unsupported document type: " + documentsEnum);
        }

        List<FileValidationRow> fileValidationRows = validateRows(sheet, headersEnum);
        workbook.close();

        return new FileValidationResult(fileValidationRows);
    }

    private List<FileValidationRow> validateRows(Sheet sheet, Enum<?>[] headersEnum) {
        List<FileValidationRow> fileValidationRows = new ArrayList<>();

        // Loop through each row starting from row 1 (skip header)
        for (int rowIndex = 1; rowIndex <= sheet.getLastRowNum(); rowIndex++) {
            Row row = sheet.getRow(rowIndex);
            if (row == null) continue;

            List<FileValidationCell> cells = new ArrayList<>();
            int cellIndex = 0;

            // Loop through headersEnum dynamically to add validation per header field
            for (Enum<?> header : headersEnum) {
                String cellValue = getCellValue(row, cellIndex);
                FileValidationCell validationData = validateCellBasedOnEnum(header, cellValue, row);
                cells.add(validationData);
                cellIndex++;
            }
            fileValidationRows.add(new FileValidationRow(rowIndex, cells));
        }
        return fileValidationRows;
    }

    private String getCellValue(Row row, int cellIndex) {
        Cell cell = row.getCell(cellIndex, Row.MissingCellPolicy.CREATE_NULL_AS_BLANK);
        return cell.toString().trim();
    }

    private FileValidationCell validateCellBasedOnEnum(Enum<?> header, String value, Row row) {
        String headerName = header.name();

        return switch (headerName) {
            case "NAME" -> validateName(value);
            case "SURNAME" -> validateSurname(value);
            case "ID_NUMBER" -> validateIDNumber(value, getCellValue(row, UploadUsersEnum.BRANCH_NAME.ordinal()));
            case "EMAIL_ADDRESS" -> validateEmail(value);
            case "MOBILE_NUMBER" -> validateMobileNumber(value);
            case "GENDER" -> validateGender(value);
            case "BRANCH_NAME" -> validateBranchName(value);
            case "PERFORMANCE_MANAGER" -> validatePerformanceManager(value, getCellValue(row, UploadUsersEnum.BRANCH_NAME.ordinal()));
            default -> throw new IllegalArgumentException("Unknown header: " + headerName);
        };
    }

    private FileValidationCell validateName(String name) {
        if (!Pattern.matches("^(?! )[A-Za-z]{2,}( [A-Za-z]+)?$", name)) {
            return new FileValidationCell(UploadUsersEnum.NAME.name(), name, false, "Invalid name. Use 3+ letters, max one space, no special characters or extra spaces.");
        }

        return new FileValidationCell(UploadUsersEnum.NAME.name(), name, true, null);
    }

    private FileValidationCell validateSurname(String surname) {
        if (!Pattern.matches("^(?! )[A-Za-z]{2,}( [A-Za-z]+){0,2}$", surname)) {
            return new FileValidationCell(UploadUsersEnum.SURNAME.name(), surname, false, "Invalid surname. Use 3+ letters, max two space, no special characters or extra spaces.");
        }

        return new FileValidationCell(UploadUsersEnum.SURNAME.name(), surname, true, null);
    }

    private FileValidationCell validateIDNumber(String idNumber, String branchName) {
        if (!Pattern.matches("\\d+", idNumber)) {
            return new FileValidationCell(UploadUsersEnum.ID_NUMBER.name(), idNumber, false, "Must contain only numeric characters");
        }

        try {
            BranchEnum branchEnum = BranchEnum.branchEnumFromString(branchName);
             Branch branch = branchService.findByBranchName(branchEnum);
             Country country = countryService.findByCountryNo(branch.getCountryNo());
             String countryCode = country.getCountryCode();

            String validationPattern = switch (countryCode) {
                case "ZA" -> idValidationProps.SOUTH_AFRICAN_ID_VALIDATION;
                case "BW" -> idValidationProps.BOTSWANA_ID_VALIDATION;
                case "NA" -> idValidationProps.NAMIBIAN_ID_VALIDATION;
                default -> null;
            };

            if (validationPattern == null) {
                return new FileValidationCell(UploadUsersEnum.ID_NUMBER.name(), idNumber, false, "Used '" + branchName + "' as reference. Country not found.");
            }

            if (!Pattern.matches(validationPattern, idNumber)) {
                return new FileValidationCell(UploadUsersEnum.ID_NUMBER.name(), idNumber, false, "Used '" + branchName + "' as reference. Invalid ID Number.");
            }

        } catch (Exception e) {
            return new FileValidationCell(UploadUsersEnum.ID_NUMBER.name(), idNumber, false, "Used '" + branchName + "' as reference. Failed to find Branch or Country");
        }

        return new FileValidationCell(UploadUsersEnum.ID_NUMBER.name(), idNumber, true, null);
    }

    private FileValidationCell validateEmail(String email) {
        if (!Pattern.matches("^[\\w.%+-]+@[\\w.-]+\\.[A-Za-z]{2,6}$", email)) {
            return new FileValidationCell(UploadUsersEnum.EMAIL_ADDRESS.name(), email, false, "Invalid email format.");
        }

        return new FileValidationCell(UploadUsersEnum.EMAIL_ADDRESS.name(), email, true, null);
    }

    private FileValidationCell validateMobileNumber(String mobile) {
        if (!Pattern.matches("^0\\d{9,14}$", mobile)) {
            return new FileValidationCell(UploadUsersEnum.MOBILE_NUMBER.name(), mobile, false, "Invalid mobile number format. Number must start with '0' and between 10-15 characters");
        }

        return new FileValidationCell(UploadUsersEnum.MOBILE_NUMBER.name(), mobile, true, null);
    }

    private FileValidationCell validateGender(String gender) {
        if (!gender.equals("Male") && !gender.equals("Female")) {
            return new FileValidationCell(UploadUsersEnum.GENDER.name(), gender, false, "Only 'Male' or 'Female' is allowed.");
        }

        return new FileValidationCell(UploadUsersEnum.GENDER.name(), gender, true, null);
    }

    private FileValidationCell validateBranchName(String branchName) {
        if (!Pattern.matches("^[A-Z]+$", branchName)) {
            return new FileValidationCell(UploadUsersEnum.BRANCH_NAME.name(), branchName, false, "Invalid branch name format.");
        }

        try {
            BranchEnum branchEnum = BranchEnum.branchEnumFromString(branchName);
            branchService.validateBranchName(branchEnum);
        } catch (Exception e) {
            return new FileValidationCell(UploadUsersEnum.BRANCH_NAME.name(), branchName, false, "Could not find Branch Name.");
        }


        return new FileValidationCell(UploadUsersEnum.BRANCH_NAME.name(), branchName, true, null);
    }

    private FileValidationCell validatePerformanceManager(String performanceManagerUsername, String branchName) {
        if (performanceManagerUsername.isEmpty()) {
            return new FileValidationCell(UploadUsersEnum.PERFORMANCE_MANAGER.name(), "N/A", true, null);
        }

        if (!Pattern.matches("^[A-Z]{3} [A-Z]+ [A-Z]+$", performanceManagerUsername)) {
            return new FileValidationCell(UploadUsersEnum.PERFORMANCE_MANAGER.name(), performanceManagerUsername, false, "Invalid format. Use: 'XXX YYY ZZZ' with uppercase letters and two spaces.");
        }

        try {
            Employee employee = employeeService.findByUsername(performanceManagerUsername);

            try {
                BranchEnum branchEnum = BranchEnum.branchEnumFromString(branchName);
                branchService.findByBranchName(branchEnum);
            } catch (Exception exception) {
                return new FileValidationCell(UploadUsersEnum.PERFORMANCE_MANAGER.name(), performanceManagerUsername, false, "Could not find Branch Name.");
            }

            if (!branchName.equals(employee.getBranch().getBranchName().name())) {
                return new FileValidationCell(UploadUsersEnum.PERFORMANCE_MANAGER.name(), performanceManagerUsername, false, "Performance Manager cannot be from a different branch.");
            }

            return new FileValidationCell(UploadUsersEnum.PERFORMANCE_MANAGER.name(), "N/A", true, null);

        } catch ( Exception exception) {
            return new FileValidationCell(UploadUsersEnum.PERFORMANCE_MANAGER.name(), performanceManagerUsername, false, "Could not find Performance Manager.");
        }
    }
}
