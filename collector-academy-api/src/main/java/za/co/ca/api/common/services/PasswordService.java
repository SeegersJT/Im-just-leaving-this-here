package za.co.ca.api.common.services;

import lombok.RequiredArgsConstructor;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import za.co.ca.api.authentication.repositories.PasswordRepository;
import za.co.ca.api.common.exceptions.DataNotFoundException;
import za.co.ca.api.common.exceptions.InvalidCredentialsException;
import za.co.ca.api.common.models.Password;
import za.co.ca.api.common.models.PasswordHistory;
import za.co.ca.api.common.props.PasswordProps;

import java.util.ArrayList;
import java.util.Calendar;
import java.util.Date;
import java.util.List;

/**
 * @author Hanno Seegers
 */
@Service
@RequiredArgsConstructor
public class PasswordService {

    private final PasswordProps passwordProps;
    private final PasswordEncoder passwordEncoder;

    private final PasswordRepository passwordRepository;

    private final PasswordHistoryService passwordHistoryService;

    public Password findByPasswordNo(Integer passwordNo) {
        return passwordRepository.findByPasswordNo(passwordNo)
                .orElseThrow(() -> new DataNotFoundException("Password Not Found - '" + passwordNo + "'"));
    }

    public Boolean isValidPassword(Integer passwordNo) {
        Password password = findByPasswordNo(passwordNo);

        return !hasExpired(password.getTouchDate());
    }

    public void isValidResetPassword(String resetPassword, String confirmedResetPassword, Password password) {
        // VALID PASSWORD RULES
        if (resetPassword.length() < passwordProps.PASSWORD_CHECK_MIN_LENGTH) {
            throw new InvalidCredentialsException("Password must contain more than " + passwordProps.PASSWORD_CHECK_MIN_LENGTH.toString() + " characters.");
        }

        if (resetPassword.length() > passwordProps.PASSWORD_CHECK_MAX_LENGTH) {
            throw new InvalidCredentialsException("Password must contain less than " + passwordProps.PASSWORD_CHECK_MAX_LENGTH.toString() + " characters.");
        }

        if (!resetPassword.matches(passwordProps.PASSWORD_CHECK_HAS_ALLOWED_CHARACTERS)) {
            throw new InvalidCredentialsException("Password contains invalid characters. Only letters (a-z, A-Z), numbers (0-9), and special characters [!, @, #, $, %, &] are allowed.");
        }

        if (!resetPassword.matches(passwordProps.PASSWORD_CHECK_HAS_LOWERCASE)) {
            throw new InvalidCredentialsException("Password must contain at least one Lowercase Character.");
        }

        if (!resetPassword.matches(passwordProps.PASSWORD_CHECK_HAS_UPPERCASE)) {
            throw new InvalidCredentialsException("Password must contain at least one Uppercase Character.");
        }

        if (!resetPassword.matches(passwordProps.PASSWORD_CHECK_HAS_NUMBER)) {
            throw new InvalidCredentialsException("Password must contain at least one Number.");
        }

        if (!resetPassword.matches(passwordProps.PASSWORD_CHECK_HAS_SPECIAL)) {
            throw new InvalidCredentialsException("Password must contain at least one Special Character [!, @, #, $, %, &].");
        }

        if (!resetPassword.equals(confirmedResetPassword)) {
            throw new InvalidCredentialsException("Password and Confirmed Password do not match.");
        }

        // VALID UNIQUE PASSWORD RULE
        List<String> previouslyUsedHashedPasswords = new ArrayList<>();
        previouslyUsedHashedPasswords.add(password.getPassword());

        List<PasswordHistory> passwordHistories = passwordHistoryService.findByPasswordNo(password.getPasswordNo());

        if (!passwordHistories.isEmpty()) {
            for (PasswordHistory passwordHistory : passwordHistories) {
                previouslyUsedHashedPasswords.add(passwordHistory.getPassword());
            }
        }

        for (String hashedPassword : previouslyUsedHashedPasswords) {
            if (passwordEncoder.matches(resetPassword, hashedPassword)) {
                throw new InvalidCredentialsException("Password has already been used");
            }
        }

        // IF NO EXCEPTIONS ARE THROWN THEN THE PASSWORD IS VALID
    }

    public void updatePassword(Password password, String newPassword, Integer touchEmployeeNo, Integer touchBranchNo) {
        password.setPassword(passwordEncoder.encode(newPassword));
        password.setTouchEmployeeNo(touchEmployeeNo);
        password.setTouchBranchNo(touchBranchNo);

        savePassword(password);
    }

    public void insertPassword(Password password) {
        password.setPassword(passwordEncoder.encode(password.getPassword()));
        savePassword(password);
    }

    private void savePassword(Password password) {
        passwordRepository.save(password);
    }

    private Boolean hasExpired(Date date) {
        Calendar currentDate = Calendar.getInstance();

        currentDate.add(Calendar.MONTH, -passwordProps.PASSWORD_VALID_MONTHS);

        Date expireDate = currentDate.getTime();

        return date.before(expireDate);
    }

}
