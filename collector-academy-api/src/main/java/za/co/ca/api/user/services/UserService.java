package za.co.ca.api.user.services;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import za.co.ca.api.authentication.models.AuthenticatedEmployee;
import za.co.ca.api.authentication.payloads.responses.GeneralAPIResponse;
import za.co.ca.api.authentication.services.AuthenticatedService;
import za.co.ca.api.common.enums.BranchEnum;
import za.co.ca.api.common.enums.EmployeeTypeEnum;
import za.co.ca.api.common.enums.GenderEnum;
import za.co.ca.api.common.exceptions.DataNotFoundException;
import za.co.ca.api.common.exceptions.InvalidCredentialsException;
import za.co.ca.api.communication.enums.CommunicationMethodEnum;
import za.co.ca.api.communication.enums.CommunicationParseDataEnum;
import za.co.ca.api.communication.enums.CommunicationTypeEnum;
import za.co.ca.api.communication.models.CommunicationTemplate;
import za.co.ca.api.communication.payloads.requests.CommunicationDataRequest;
import za.co.ca.api.communication.services.CommunicationService;
import za.co.ca.api.communication.services.CommunicationTemplateService;
import za.co.ca.api.document.enums.DocumentsEnum;
import za.co.ca.api.document.models.FileValidationCell;
import za.co.ca.api.document.models.FileValidationResult;
import za.co.ca.api.document.models.FileValidationRow;
import za.co.ca.api.document.services.ExcelService;
import za.co.ca.api.user.payloads.requests.UserInsertRequest;
import za.co.ca.api.user.payloads.requests.UserPasswordResetRequest;
import za.co.ca.api.user.payloads.requests.UserUpdateRequest;
import za.co.ca.api.user.payloads.responses.UploadUserStatusResponse;
import za.co.ca.api.user.payloads.responses.UserDataResponse;
import za.co.ca.api.common.models.Branch;
import za.co.ca.api.common.models.Employee;
import za.co.ca.api.common.models.EmployeeType;
import za.co.ca.api.common.models.Gender;
import za.co.ca.api.common.models.Password;
import za.co.ca.api.common.services.BranchService;
import za.co.ca.api.common.services.EmployeeService;
import za.co.ca.api.common.services.EmployeeTypeService;
import za.co.ca.api.common.services.GenderService;
import za.co.ca.api.common.services.PasswordService;
import za.co.ca.api.common.models.*;
import za.co.ca.api.common.services.*;

import java.io.IOException;
import java.io.InputStream;
import java.security.SecureRandom;
import java.util.*;

/**
 * @author Hanno Seegers
 */
@Service
@RequiredArgsConstructor
public class UserService {

    private final AuthenticatedService authenticatedService;
    private final EmployeeService employeeService;
    private final EmployeeTypeService employeeTypeService;
    private final CommunicationTemplateService communicationTemplateService;
    private final CommunicationService communicationService;
    private final PasswordService passwordService;
    private final GenderService genderService;
    private final BranchService branchService;
    private final ExcelService excelService;

    public GeneralAPIResponse resetEmployeePassword(Integer employeeNo) throws Exception {
        AuthenticatedEmployee authenticatedEmployee = authenticatedService.getAuthenticatedEmployeeDetails();

        Employee employee = employeeService.findByEmployeeNo(employeeNo);
        Password password = employee.getPasswordData();
        String temporaryPassword = generateTemporaryPassword().toString();

        CommunicationTemplate communicationTemplate = communicationTemplateService.getCommunicationTemplate(CommunicationMethodEnum.SMS, CommunicationTypeEnum.PASSWORD_RESET);

        List<CommunicationDataRequest> communicationDataRequestList = new ArrayList<CommunicationDataRequest>();

        Map<CommunicationParseDataEnum, String> placeholders = new HashMap<>();
        placeholders.put(CommunicationParseDataEnum.USERNAME, employee.getUsername());
        placeholders.put(CommunicationParseDataEnum.TEMPORARY_PASSWORD, temporaryPassword);

        communicationDataRequestList.add(
                CommunicationDataRequest.builder()
                        .employeeNo(employee.getEmployeeNo())
                        .branchNo(employee.getBranch().getBranchNo())
                        .destination(employee.getMobileNumber())
                        .parseData(placeholders)
                        .build()
        );

        communicationService.requestCommunication(communicationTemplate, communicationDataRequestList, employee.getBranch().getBranchNo(), employee.getEmployeeNo(), employee.getBranch().getBranchNo());

        employee.setConfirmed(false);
        employee.setTouchEmployeeNo(authenticatedEmployee.getEmployeeNo());
        employee.setTouchBranchNo(authenticatedEmployee.getBranchNo());
        employeeService.updateEmployee(employee);

        passwordService.updatePassword(password, temporaryPassword, authenticatedEmployee.getEmployeeNo(), authenticatedEmployee.getBranchNo());

        return GeneralAPIResponse.builder()
                .message("Successfully Reset Employee Password")
                .build();
    }

