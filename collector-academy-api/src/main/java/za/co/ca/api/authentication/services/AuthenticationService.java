package za.co.ca.api.authentication.services;

import lombok.RequiredArgsConstructor;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.AuthenticationException;
import org.springframework.stereotype.Service;
import za.co.ca.api.authentication.enums.ConfirmationTokenTypeEnum;
import za.co.ca.api.authentication.models.ConfirmationToken;
import za.co.ca.api.authentication.models.ConfirmationTokenType;
import za.co.ca.api.authentication.payloads.requests.LoginRequest;
import za.co.ca.api.authentication.payloads.requests.OneTimePinRequest;
import za.co.ca.api.authentication.payloads.requests.PasswordForgotRequest;
import za.co.ca.api.authentication.payloads.requests.PasswordResetRequest;
import za.co.ca.api.authentication.payloads.responses.AuthenticatedResponse;
import za.co.ca.api.authentication.payloads.responses.ConfirmationTokenResponse;
import za.co.ca.api.authentication.payloads.responses.GeneralAPIResponse;
import za.co.ca.api.common.enums.EmployeeTypeEnum;
import za.co.ca.api.common.exceptions.InvalidCredentialsException;
import za.co.ca.api.common.models.Employee;
import za.co.ca.api.common.models.Password;
import za.co.ca.api.common.services.EmployeeService;
import za.co.ca.api.common.services.PasswordHistoryService;
import za.co.ca.api.common.services.PasswordService;
import za.co.ca.api.communication.enums.CommunicationMethodEnum;
import za.co.ca.api.communication.enums.CommunicationParseDataEnum;
import za.co.ca.api.communication.enums.CommunicationTypeEnum;
import za.co.ca.api.communication.models.CommunicationTemplate;
import za.co.ca.api.communication.payloads.requests.CommunicationDataRequest;
import za.co.ca.api.communication.services.CommunicationService;
import za.co.ca.api.communication.services.CommunicationTemplateService;
import za.co.ca.api.authentication.payloads.requests.*;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

/**
 * @author Hanno Seegers
 */
@Service
@RequiredArgsConstructor
public class AuthenticationService {

    private final AuthenticationManager authenticationManager;
    private final JwtService jwtService;

    private final EmployeeService employeeService;
    private final ConfirmationTokenService confirmationTokenService;
    private final ConfirmationTokenTypeService confirmationTokenTypeService;
    private final OneTimePinService oneTimePinService;
    private final PasswordService passwordService;
    private final PasswordHistoryService passwordHistoryService;
    private final CommunicationService communicationService;
    private final CommunicationTemplateService communicationTemplateService;

    public Object loginUser(OneTimePinRequest oneTimePinRequest) {
        String token = oneTimePinRequest.getConfirmation_token();
        Integer otp = oneTimePinRequest.getOne_time_pin();

        ConfirmationToken confirmationToken = confirmationTokenService.getValidConfirmationToken(token);
        oneTimePinService.isValidOneTimePin(confirmationToken.getConfirmationTokenNo(), otp);

        Employee employee = employeeService.findByEmployeeNo(confirmationToken.getEmployeeNo());

        confirmationTokenService.validateAndSaveConfirmationToken(confirmationToken, employee.getEmployeeNo(), employee.getBranch().getBranchNo());

        ConfirmationTokenType confirmationTokenType = confirmationTokenTypeService.findByConfirmationTokenTypeNo(confirmationToken.getConfirmationTokenTypeNo());

        Boolean isValidPassword = passwordService.isValidPassword(employee.getPasswordData().getPasswordNo());
        Boolean isEmployeeConfirmed = employee.getConfirmed();
        boolean isForgotPassword = confirmationTokenType.getConfirmationTokenType().equals(ConfirmationTokenTypeEnum.PASSWORD_FORGOT);

        if (!isValidPassword || !isEmployeeConfirmed || isForgotPassword) {
            ConfirmationToken passwordResetConfirmationToken = confirmationTokenService.generateAndSaveConfirmationToken(employee, ConfirmationTokenTypeEnum.PASSWORD_RESET);

            return ConfirmationTokenResponse.builder()
                    .confirmation_token(passwordResetConfirmationToken.getConfirmationToken())
                    .confirmation_token_type(ConfirmationTokenTypeEnum.PASSWORD_RESET)
                    .confirmation_token_expiry_date(passwordResetConfirmationToken.getConfirmationTokenExpiryDate())
                    .build();
        }

        return jwtService.generateJwtToken(employee);
    }

