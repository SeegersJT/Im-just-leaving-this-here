package za.co.ca.api.common.services;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import za.co.ca.api.common.repositories.PasswordHistoryRepository;
import za.co.ca.api.common.models.Password;
import za.co.ca.api.common.models.PasswordHistory;

import java.util.List;

/**
 * @author Hanno Seegers
 */
@Service
@RequiredArgsConstructor
public class PasswordHistoryService {

    private final PasswordHistoryRepository passwordHistoryRepository;

    public List<PasswordHistory> findByPasswordNo(Integer passwordNo) {
        return passwordHistoryRepository.findByPasswordNo(passwordNo);
    }

    public void insertPasswordHistory(Password password) {
        PasswordHistory passwordHistory = PasswordHistory.builder()
                .password(password.getPassword())
                .passwordNo(password.getPasswordNo())
                .system_Employee_No(password.getSystemEmployeeNo())
                .system_Branch_No(password.getSystemBranchNo())
                .system_Date(password.getSystemDate())
                .touch_Employee_No(password.getTouchEmployeeNo())
                .touch_Branch_No(password.getTouchBranchNo())
                .touch_Date(password.getTouchDate())
                .build();

        savePasswordHistory(passwordHistory);
    }

    private void savePasswordHistory(PasswordHistory passwordHistory) {
        passwordHistoryRepository.save(passwordHistory);
    }
}