    public byte[] generateExcelWithHeaders(DocumentsEnum documentsEnum) throws IOException {
        return excelService.generateExcelWithHeaders(documentsEnum);
    }

    public FileValidationResult validateExcelFile(InputStream excelFile, DocumentsEnum documentsEnum) throws IOException {
       return excelService.validateExcelFile(excelFile, documentsEnum);
    }

    public UploadUserStatusResponse saveUserUpload(FileValidationResult fileValidationResult) throws Exception {
        if (!fileValidationResult.getAllRowsValid()) {
            throw new InvalidCredentialsException("Invalid File Data");
        }

        AuthenticatedEmployee authenticatedEmployee = authenticatedService.getAuthenticatedEmployeeDetails();

        // Create & Insert employees
        UploadUserStatusResponse uploadUserStatusResponse = new UploadUserStatusResponse();
        List<UserDataResponse> successfulUserUploads = new ArrayList<UserDataResponse>();
        List<UserDataResponse> failedUserUploads = new ArrayList<UserDataResponse>();

        for (FileValidationRow fileValidationRow : fileValidationResult.getRows()) {

            UserDataResponse userDataResponse = getUploadUserDataResponse(fileValidationRow);

            try {
                if (userDataResponse.getErrors() != null && !userDataResponse.getErrors().isEmpty()) {
                    throw new DataNotFoundException("Unable find all headers");
                }

                // ================================= ==================================
                // REPEATING CODE. COMPRESS INTO ONE
                // ===================================================================
                Branch employeeBranch = getEmployeeBranch(userDataResponse.getBranchName());
                String employeeUsername = getEmployeeUsername(employeeBranch.getBranchAbbreviation(), userDataResponse.getName(), userDataResponse.getSurname());
                Gender employeeGender = getEmployeeGender(userDataResponse.getGender());
                EmployeeType employeeType = getEmployeeType(EmployeeTypeEnum.LEARNER);

                userDataResponse.setBranchNo(employeeBranch.getBranchNo());
                userDataResponse.setUsername(employeeUsername);
                userDataResponse.setGenderNo(employeeGender.getGenderNo());
                userDataResponse.setPassword(generateTemporaryPassword().toString());
                userDataResponse.setEmployeeTypeNo(employeeType.getEmployeeTypeNo());
                userDataResponse.setEmployeeType(employeeType.getEmployeeType().name());

                Password employeePassword = getEmployeePassword(userDataResponse.getPassword(), authenticatedEmployee.getEmployeeNo(), authenticatedEmployee.getBranchNo());

                if (Objects.equals(userDataResponse.getPerformanceManagerUsername(), "N/A")) {
                    userDataResponse.setPerformanceManagerEmployeeNo(1);
                } else {
                    Employee performanceManagerEmployee = getPerformanceManagerEmployee(userDataResponse.getPerformanceManagerUsername());
                    userDataResponse.setPerformanceManagerEmployeeNo(performanceManagerEmployee.getEmployeeNo());
                }

                Employee employee = Employee.builder()
                        .branch(employeeBranch)
                        .username(employeeUsername)
                        .name(userDataResponse.getName())
                        .surname(userDataResponse.getSurname())
                        .idNumber(userDataResponse.getIdNumber())
                        .emailAddress(userDataResponse.getEmailAddress())
                        .mobileNumber(userDataResponse.getMobileNumber())
                        .gender(employeeGender)
                        .password(employeePassword)
                        .employeeType(employeeType)
                        .performanceManagerEmployeeNo(userDataResponse.getPerformanceManagerEmployeeNo())
                        .systemEmployeeNo(authenticatedEmployee.getEmployeeNo())
                        .systemBranchNo(authenticatedEmployee.getBranchNo())
                        .build();

                passwordService.insertPassword(employeePassword);
                employeeService.insertEmployee(employee);
                // ===================================================================

                userDataResponse.setEmployeeNo(employee.getEmployeeNo());

                successfulUserUploads.add(userDataResponse);
            } catch (Exception exception) {
                failedUserUploads.add(userDataResponse);
            }
        }

        //  Send communication to each employee
        CommunicationTemplate communicationTemplate = communicationTemplateService.getCommunicationTemplate(CommunicationMethodEnum.SMS, CommunicationTypeEnum.USER_CREATED);
        List<Integer> uniqueBranchNumbers = getUniqueBranchNumbers(successfulUserUploads);

        for (Integer uniqueBranchNumber : uniqueBranchNumbers) {
            List<CommunicationDataRequest> communicationDataRequestList = new ArrayList<CommunicationDataRequest>();

            for (UserDataResponse employeeData : successfulUserUploads) {
                Map<CommunicationParseDataEnum, String> placeholders = new HashMap<>();
                placeholders.put(CommunicationParseDataEnum.NAME, employeeData.getName());
                placeholders.put(CommunicationParseDataEnum.SURNAME, employeeData.getSurname());
                placeholders.put(CommunicationParseDataEnum.USERNAME, employeeData.getUsername());
                placeholders.put(CommunicationParseDataEnum.TEMPORARY_PASSWORD, employeeData.getPassword());

                communicationDataRequestList.add(
                        CommunicationDataRequest.builder()
                                .employeeNo(employeeData.getEmployeeNo())
                                .branchNo(employeeData.getBranchNo())
                                .destination(employeeData.getMobileNumber())
                                .parseData(placeholders)
                                .build()
                );
            }

            communicationService.requestCommunication(communicationTemplate, communicationDataRequestList, uniqueBranchNumber, authenticatedEmployee.getEmployeeNo(), authenticatedEmployee.getBranchNo());
        }

        uploadUserStatusResponse.setSuccessfulUserUploads(successfulUserUploads);
        uploadUserStatusResponse.setFailedUserUploads(failedUserUploads);

        return uploadUserStatusResponse;
    }

