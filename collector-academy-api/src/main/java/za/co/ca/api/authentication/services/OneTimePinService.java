package za.co.ca.api.authentication.services;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import za.co.ca.api.authentication.models.OneTimePin;
import za.co.ca.api.authentication.repositories.OneTimePinRepository;
import za.co.ca.api.common.exceptions.DataNotFoundException;
import za.co.ca.api.common.exceptions.InvalidCredentialsException;
import za.co.ca.api.common.models.Employee;
import za.co.ca.api.communication.enums.CommunicationMethodEnum;
import za.co.ca.api.communication.enums.CommunicationParseDataEnum;
import za.co.ca.api.communication.enums.CommunicationTypeEnum;
import za.co.ca.api.communication.models.CommunicationTemplate;
import za.co.ca.api.communication.payloads.requests.CommunicationDataRequest;
import za.co.ca.api.communication.services.CommunicationService;
import za.co.ca.api.communication.services.CommunicationTemplateService;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

/**
 * @author Hanno Seegers
 */
@Service
@RequiredArgsConstructor
@Slf4j
public class OneTimePinService {

    private final OneTimePinRepository oneTimePinRepository;

    private final CommunicationService communicationService;
    private final CommunicationTemplateService communicationTemplateService;

    public void generateAndSendOneTimePin(String confirmationTokenNo, Employee employee, Integer touchEmployeeNo, Integer touchBranchNo) throws Exception {
        OneTimePin oneTimePin = generateAndSaveOneTimePin(confirmationTokenNo, touchEmployeeNo, touchBranchNo);
        sendOneTimePin(oneTimePin, employee, touchEmployeeNo, touchBranchNo);
    }

    public OneTimePin generateAndSaveOneTimePin(String confirmationTokenNo, Integer touchEmployeeNo, Integer touchBranchNo) {
        OneTimePin oneTimePin = OneTimePin.builder()
                .confirmationTokenNo(confirmationTokenNo)
                .systemEmployeeNo(touchEmployeeNo)
                .systemBranchNo(touchBranchNo)
                .build();

        oneTimePinRepository.save(oneTimePin);

        return oneTimePin;
    }

    public void sendOneTimePin(OneTimePin oneTimePin, Employee employee, Integer touchEmployeeNo, Integer touchBranchNo) throws Exception {
        CommunicationTemplate communicationTemplate = communicationTemplateService.getCommunicationTemplate(CommunicationMethodEnum.SMS, CommunicationTypeEnum.LOGIN);

        List<CommunicationDataRequest> communicationDataRequestList = new ArrayList<CommunicationDataRequest>();

        Map<CommunicationParseDataEnum, String> placeholders = new HashMap<>();
        placeholders.put(CommunicationParseDataEnum.ONE_TIME_PIN, oneTimePin.getOneTimePin().toString());

        communicationDataRequestList.add(
                CommunicationDataRequest.builder()
                        .employeeNo(employee.getEmployeeNo())
                        .branchNo(employee.getBranch().getBranchNo())
                        .destination(employee.getMobileNumber())
                        .parseData(placeholders)
                        .build()
        );

        communicationService.requestCommunication(communicationTemplate, communicationDataRequestList, employee.getBranch().getBranchNo(), touchEmployeeNo, touchBranchNo);
    }

    public OneTimePin findByConfirmationTokenNo(String confirmationTokenNo) {
        return oneTimePinRepository.findByConfirmationTokenNo(confirmationTokenNo)
                .orElseThrow(() -> new DataNotFoundException("Confirmation Token Not Found - '" + confirmationTokenNo + "'"));
    }

    public OneTimePin getValidOneTimePin(String confirmationTokenNo, Integer otp) {
        OneTimePin oneTimePin = findByConfirmationTokenNo(confirmationTokenNo);

        if (!otp.equals(oneTimePin.getOneTimePin())) {
            throw new InvalidCredentialsException("Incorrect One Time Pin");
        }

        return oneTimePin;
    }

    public void isValidOneTimePin(String confirmationTokenNo, Integer otp) {
        OneTimePin oneTimePin = findByConfirmationTokenNo(confirmationTokenNo);

        if (!otp.equals(oneTimePin.getOneTimePin())) {
            throw new InvalidCredentialsException("Incorrect One Time Pin");
        }
    }
}
