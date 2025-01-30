package za.co.ca.api.authentication.services;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import za.co.ca.api.authentication.models.ConfirmationToken;
import za.co.ca.api.authentication.models.ConfirmationTokenType;
import za.co.ca.api.authentication.repositories.ConfirmationTokenRepository;
import za.co.ca.api.common.exceptions.DataNotFoundException;
import za.co.ca.api.authentication.enums.ConfirmationTokenTypeEnum;
import za.co.ca.api.common.exceptions.InvalidCredentialsException;
import za.co.ca.api.common.models.Employee;

import java.time.Instant;
import java.time.temporal.ChronoUnit;
import java.util.Date;

/**
 * @author Hanno Seegers
 */
@Service
@RequiredArgsConstructor
public class ConfirmationTokenService {

    private final ConfirmationTokenRepository confirmationTokenRepository;
    private final ConfirmationTokenTypeService confirmationTokenTypeService;

    public ConfirmationToken findByConfirmationToken(String token) {
        return confirmationTokenRepository.findByConfirmationToken(token)
                .orElseThrow(() -> new DataNotFoundException("Confirmation Token Not Found - '" + token + "'"));
    }

    public ConfirmationToken generateAndSaveConfirmationToken(Employee employee, ConfirmationTokenTypeEnum confirmationTokenTypeEnum) {
        ConfirmationTokenType confirmationTokenType = confirmationTokenTypeService.findByConfirmationTokenType(confirmationTokenTypeEnum);

        Date expiryDate = switch (confirmationTokenTypeEnum) {
            case ONE_TIME_PIN -> Date.from(Instant.now().plus(5, ChronoUnit.MINUTES));
            case PASSWORD_RESET, PASSWORD_FORGOT -> Date.from(Instant.now().plus(1, ChronoUnit.HOURS));
            default -> throw new DataNotFoundException("Confirmation Token Not Found - '" + confirmationTokenTypeEnum.toString() + "'");
        };

        ConfirmationToken confirmationToken = generateConfirmationToken(confirmationTokenType.getConfirmationTokenTypeNo(), expiryDate, employee.getEmployeeNo(), employee.getBranch().getBranchNo());

        saveConfirmationToken(confirmationToken);

        return confirmationToken;
    }

    public void validateAndSaveConfirmationToken(ConfirmationToken confirmationToken, Integer employeeNo, Integer branchNo) {
        confirmationToken.setConfirmed(true);
        confirmationToken.setTouchEmployeeNo(employeeNo);
        confirmationToken.setTouchBranchNo(branchNo);

        saveConfirmationToken(confirmationToken);
    }

    public ConfirmationToken generateConfirmationToken(Integer confirmationTokenTypeNo, Date expiryDate, Integer employeeNo, Integer branchNo) {
        return ConfirmationToken.builder()
                .employeeNo(employeeNo)
                .confirmationTokenExpiryDate(expiryDate)
                .confirmationTokenTypeNo(confirmationTokenTypeNo)
                .systemEmployeeNo(employeeNo)
                .systemBranchNo(branchNo)
                .build();
    }

    public void saveConfirmationToken(ConfirmationToken confirmationToken) {
        confirmationTokenRepository.save(confirmationToken);
    }

    public ConfirmationToken getValidConfirmationToken(String token) {
        ConfirmationToken confirmationToken = findByConfirmationToken(token);
        ConfirmationTokenType confirmationTokenType = confirmationTokenTypeService.findByConfirmationTokenTypeNo(confirmationToken.getConfirmationTokenTypeNo());

        boolean hasTokenExpired = confirmationToken.getConfirmationTokenExpiryDate().before(new Date());
        Boolean isTokenConfirmed = confirmationToken.getConfirmed();

        if (hasTokenExpired || isTokenConfirmed) {
            throw new InvalidCredentialsException("Invalid Confirmation Token");
        }

        return confirmationToken;
    }

    public void isValidConfirmationToken(String token) {
        ConfirmationToken confirmationToken = findByConfirmationToken(token);

        boolean hasTokenExpired = confirmationToken.getConfirmationTokenExpiryDate().before(new Date());
        Boolean isTokenConfirmed = confirmationToken.getConfirmed();

        if (hasTokenExpired || isTokenConfirmed) {
            throw new InvalidCredentialsException("Invalid Confirmation Token");
        }
    }
}