    public UserDataResponse getUserByEmployeeNo(Integer employeeNo) {
        Employee employee = employeeService.findByEmployeeNo(employeeNo);

        return UserDataResponse.builder()
                .employeeNo(employee.getEmployeeNo())
                .employeeTypeNo(employee.getEmployeeType().getEmployeeTypeNo())
                .employeeType(employee.getEmployeeType().getEmployeeType().name())
                .username(employee.getUsername())
                .name(employee.getName())
                .surname(employee.getSurname())
                .idNumber(employee.getIdNumber())
                .emailAddress(employee.getEmailAddress())
                .mobileNumber(employee.getMobileNumber())
                .genderNo(employee.getGender().getGenderNo())
                .gender(employee.getGender().getGender().name())
                .branchNo(employee.getBranch().getBranchNo())
                .branchName(employee.getBranch().getBranchName().name())
                .build();
    }

    public List<UserDataResponse> getAllUsers() {
        AuthenticatedEmployee authenticatedEmployee = authenticatedService.getAuthenticatedEmployeeDetails();

        List<Employee> employees = switch (authenticatedEmployee.getEmployeeType()) {
            case DEVELOPER -> employeeService.findAllByDeveloper();
            case SUPERUSER -> employeeService.findAllBySuperUser();
            case BRANCH_MANAGER -> employeeService.findAllByBranchManager(authenticatedEmployee.getBranchNo());
            case PERFORMANCE_MANAGER -> employeeService.findAllByPerformanceManager(authenticatedEmployee.getBranchNo(), authenticatedEmployee.getPerformanceManagerEmployeeNo());
            case LEARNER -> Collections.singletonList(employeeService.findByEmployeeNo(authenticatedEmployee.getEmployeeNo()));
        };

        List<UserDataResponse> userDataResponses = new ArrayList<UserDataResponse>();

        for (Employee employee : employees) {

            Integer performanceManagerEmployeeNo = 1;
            String performanceManagerUsername = "N/A";

            if (employee.getPerformanceManagerEmployeeNo() != 1) {
                Employee performanceManagerEmployee = employeeService.findByEmployeeNo(employee.getPerformanceManagerEmployeeNo());

                performanceManagerEmployeeNo = performanceManagerEmployee.getEmployeeNo();
                performanceManagerUsername = performanceManagerEmployee.getUsername();
            }

            UserDataResponse userDataResponse = UserDataResponse.builder()
                    .employeeNo(employee.getEmployeeNo())
                    .employeeTypeNo(employee.getEmployeeType().getEmployeeTypeNo())
                    .employeeType(employee.getEmployeeType().getEmployeeType().name())
                    .performanceManagerEmployeeNo(performanceManagerEmployeeNo)
                    .performanceManagerUsername(performanceManagerUsername)
                    .username(employee.getUsername())
                    .name(employee.getName())
                    .surname(employee.getSurname())
                    .idNumber(employee.getIdNumber())
                    .emailAddress(employee.getEmailAddress())
                    .mobileNumber(employee.getMobileNumber())
                    .genderNo(employee.getGender().getGenderNo())
                    .gender(employee.getGender().getGender().name())
                    .branchNo(employee.getBranch().getBranchNo())
                    .branchName(employee.getBranch().getBranchName().name())
                    .build();
            userDataResponses.add(userDataResponse);
        }

        return userDataResponses;
    }

