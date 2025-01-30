package za.co.ca.api.integration.SMSDepot.services;

import org.springframework.http.*;
import org.springframework.stereotype.Service;
import za.co.ca.api.communication.enums.CommunicationStatusEnum;
import za.co.ca.api.communication.payloads.requests.CommunicationDataRequest;
import za.co.ca.api.communication.services.CommunicationRequestService;
import za.co.ca.api.common.enums.CountryCodeEnum;
import za.co.ca.api.common.exceptions.ApiLogHttpStatusException;
import za.co.ca.api.common.exceptions.CommunicationFailureException;
import za.co.ca.api.common.exceptions.DataNotFoundException;
import za.co.ca.api.common.models.Branch;
import za.co.ca.api.common.models.Country;
import za.co.ca.api.common.services.BranchService;
import za.co.ca.api.common.services.CountryService;
import za.co.ca.api.integration.SMSDepot.models.BulkMessageRequest;
import za.co.ca.api.integration.SMSDepot.models.BulkMessagesRequestMessage;
import za.co.ca.api.integration.SMSDepot.models.BulkMessagesResponse;
import za.co.ca.api.integration.SMSDepot.models.SMSDepotAuthToken;
import za.co.ca.api.integration.helpers.GenericWebRequestService;
import za.co.ca.api.integration.helpers.enums.ThirdPartyLoginApplicationEnum;
import za.co.ca.api.integration.helpers.enums.ThirdPartyLoginUserRoleEnum;
import za.co.ca.api.integration.helpers.models.ThirdPartyLoginApplication;
import za.co.ca.api.integration.helpers.models.ThirdPartyLoginDetails;
import za.co.ca.api.integration.helpers.services.ThirdPartyLoginApplicationService;
import za.co.ca.api.integration.helpers.services.ThirdPartyLoginDetailsService;

import java.util.*;

/**
 * @author Hanno Seegers
 */
@Service
public class SMSDepotService {
    private SMSDepotAuthToken smsDepotSouthAfricaAuthToken = new SMSDepotAuthToken();
    private SMSDepotAuthToken smsDepotBotswanaAuthToken = new SMSDepotAuthToken();
    private SMSDepotAuthToken smsDepotNamibiaAuthToken = new SMSDepotAuthToken();

    private static final String URL_REGEX = "\\b((https?|ftp|file)://|www)[-a-zA-Z0-9+&@#/%?=~_|!:,.;]*[-a-zA-Z0-9+&@#/%=~_|]";

    private final GenericWebRequestService genericWebRequestService;
    private final ThirdPartyLoginDetailsService thirdPartyLoginDetailsService;
    private final ThirdPartyLoginApplicationService thirdPartyLoginApplicationService;
    private final CommunicationRequestService communicationRequestService;
    private final BranchService branchService;
    private final CountryService countryService;
    public SMSDepotService(
            final GenericWebRequestService genericWebRequestService,
            final ThirdPartyLoginDetailsService thirdPartyLoginDetailsService,
            final ThirdPartyLoginApplicationService thirdPartyLoginApplicationService,
            final CommunicationRequestService communicationRequestService,
            final BranchService branchService,
            final CountryService countryService
    ) {
        this.genericWebRequestService = genericWebRequestService;
        this.thirdPartyLoginDetailsService = thirdPartyLoginDetailsService;
        this.thirdPartyLoginApplicationService = thirdPartyLoginApplicationService;
        this.communicationRequestService = communicationRequestService;
        this.branchService = branchService;
        this.countryService = countryService;
    }

    private String getAuthenticationTokenURI(String baseURI) {
        return baseURI + "/Authentication";
    }

    private String getBulkMessagesURI(String baseURI) {
        return baseURI + "/BulkMessages";
    }

    private SMSDepotAuthToken getSMSDepotAuthToken(SMSDepotAuthToken authToken, ThirdPartyLoginDetails thirdPartyLoginDetails, String baseURL, Integer touchEmployeeNo, Integer touchBranchNo) throws Exception {
        if (authToken.getAccess_token() != null && authToken.getAccess_token_expire_date() != null && authToken.getAccess_token_expire_date().after(new Date())) {
            return authToken;
        }

        try {
            Map<String, String> urlParams = new HashMap<>();

            HttpHeaders headers = new HttpHeaders();
            headers.add("Authorization", genericWebRequestService.getBasicAuthenticationHeader(thirdPartyLoginDetails.getUsername(), thirdPartyLoginDetails.getPassword()));

            ResponseEntity<Object> response = genericWebRequestService.genericGetWebRequest(
                    urlParams,
                    headers,
                    getAuthenticationTokenURI(baseURL),
                    touchEmployeeNo,
                    touchBranchNo,
                    "1" // Replace with actual API NO
            );

            if (!response.getStatusCode().is2xxSuccessful()) {
                throw new ApiLogHttpStatusException(HttpStatus.INTERNAL_SERVER_ERROR, "Failed to Get Access Token from SMSDepot");
            }

            String access_token = (String) ((Map<?, ?>) response.getBody()).get("token");
            String access_token_schema = (String) ((Map<?, ?>) response.getBody()).get("schema");
            Integer expiresInMinutes = (Integer) ((Map<?, ?>) response.getBody()).get("expiresInMinutes");

            Calendar calendar = Calendar.getInstance();
            calendar.add(Calendar.MINUTE, expiresInMinutes);

            Date access_token_expiry_date = calendar.getTime();

            return new SMSDepotAuthToken(access_token, access_token_schema, access_token_expiry_date);
        } catch(Exception exception) {
            throw new ApiLogHttpStatusException(HttpStatus.INTERNAL_SERVER_ERROR, "Failed to Get Access Token from SMSDepot");
        }
    }

