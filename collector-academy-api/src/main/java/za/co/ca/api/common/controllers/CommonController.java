package za.co.ca.api.common.controllers;

import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;
import za.co.ca.api.authentication.controllers.interfaces.IAuthenticationController;
import za.co.ca.api.authentication.payloads.responses.AuthenticatedResponse;
import za.co.ca.api.authentication.payloads.responses.ConfirmationTokenResponse;
import za.co.ca.api.authentication.payloads.responses.GeneralAPIResponse;
import za.co.ca.api.authentication.services.AuthenticationService;
import za.co.ca.api.authentication.payloads.requests.*;
import za.co.ca.api.common.controllers.interfaces.ICommonController;
import za.co.ca.api.common.models.Branch;
import za.co.ca.api.common.payload.response.BranchResponse;
import za.co.ca.api.common.payload.response.EmployeeTypeResponse;
import za.co.ca.api.common.payload.response.GenderResponse;
import za.co.ca.api.common.payload.response.PerformanceManagerResponse;
import za.co.ca.api.common.services.CommonService;
import za.co.ca.api.course.payloads.responses.CourseDifficultyResponse;

import java.util.List;

/**
 * @author Hanno Seegers
 */
@RestController
@RequestMapping("/api/common")
@RequiredArgsConstructor
@Slf4j
public class CommonController implements ICommonController {

    private final CommonService commonService;

    @GetMapping(value = "/branch/all", produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<List<BranchResponse>> getAllBranches () throws Exception {
        log.info("Get All Branches");
        List<BranchResponse> response = commonService.getAllBranches();
        return ResponseEntity.ok(response);
    }

    @GetMapping(value = "/gender/all", produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<List<GenderResponse>> getAllGenders () throws Exception {
        log.info("Get All Genders");
        List<GenderResponse> response = commonService.getAllGenders();
        return ResponseEntity.ok(response);
    }

    @GetMapping(value = "/employee-type/all", produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<List<EmployeeTypeResponse>> getAllEmployeeTypes () throws Exception {
        log.info("Get All EmployeeTypes");
        List<EmployeeTypeResponse> response = commonService.getAllEmployeeTypes();
        return ResponseEntity.ok(response);
    }

    @GetMapping(value = "/performance-manager/all", produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<List<PerformanceManagerResponse>> getAllPerformanceManagers () throws Exception {
        log.info("Get All Performance Managers");
        List<PerformanceManagerResponse> response = commonService.getAllPerformanceManagers();
        return ResponseEntity.ok(response);
    }

}