    public UserDataResponse userInsert(UserInsertRequest userInsertRequest) throws Exception {
        /// ADD ERROR HANDLING AND INSERT INTO ERROR OBJECT OF RETURN VALUE
        AuthenticatedEmployee authenticatedEmployee = authenticatedService.getAuthenticatedEmployeeDetails();

        // ===================================================================
        // REPEATING CODE. COMPRESS INTO ONE
        // ===================================================================
        // Pass in the UserDataResponse and return it.
        Branch branch = branchService.findByBranchNo(userInsertRequest.getBranchNo());
        String username = getEmployeeUsername(branch.getBranchAbbreviation(), userInsertRequest.getName(), userInsertRequest.getSurname());
        Gender gender = genderService.findByGenderNo(userInsertRequest.getGenderNo());

        String temporaryPassword = generateTemporaryPassword().toString();
        Password password = getEmployeePassword(temporaryPassword, authenticatedEmployee.getEmployeeNo(), authenticatedEmployee.getBranchNo());

        EmployeeType employeeType = employeeTypeService.findByEmployeeTypeNo(userInsertRequest.getEmployeeTypeNo());

        Employee employee = Employee.builder()
                .branch(branch)
                .username(username)
                .name(userInsertRequest.getName())
                .surname(userInsertRequest.getSurname())
                .idNumber(userInsertRequest.getIdNumber())
                .emailAddress(userInsertRequest.getEmailAddress())
                .mobileNumber(userInsertRequest.getMobileNumber())
                .gender(gender)
                .password(password)
                .employeeType(employeeType)
                .performanceManagerEmployeeNo(userInsertRequest.getPerformanceManagerEmployeeNo())
                .systemEmployeeNo(authenticatedEmployee.getEmployeeNo())
                .systemBranchNo(authenticatedEmployee.getBranchNo())
                .build();

        passwordService.insertPassword(password);
        employeeService.insertEmployee(employee);
        // ===================================================================

        // ===================================================================
        // REPEATING CODE. COMPRESS INTO ONE
        // ===================================================================
        CommunicationTemplate communicationTemplate = communicationTemplateService.getCommunicationTemplate(CommunicationMethodEnum.SMS, CommunicationTypeEnum.USER_CREATED);

        List<CommunicationDataRequest> communicationDataRequestList = new ArrayList<CommunicationDataRequest>();

        Map<CommunicationParseDataEnum, String> placeholders = new HashMap<>();
        placeholders.put(CommunicationParseDataEnum.NAME, employee.getName());
        placeholders.put(CommunicationParseDataEnum.SURNAME, employee.getSurname());
        placeholders.put(CommunicationParseDataEnum.USERNAME, employee.getUsername());
        placeholders.put(CommunicationParseDataEnum.TEMPORARY_PASSWORD, temporaryPassword);

        communicationDataRequestList.add(
                CommunicationDataRequest.builder()
                        .employeeNo(employee.getEmployeeNo())
                        .branchNo(employee.getBranch().getBranchNo())
                        .destination(employee.getMobileNumber())
                        .parseData(placeholders)
                        .build()
        );

        communicationService.requestCommunication(communicationTemplate, communicationDataRequestList, employee.getBranch().getBranchNo(), authenticatedEmployee.getEmployeeNo(), authenticatedEmployee.getBranchNo());
        // ===================================================================

        return UserDataResponse.builder()
                .employeeNo(employee.getEmployeeNo())
                .username(employee.getUsername())
                .name(employee.getName())
                .surname(employee.getSurname())
                .idNumber(employee.getIdNumber())
                .emailAddress(employee.getEmailAddress())
                .mobileNumber(employee.getMobileNumber())
                .gender(employee.getGender().getGender().name())
                .branchNo(employee.getBranch().getBranchNo())
                .branchName(branch.getBranchName().name())
                .password(temporaryPassword)
                .build();
    }