    public Object generateAndSendLoginConfirmationToken(LoginRequest loginRequest) throws Exception {
        String username = loginRequest.getUsername().trim().toUpperCase();
        String password = loginRequest.getPassword();

        Employee employee = employeeService.findByUsername(username, true);

        try {
            authenticationManager.authenticate(new UsernamePasswordAuthenticationToken(username, password));
        } catch(AuthenticationException exception) {
            throw new InvalidCredentialsException("Incorrect Username or Password");
        }

        if (!employee.isEnabled()) {
            throw new InvalidCredentialsException("Incorrect Username or Password");
        }

        if (employee.getEmployeeType().getEmployeeType().equals(EmployeeTypeEnum.DEVELOPER) && employee.getConfirmed()) {
            return jwtService.generateJwtToken(employee);
        }

        ConfirmationToken confirmationToken = confirmationTokenService.generateAndSaveConfirmationToken(employee, ConfirmationTokenTypeEnum.ONE_TIME_PIN);

        oneTimePinService.generateAndSendOneTimePin(confirmationToken.getConfirmationTokenNo(), employee, employee.getEmployeeNo(), employee.getBranch().getBranchNo());

        return ConfirmationTokenResponse.builder()
                .confirmation_token(confirmationToken.getConfirmationToken())
                .confirmation_token_type(ConfirmationTokenTypeEnum.ONE_TIME_PIN)
                .confirmation_token_expiry_date(confirmationToken.getConfirmationTokenExpiryDate())
                .build();
    }

    public AuthenticatedResponse resetPasswordAndAuthenticateEmployee(PasswordResetRequest passwordResetRequest) throws Exception {
        String token = passwordResetRequest.getConfirmation_token();
        String resetPassword = passwordResetRequest.getPassword();
        String confirmedResetPassword = passwordResetRequest.getConfirmed_password();

        ConfirmationToken passwordResetConfirmationToken = confirmationTokenService.getValidConfirmationToken(token);
        Employee employee = employeeService.findByEmployeeNo(passwordResetConfirmationToken.getEmployeeNo());
        Password password = passwordService.findByPasswordNo(employee.getPasswordData().getPasswordNo());

        passwordService.isValidResetPassword(resetPassword, confirmedResetPassword, password);

        if (!employee.getConfirmed()) {
            employee.setConfirmed(true);

            employeeService.updateEmployee(employee);
        }

        passwordHistoryService.insertPasswordHistory(password);
        passwordService.updatePassword(password, resetPassword, employee.getEmployeeNo(), employee.getBranch().getBranchNo());

        confirmationTokenService.validateAndSaveConfirmationToken(passwordResetConfirmationToken, employee.getEmployeeNo(), employee.getBranch().getBranchNo());

        CommunicationTemplate communicationTemplate = communicationTemplateService.getCommunicationTemplate(CommunicationMethodEnum.SMS, CommunicationTypeEnum.PASSWORD_UPDATED);

        List<CommunicationDataRequest> communicationDataRequestList = new ArrayList<CommunicationDataRequest>();

        Map<CommunicationParseDataEnum, String> placeholders = new HashMap<>();
        placeholders.put(CommunicationParseDataEnum.USERNAME, employee.getUsername());

        communicationDataRequestList.add(
                CommunicationDataRequest.builder()
                        .employeeNo(employee.getEmployeeNo())
                        .branchNo(employee.getBranch().getBranchNo())
                        .destination(employee.getMobileNumber())
                        .parseData(placeholders)
                        .build()
        );

        communicationService.requestCommunication(communicationTemplate, communicationDataRequestList, employee.getBranch().getBranchNo(), employee.getEmployeeNo(), employee.getBranch().getBranchNo());

        return jwtService.generateJwtToken(employee);
    }

    public ConfirmationTokenResponse generateAndSendPasswordForgotConfirmationToken(PasswordForgotRequest passwordForgotRequest) throws Exception {
        String usernameOrEmail = passwordForgotRequest.getUsername_or_email();

        Employee employee = employeeService.getEmployeeByUsernameOrEmail(usernameOrEmail);

        ConfirmationToken confirmationToken = confirmationTokenService.generateAndSaveConfirmationToken(employee, ConfirmationTokenTypeEnum.PASSWORD_FORGOT);

        oneTimePinService.generateAndSendOneTimePin(confirmationToken.getConfirmationTokenNo(), employee, employee.getEmployeeNo(), employee.getBranch().getBranchNo());

        return ConfirmationTokenResponse.builder()
                .confirmation_token(confirmationToken.getConfirmationToken())
                .confirmation_token_type(ConfirmationTokenTypeEnum.PASSWORD_FORGOT)
                .confirmation_token_expiry_date(confirmationToken.getConfirmationTokenExpiryDate())
                .build();
    }

    public GeneralAPIResponse verifyConfirmationToken(String confirmationToken) {

        confirmationTokenService.isValidConfirmationToken(confirmationToken);

        return GeneralAPIResponse.builder()
                .message("Valid Confirmation Token")
                .build();
    }
}
