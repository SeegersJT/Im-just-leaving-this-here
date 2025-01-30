package za.co.ca.api.authentication.controllers;

import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import za.co.ca.api.authentication.controllers.interfaces.IAuthenticationController;
import za.co.ca.api.authentication.payloads.responses.AuthenticatedResponse;
import za.co.ca.api.authentication.payloads.responses.ConfirmationTokenResponse;
import za.co.ca.api.authentication.payloads.responses.GeneralAPIResponse;
import za.co.ca.api.authentication.services.AuthenticationService;
import za.co.ca.api.authentication.payloads.requests.*;

/**
 * @author Hanno Seegers
 */
@RestController
@RequestMapping("/api/auth")
@RequiredArgsConstructor
@Slf4j
public class AuthenticationController implements IAuthenticationController {

    private final AuthenticationService authenticationService;

    @PostMapping(value = "/login", consumes = MediaType.APPLICATION_JSON_VALUE, produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<?> generateAndSendLoginConfirmationToken (
            @Valid @RequestBody LoginRequest loginRequest
    ) throws Exception {
        log.info("One Time Pin Request: Username - '{}'", loginRequest.getUsername());
        Object response = authenticationService.generateAndSendLoginConfirmationToken(loginRequest);
        return ResponseEntity.ok(response);
    }

    @PostMapping(value = "/token/one-time-pin", consumes = MediaType.APPLICATION_JSON_VALUE, produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<?> login (
            @Valid @RequestBody OneTimePinRequest oneTimePinRequest
    ) {
        log.info("One Time Pin Request: Confirmation Token - '{}'", oneTimePinRequest.getConfirmation_token());
        Object response = authenticationService.loginUser(oneTimePinRequest);
        return ResponseEntity.ok(response);
    }

    @PostMapping(value = "/token/password-reset", consumes = MediaType.APPLICATION_JSON_VALUE, produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<AuthenticatedResponse> resetPasswordAndAuthenticateEmployee (
            @Valid @RequestBody PasswordResetRequest passwordResetRequest
    ) throws Exception {
        log.info("Password Reset Confirmation Token Request: Confirmation Token - '{}'", passwordResetRequest.getConfirmation_token());
        AuthenticatedResponse response = authenticationService.resetPasswordAndAuthenticateEmployee(passwordResetRequest);
        return ResponseEntity.ok(response);
    }

    @PostMapping(value = "/token/password-forgot", consumes = MediaType.APPLICATION_JSON_VALUE, produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<ConfirmationTokenResponse> generateAndSendPasswordForgotConfirmationToken (
            @Valid @RequestBody PasswordForgotRequest passwordForgotRequest
    ) throws Exception {
        log.info("Password Forgot Confirmation Token Request: Username or Email - '{}'", passwordForgotRequest.getUsername_or_email());
        ConfirmationTokenResponse response = authenticationService.generateAndSendPasswordForgotConfirmationToken(passwordForgotRequest);
        return ResponseEntity.ok(response);
    }

    @GetMapping(value = "/token/verify", produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<GeneralAPIResponse> verifyOneTimePin (
            @Valid @RequestParam(required = true, name = "confirmationToken") String confirmationToken
    ) throws Exception {
        log.info("Verify Confirmation Token Request: Confirmation Token - '{}'", confirmationToken);
        GeneralAPIResponse response = authenticationService.verifyConfirmationToken(confirmationToken);
        return ResponseEntity.ok(response);
    }



//    @PostMapping("/register")
//    public ResponseEntity<RegisterResponse> register(@Valid @RequestBody RegisterRequest registerRequest) {
//        log.info("Register request received for email: {}", registerRequest.getEmail());
//        return authenticationService.registerUser(registerRequest);
//    }
//
//    @PostMapping(value = "/verify" , consumes = MediaType.APPLICATION_JSON_VALUE, produces = MediaType.APPLICATION_JSON_VALUE)
//    public ResponseEntity<?> verifyRegistration(@Valid @RequestBody RegisterVerifyRequest registerVerifyRequest) {
//        log.info("registration verification request received for email {}", registerVerifyRequest.getEmail());
//        return authenticationService.verifyUserRegistration(registerVerifyRequest);
//    }
//
//    @PostMapping(value = "/login", consumes = MediaType.APPLICATION_JSON_VALUE, produces = MediaType.APPLICATION_JSON_VALUE)
//    public ResponseEntity<?> login(@Valid @RequestBody LoginRequest loginRequest) {
//        log.info("login request received for email {}", loginRequest.getEmail());
//        return authenticationService.loginUser(loginRequest);
//    }
//
//    @PostMapping(value = "/send-otp", consumes = MediaType.APPLICATION_JSON_VALUE,produces = MediaType.APPLICATION_JSON_VALUE)
//    public ResponseEntity<?> forgotPassword(@Valid @RequestBody ForgotPasswordRequest forgotPasswordRequest) {
//        log.info("forgot password request received for email {}", forgotPasswordRequest.getEmail());
//        return authenticationService.resendOtp(forgotPasswordRequest);
//    }
//
//    @PostMapping(value = "/verify-otp", consumes = MediaType.APPLICATION_JSON_VALUE, produces = MediaType.APPLICATION_JSON_VALUE)
//    public ResponseEntity<?> verifyOtp(@Valid @RequestBody RegisterVerifyRequest registerVerifyRequest) {
//        log.info("OTP verification request received for email {}", registerVerifyRequest.getEmail());
//        return authenticationService.verifyOtp(registerVerifyRequest);
//    }
//
//    @PostMapping(value = "/reset-password", consumes = MediaType.APPLICATION_JSON_VALUE, produces = MediaType.APPLICATION_JSON_VALUE)
//    public ResponseEntity<?> resetPassword(@Valid @RequestBody ResetPasswordRequest resetPasswordRequest) {
//        log.info("Password reset request received for email {}", resetPasswordRequest.getEmail());
//        return authenticationService.resetPassword(resetPasswordRequest);
//    }
//
//
//    @GetMapping("/getRefreshToken")
//    public ResponseEntity<?> refreshToken(@RequestParam(name = "refreshToken") String refreshToken) {
//        log.info("Refresh token request received");
//        return jwtService.generateAccessTokenFromRefreshToken(refreshToken);
//    }
//
//    @PostMapping("/hello")
//    public ResponseEntity<?> hello() {
//        log.info("Hello request received");
//        return new ResponseEntity<>(GeneralAPIResponse.builder().message("This Api is automated, for doing cronJob so that render does not get turned off").build(), HttpStatus.OK);
//    }

}