    public UserDataResponse userUpdate(Integer employeeNo, UserUpdateRequest userUpdateRequest) throws Exception {
        /// ADD ERROR HANDLING AND INSERT INTO ERROR OBJECT OF RETURN VALUE
        AuthenticatedEmployee authenticatedEmployee = authenticatedService.getAuthenticatedEmployeeDetails();

        Employee prevEmployee = employeeService.findByEmployeeNo(employeeNo);
        Branch newBranch = branchService.findByBranchNo(userUpdateRequest.getBranchNo());

        if (!prevEmployee.getBranch().getBranchNo().equals(userUpdateRequest.getBranchNo())) {
            userUpdateRequest.setUsername(userUpdateRequest.getUsername().replace(prevEmployee.getBranch().getBranchAbbreviation(), newBranch.getBranchAbbreviation()));
        }

        Gender gender = genderService.findByGenderNo(userUpdateRequest.getGenderNo());
        EmployeeType employeeType = employeeTypeService.findByEmployeeTypeNo(userUpdateRequest.getEmployeeTypeNo());

        prevEmployee.setBranch(newBranch);
        prevEmployee.setUsername(userUpdateRequest.getUsername());
        prevEmployee.setName(userUpdateRequest.getName());
        prevEmployee.setSurname(userUpdateRequest.getSurname());
        prevEmployee.setIdNumber(userUpdateRequest.getIdNumber());
        prevEmployee.setEmailAddress(userUpdateRequest.getEmailAddress());
        prevEmployee.setMobileNumber(userUpdateRequest.getMobileNumber());
        prevEmployee.setGender(gender);
        prevEmployee.setEmployeeType(employeeType);
        prevEmployee.setPerformanceManagerEmployeeNo(userUpdateRequest.getPerformanceManagerEmployeeNo());
        prevEmployee.setTouchEmployeeNo(authenticatedEmployee.getEmployeeNo());
        prevEmployee.setTouchBranchNo(authenticatedEmployee.getBranchNo());

        employeeService.updateEmployee(prevEmployee);

        Integer performanceManagerEmployeeNo = 1;
        String performanceManagerUsername = "N/A";

        if (prevEmployee.getPerformanceManagerEmployeeNo() != 1) {
            Employee performanceManagerEmployee = employeeService.findByEmployeeNo(prevEmployee.getPerformanceManagerEmployeeNo());

            performanceManagerEmployeeNo = performanceManagerEmployee.getEmployeeNo();
            performanceManagerUsername = performanceManagerEmployee.getUsername();
        }

        // ===================================================================
        // REPEATING CODE. COMPRESS INTO ONE
        // ===================================================================
        CommunicationTemplate communicationTemplate = communicationTemplateService.getCommunicationTemplate(CommunicationMethodEnum.SMS, CommunicationTypeEnum.USER_UPDATED);

        List<CommunicationDataRequest> communicationDataRequestList = new ArrayList<CommunicationDataRequest>();

        Map<CommunicationParseDataEnum, String> placeholders = new HashMap<>();
        placeholders.put(CommunicationParseDataEnum.NAME, prevEmployee.getName());
        placeholders.put(CommunicationParseDataEnum.SURNAME, prevEmployee.getSurname());
        placeholders.put(CommunicationParseDataEnum.USERNAME, prevEmployee.getUsername());

        communicationDataRequestList.add(
                CommunicationDataRequest.builder()
                        .employeeNo(prevEmployee.getEmployeeNo())
                        .branchNo(prevEmployee.getBranch().getBranchNo())
                        .destination(prevEmployee.getMobileNumber())
                        .parseData(placeholders)
                        .build()
        );

        communicationService.requestCommunication(communicationTemplate, communicationDataRequestList, prevEmployee.getBranch().getBranchNo(), authenticatedEmployee.getEmployeeNo(), authenticatedEmployee.getBranchNo());
        // ===================================================================

        return UserDataResponse.builder()
                .employeeNo(prevEmployee.getEmployeeNo())
                .employeeTypeNo(prevEmployee.getEmployeeType().getEmployeeTypeNo())
                .employeeType(prevEmployee.getEmployeeType().getEmployeeType().name())
                .performanceManagerEmployeeNo(performanceManagerEmployeeNo)
                .performanceManagerUsername(performanceManagerUsername)
                .username(prevEmployee.getUsername())
                .name(prevEmployee.getName())
                .surname(prevEmployee.getSurname())
                .idNumber(prevEmployee.getIdNumber())
                .emailAddress(prevEmployee.getEmailAddress())
                .mobileNumber(prevEmployee.getMobileNumber())
                .genderNo(prevEmployee.getGender().getGenderNo())
                .gender(prevEmployee.getGender().getGender().name())
                .branchNo(prevEmployee.getBranch().getBranchNo())
                .branchName(prevEmployee.getBranch().getBranchName().name())
                .build();
    }