    private BulkMessagesResponse postBulkMessages(CountryCodeEnum countryCodeEnum, BulkMessageRequest bulkMessageRequest, ThirdPartyLoginDetails thirdPartyLoginDetails, String baseURL, Integer touchEmployeeNo, Integer touchBranchNo) {
        try {
            SMSDepotAuthToken smsDepotAuthToken = switch(countryCodeEnum)  {
                case ZA -> this.smsDepotSouthAfricaAuthToken = getSMSDepotAuthToken(this.smsDepotSouthAfricaAuthToken, thirdPartyLoginDetails, baseURL, touchEmployeeNo, touchBranchNo);
                case BW -> this.smsDepotBotswanaAuthToken = getSMSDepotAuthToken(this.smsDepotBotswanaAuthToken, thirdPartyLoginDetails, baseURL, touchEmployeeNo, touchBranchNo);
                case NA -> this.smsDepotNamibiaAuthToken = getSMSDepotAuthToken(this.smsDepotNamibiaAuthToken, thirdPartyLoginDetails, baseURL, touchEmployeeNo, touchBranchNo);
            };

            if (smsDepotAuthToken.getAccess_token() == null || smsDepotAuthToken.getAccess_token().equals("")) {
                throw new DataNotFoundException("No Access Token Found for SMS Depot '" + countryCodeEnum.name() + "'");
            }

            Map<String, String> urlParams = new HashMap<>();

            HttpHeaders headers = new HttpHeaders();
            headers.add("accept", "application/json");
            headers.add("Authorization", "Bearer " + smsDepotAuthToken.getAccess_token());
            headers.setContentType(MediaType.APPLICATION_JSON);

            ResponseEntity<Object> responseEntity = genericWebRequestService.genericPostWebRequest(
                    urlParams,
                    headers,
                    getBulkMessagesURI(baseURL),
                    bulkMessageRequest,
                    touchEmployeeNo,
                    touchBranchNo,
                    "1"
            );

            Optional<BulkMessagesResponse> bulkMessagesResponse = genericWebRequestService.convertToClassInstance(responseEntity, BulkMessagesResponse.class);

            if (bulkMessagesResponse.isEmpty()) {
                throw new ApiLogHttpStatusException(HttpStatus.INTERNAL_SERVER_ERROR, "Failed to parse Bulk Messages Response");
            }

            if (!responseEntity.getStatusCode().is2xxSuccessful() || bulkMessagesResponse.get().getStatusCode() >= 300) {
                throw new ApiLogHttpStatusException(HttpStatus.INTERNAL_SERVER_ERROR, "Failed to Send SMSDepot BulkMessages");
            }

            return bulkMessagesResponse.get();
        } catch (Exception exception) {
            throw new ApiLogHttpStatusException(HttpStatus.INTERNAL_SERVER_ERROR, "Failed to Send SMSDepot BulkMessages");
        }
    }

    public void performSendBulkMessages(BulkMessageRequest bulkMessageRequest, List<CommunicationDataRequest> communicationDataRequestList, Integer branchNo, Integer touchEmployeeNo, Integer touchBranchNo) throws Exception {
        try {
            ThirdPartyLoginDetails thirdPartyLoginDetails = thirdPartyLoginDetailsService.getThirdPartyLoginDetails(ThirdPartyLoginApplicationEnum.SMS_DEPOT, ThirdPartyLoginUserRoleEnum.API_USER, branchNo);
            ThirdPartyLoginApplication thirdPartyLoginApplication = thirdPartyLoginApplicationService.findByThirdPartyApplication(ThirdPartyLoginApplicationEnum.SMS_DEPOT);

            Branch branch = branchService.findByBranchNo(branchNo);
            Country country = countryService.findByCountryNo(branch.getCountryNo());

            CountryCodeEnum countryCodeEnum = CountryCodeEnum.countryCodeEnumFromString(country.getCountryCode());

            bulkMessageRequest.setMessages(formatMessages(bulkMessageRequest.getMessages(), country));

            BulkMessagesResponse bulkMessagesResponse = postBulkMessages(countryCodeEnum, bulkMessageRequest, thirdPartyLoginDetails, thirdPartyLoginApplication.getLoginUrl(), touchEmployeeNo, touchBranchNo);

            for (CommunicationDataRequest communicationDataRequest : communicationDataRequestList) {
                communicationRequestService.handleAndSaveCommunicationRequest(
                        communicationDataRequest.getCommunicationRequest(),
                        "Success :: " + bulkMessagesResponse.getEventId(),
                        CommunicationStatusEnum.DELIVERED,
                        touchEmployeeNo,
                        touchBranchNo
                );
            }
        } catch (Exception exception) {
            for (CommunicationDataRequest communicationDataRequest : communicationDataRequestList) {
                communicationRequestService.handleAndSaveCommunicationRequest(
                        communicationDataRequest.getCommunicationRequest(),
                        "Failed",
                        CommunicationStatusEnum.ERROR,
                        touchEmployeeNo,
                        touchBranchNo
                );
            }

            throw new CommunicationFailureException(exception.getMessage());
        }
    }

    private List<BulkMessagesRequestMessage> formatMessages(List<BulkMessagesRequestMessage> messages, Country country) {
        messages.forEach((message) -> {
            message.setDestination(formatNumber(message.getDestination(), country));
        });

        return messages;
    }

    private String formatNumber(String number, Country country) {

        // REMOVE SPACES

        String formattedNumber = number.substring(Math.max(0, number.length() - country.getMaxPhoneNumberLength()));

        return "+" + country.getCountryDialCode().toString() + formattedNumber;
    }
}
