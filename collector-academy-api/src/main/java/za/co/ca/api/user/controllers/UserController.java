package za.co.ca.api.user.controllers;

import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;
import za.co.ca.api.authentication.payloads.responses.GeneralAPIResponse;
import za.co.ca.api.document.models.FileValidationResult;
import za.co.ca.api.user.payloads.requests.UserInsertRequest;
import za.co.ca.api.user.payloads.requests.UserPasswordResetRequest;
import za.co.ca.api.user.payloads.requests.UserUpdateRequest;
import za.co.ca.api.user.payloads.responses.UploadUserStatusResponse;
import za.co.ca.api.user.payloads.responses.UserDataResponse;
import za.co.ca.api.user.services.UserService;
import za.co.ca.api.document.enums.DocumentsEnum;

import java.util.List;

/**
 * @author Hanno Seegers
 */
@RestController
@Slf4j
@RequiredArgsConstructor
@RequestMapping("/api/user")
public class UserController {

    private final UserService userService;

    @PostMapping(value = "/password-reset", produces = MediaType.APPLICATION_JSON_VALUE)
    @PreAuthorize("hasAuthority('BRANCH_MANAGER')")
    public ResponseEntity<GeneralAPIResponse> userPasswordReset(
            @Valid @RequestParam(required = true) Integer employeeNo
    ) throws Exception {
        log.info("User Password Reset Request: Employee No - '{}'", employeeNo);
        GeneralAPIResponse response = userService.resetEmployeePassword(employeeNo);
        return ResponseEntity.ok(response);
    }

    @GetMapping(value = "/file-upload/template")
    @PreAuthorize("hasAuthority('SUPERUSER')")
    public ResponseEntity<byte[]> fileUploadTemplateDownload() throws Exception {
        log.info("File Upload Template Download Request :: Document - '{}'", DocumentsEnum.USERS);
        byte[] response = userService.generateExcelWithHeaders(DocumentsEnum.USERS);
        return ResponseEntity
                .ok()
                .header(HttpHeaders.CONTENT_DISPOSITION, "attachment; filename=" + DocumentsEnum.USERS.name().toLowerCase() + "_template.xlsx")
                .contentType(MediaType.APPLICATION_OCTET_STREAM)
                .body(response);
    }

    @PostMapping(value = "/file-upload/validate")
    @PreAuthorize("hasAuthority('SUPERUSER')")
    public ResponseEntity<FileValidationResult> fileUploadUserValidate(
            @RequestParam("file") MultipartFile file
    ) throws Exception {
        log.info("File Upload Validation Request :: File Name - '{}'", file.getOriginalFilename());
        FileValidationResult response = userService.validateExcelFile(file.getInputStream(), DocumentsEnum.USERS);
        return ResponseEntity.ok(response);
    }


    @PostMapping(value = "/file-upload/save", consumes = MediaType.APPLICATION_JSON_VALUE, produces = MediaType.APPLICATION_JSON_VALUE)
    @PreAuthorize("hasAuthority('SUPERUSER')")
    public ResponseEntity<UploadUserStatusResponse> fileUploadUserSave(
            @Valid @RequestBody FileValidationResult fileValidationResult
    ) throws Exception {
        log.info("File Upload Save Request :: Document - '{}'", DocumentsEnum.USERS);
        UploadUserStatusResponse response = userService.saveUserUpload(fileValidationResult);
        return ResponseEntity.ok(response);
    }


    @GetMapping(value = "", produces = MediaType.APPLICATION_JSON_VALUE)
    @PreAuthorize("hasAuthority('PERFORMANCE_MANAGER')")
    public ResponseEntity<UserDataResponse> getUserByEmployeeNo(
            @Valid @RequestParam(required = true) Integer employeeNo
    ) throws Exception {
        log.info("User Get Request :: Employee No - '" + employeeNo + "'");
        UserDataResponse response = userService.getUserByEmployeeNo(employeeNo);
        return ResponseEntity.ok(response);
    }

    @GetMapping(value = "/all", produces = MediaType.APPLICATION_JSON_VALUE)
    @PreAuthorize("hasAuthority('PERFORMANCE_MANAGER')")
    public ResponseEntity<List<UserDataResponse>> getAllUsers() throws Exception {
        log.info("Users Get All Request");
        List<UserDataResponse> response = userService.getAllUsers();
        return ResponseEntity.ok(response);
    }

    @PostMapping(value = "", consumes = MediaType.APPLICATION_JSON_VALUE, produces = MediaType.APPLICATION_JSON_VALUE)
    @PreAuthorize("hasAuthority('SUPERUSER')")
    public ResponseEntity<UserDataResponse> userInsert(
            @Valid @RequestBody UserInsertRequest userInsertRequest
    ) throws Exception {
        log.info("User Insert Request :: ID - '" + userInsertRequest.getIdNumber() + "'");
        UserDataResponse response = userService.userInsert(userInsertRequest);
        return ResponseEntity.ok(response);
    }

    @PutMapping(value = "", consumes = MediaType.APPLICATION_JSON_VALUE, produces = MediaType.APPLICATION_JSON_VALUE)
    @PreAuthorize("hasAuthority('PERFORMANCE_MANAGER')")
    public ResponseEntity<UserDataResponse> userUpdate(
            @Valid @RequestParam(required = true) Integer employeeNo,
            @Valid @RequestBody UserUpdateRequest userUpdateRequest
    ) throws Exception {
        log.info("User Update Request :: Employee No - '" + employeeNo + "'");
        UserDataResponse response = userService.userUpdate(employeeNo, userUpdateRequest);
        return ResponseEntity.ok(response);
    }

    @DeleteMapping(value = "", produces = MediaType.APPLICATION_JSON_VALUE)
    @PreAuthorize("hasAuthority('SUPERUSER')")
    public ResponseEntity<UserDataResponse> userDelete(
            @Valid @RequestParam(required = true) Integer employeeNo
    ) throws Exception {
        log.info("User Delete Request :: Employee No - '" + employeeNo + "'");
        UserDataResponse response = userService.userDelete(employeeNo);
        return ResponseEntity.ok(response);
    }
}