    public UserDataResponse userDelete(Integer employeeNo) {
        /// ADD ERROR HANDLING AND INSERT INTO ERROR OBJECT OF RETURN VALUE
        AuthenticatedEmployee authenticatedEmployee = authenticatedService.getAuthenticatedEmployeeDetails();

        Employee employee = employeeService.findByEmployeeNo(employeeNo);

        employee.setConfirmed(false);
        employee.setActive(false);
        employee.setTouchEmployeeNo(authenticatedEmployee.getEmployeeNo());
        employee.setTouchBranchNo(authenticatedEmployee.getBranchNo());

        employeeService.updateEmployee(employee);

        return UserDataResponse.builder()
                .employeeNo(employee.getEmployeeNo())
                .username(employee.getUsername())
                .name(employee.getName())
                .surname(employee.getSurname())
                .idNumber(employee.getIdNumber())
                .emailAddress(employee.getEmailAddress())
                .mobileNumber(employee.getMobileNumber())
                .gender(employee.getGender().getGender().name())
                .branchNo(employee.getBranch().getBranchNo())
                .branchName(employee.getBranch().getBranchName().name())
                .build();
    }

    private UserDataResponse getUploadUserDataResponse(FileValidationRow fileValidationRow) {
        UserDataResponse userDataResponse = new UserDataResponse();
        List<String> errors = new ArrayList<String>();

        for (FileValidationCell fileValidationCell : fileValidationRow.getCells()) {
            switch (fileValidationCell.getHeader()) {
                case "NAME" -> userDataResponse.setName(fileValidationCell.getValue());
                case "SURNAME" -> userDataResponse.setSurname(fileValidationCell.getValue());
                case "ID_NUMBER" -> userDataResponse.setIdNumber(fileValidationCell.getValue());
                case "EMAIL_ADDRESS" -> userDataResponse.setEmailAddress(fileValidationCell.getValue());
                case "MOBILE_NUMBER" -> userDataResponse.setMobileNumber(fileValidationCell.getValue());
                case "GENDER" -> userDataResponse.setGender(fileValidationCell.getValue());
                case "BRANCH_NAME" -> userDataResponse.setBranchName(fileValidationCell.getValue());
                case "PERFORMANCE_MANAGER" -> userDataResponse.setPerformanceManagerUsername(fileValidationCell.getValue());
                default -> errors.add(fileValidationCell.getValue() == null ? "null" : fileValidationCell.getValue());
            }
        }

        if (!employeeService.isIdNumberUnique(userDataResponse.getIdNumber())) {
            errors.add("USER ALREADY EXISTS");
        }

        userDataResponse.setErrors(errors);
        return userDataResponse;
    }

    private Integer generateTemporaryPassword() {
        SecureRandom random = new SecureRandom();

        int max = (int) Math.pow(10, 6) - 1;
        int min = (int) Math.pow(10, 6 - 1);

        return min + random.nextInt(max - min + 1);
    }

    private Gender getEmployeeGender(String gender) {
        GenderEnum genderEnum = switch (gender) {
            case "Male" -> GenderEnum.Male;
            case "Female" -> GenderEnum.Female;
            default -> throw new DataNotFoundException("Gender not found");
        };

        return genderService.findByGender(genderEnum);
    }

    private Branch getEmployeeBranch(String branchName) {
        BranchEnum branchEnum = BranchEnum.branchEnumFromString(branchName);

        return branchService.findByBranchName(branchEnum);
    }

    private String getEmployeeUsername(String branchAbbreviation, String name, String surname) {
        for (int i = 1;  i < surname.length(); i++) {
            String upperAbbreviation =  branchAbbreviation.toUpperCase();
            String upperName = name.toUpperCase();
            String upperSurname = surname.toUpperCase().substring(0, i).replace(" ", "");

            String username = upperAbbreviation + " " + upperName + " " + upperSurname;

            Boolean isUsernameUnique = employeeService.isUsernameUnique(username);

            if (employeeService.isUsernameUnique(username)) {
                return username;
            }
        }

        throw new InvalidCredentialsException("Unable to create a username, Custom Username Needed");
    }

    private Password getEmployeePassword(String password, Integer touchEmployeeNo, Integer touchBranchNo) {
        return Password.builder()
                .password(password)
                .systemEmployeeNo(touchEmployeeNo)
                .systemBranchNo(touchBranchNo)
                .build();
    }

    private EmployeeType getEmployeeType(EmployeeTypeEnum employeeTypeEnum) {
        return employeeTypeService.findByEmployeeType(employeeTypeEnum);
    }

    private Employee getPerformanceManagerEmployee(String performanceManagerUsername) {
        return employeeService.findByUsername(performanceManagerUsername);
    }

    private List<Integer> getUniqueBranchNumbers(List<UserDataResponse> successfulUserUploads) {
        Set<Integer> uniqueBranchNumbers = new HashSet<>();

        for (UserDataResponse userDataResponse : successfulUserUploads) {
            uniqueBranchNumbers.add(userDataResponse.getBranchNo());
        }

        return new ArrayList<>(uniqueBranchNumbers);
    }
}
