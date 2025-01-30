package za.co.ca.api.integration.helpers;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.DeserializationFeature;
import com.fasterxml.jackson.databind.JavaType;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.fasterxml.jackson.datatype.jsr310.JavaTimeModule;
import org.springframework.http.*;
import org.springframework.stereotype.Service;
import org.springframework.util.MultiValueMap;
import org.springframework.web.client.HttpStatusCodeException;
import org.springframework.web.client.RestTemplate;
import za.co.ca.api.common.exceptions.ApiLogHttpStatusException;
import za.co.ca.api.common.exceptions.ApiLogJsonProcessingException;

import java.net.URI;
import java.nio.charset.StandardCharsets;
import java.util.Base64;
import java.util.List;
import java.util.Map;
import java.util.Optional;

/**
 * @author Hanno Seegers
 */
@Service
public class GenericWebRequestService {

    public ResponseEntity<Object> genericGetWebRequest(Map<String, String> urlParams, HttpHeaders headers, String endpointPath, Integer touchEmployeeNo, Integer touchBranchNo, String apiNo) throws Exception {
        RestTemplate restTemplate = new RestTemplate();
        String apiParams = mapToQueryString(urlParams);
        URI uri = URI.create(endpointPath + apiParams);

        HttpEntity<String> entity = new HttpEntity<>(headers);
//        String apiLogNo = logRepository.logApiError(apiNo, employeeNo, endpointPath, "", "GET");

        ResponseEntity<Object> responseEntity;
        try {
            responseEntity = restTemplate.exchange(uri, HttpMethod.GET, entity, Object.class);
            new ObjectMapper().writeValueAsString(responseEntity.getBody());
        } catch (HttpStatusCodeException exception) {
//            if (!apiLogNo.isEmpty()) {
//                logRepository.updateApiLog(apiLogNo, touchEmployeeNo, touchBranchNo, ex.getResponseBodyAsString(), ex.getStatusCode().value());
//            }

            throw new ApiLogHttpStatusException(exception.getStatusCode(), exception.getResponseBodyAsString());
        } catch (Exception exception) {
//            if (!apiLogNo.isEmpty()) {
//                logRepository.updateApiLog(apiLogNo, touchEmployeeNo, touchBranchNo, ex.getMessage(), 500);
//            }

            throw new Exception(exception.getMessage());
        }

//        try {
////            if (!apiLogNo.isEmpty()) {
////                logRepository.updateApiLog(apiLogNo, touchEmployeeNo, touchBranchNo, responseEntity.getBody() == null ? null : new ObjectMapper().writeValueAsString(responseEntity.getBody()), responseEntity.getStatusCode().value());
////            }
//        } catch (JsonProcessingException exception) {
//            throw new ApiLogJsonProcessingException(exception.getMessage());
//        }

        return responseEntity;
    }

    public ResponseEntity<Object> genericPutWebRequest(Map<String, String> urlParams, HttpHeaders headers, String endpointPath, Object request, Integer touchEmployeeNo, Integer touchBranchNo, String apiNo) throws Exception {
        RestTemplate restTemplate = new RestTemplate();
        String apiParams = mapToQueryString(urlParams);
        URI uri = URI.create(endpointPath + apiParams);

        String jsonBody = "";
        if (request != null) {
            try {
                jsonBody = new ObjectMapper().writeValueAsString(request);
            } catch (JsonProcessingException exception) {
                throw new ApiLogJsonProcessingException(exception.getMessage());
            }
        }

        HttpEntity<String> entity = new HttpEntity<>(jsonBody, headers);
//        String apiLogNo = logRepository.logApiError(apiNo, touchEmployeeNo, touchBranchNo, endpointPath, jsonBody, "PUT");

        ResponseEntity<Object> responseEntity;
        try {
            responseEntity = restTemplate.exchange(uri, HttpMethod.PUT, entity, Object.class);
        } catch (HttpStatusCodeException exception) {
//            if (!apiLogNo.isEmpty()) {
//                logRepository.updateApiLog(apiLogNo, touchEmployeeNo, touchBranchNo, ex.getResponseBodyAsString(), ex.getStatusCode().value());
//            }

            throw new ApiLogHttpStatusException(exception.getStatusCode(), exception.getResponseBodyAsString());
        } catch (Exception exception) {
//            if (!apiLogNo.isEmpty()) {
//                logRepository.updateApiLog(apiLogNo, touchEmployeeNo, touchBranchNo, ex.getMessage(), 500);
//            }

            throw new Exception(exception.getMessage());
        }

//        try {
////            if (!apiLogNo.isEmpty()) {
////                logRepository.updateApiLog(apiLogNo, touchEmployeeNo, touchBranchNo, responseEntity.getBody() == null ? null : new ObjectMapper().writeValueAsString(responseEntity.getBody()), responseEntity.getStatusCode().value());
////            }
//        } catch (JsonProcessingException exception) {
//            throw new ApiLogJsonProcessingException(exception.getMessage());
//        }

        return responseEntity;
    }

    public ResponseEntity<Object> genericPostWebRequest(Map<String, String> urlParams, HttpHeaders headers, String endpointPath, Object request, Integer touchEmployeeNo, Integer touchBranchNo, String apiNo) throws Exception {
        RestTemplate restTemplate = new RestTemplate();
        String apiParams = mapToQueryString(urlParams);
        URI uri = URI.create(endpointPath + apiParams);

        String jsonBody = "";
        if (request != null) {
            try {
                jsonBody = new ObjectMapper().writeValueAsString(request);
            } catch (JsonProcessingException exception) {
                throw new ApiLogJsonProcessingException(exception.getMessage());
            }
        }

        HttpEntity<String> entity = new HttpEntity<>(jsonBody, headers);
//        String apiLogNo = logRepository.logApiError(apiNo, touchEmployeeNo, touchBranchNo, endpointPath, jsonBody, "POST");

        ResponseEntity<Object> responseEntity;
        try {
            responseEntity = restTemplate.exchange(uri, HttpMethod.POST, entity, Object.class);
        } catch (HttpStatusCodeException exception) {
//            if (!apiLogNo.isEmpty()) {
//                logRepository.updateApiLog(apiLogNo, touchEmployeeNo, touchBranchNo, ex.getResponseBodyAsString(), ex.getStatusCode().value());
//            }

            throw new ApiLogHttpStatusException(exception.getStatusCode(), exception.getResponseBodyAsString());
        } catch (Exception exception) {
//            if (!apiLogNo.isEmpty()) {
//                logRepository.updateApiLog(apiLogNo, touchEmployeeNo, touchBranchNo, ex.getMessage(), 500);
//            }

            throw new Exception(exception.getMessage());
        }

//        try {
////            if (!apiLogNo.isEmpty()) {
////                logRepository.updateApiLog(apiLogNo, touchEmployeeNo, touchBranchNo, responseEntity.getBody() == null ? null : new ObjectMapper().writeValueAsString(responseEntity.getBody()), responseEntity.getStatusCode().value());
////            }
//        } catch (JsonProcessingException exception) {
//            throw new ApiLogJsonProcessingException(exception.getMessage());
//        }

        return responseEntity;
    }

    public ResponseEntity<Object> genericPostWebRequest(Map<String, String> urlParams, HttpHeaders headers, String endpointPath, MultiValueMap<String, String> request, Integer touchEmployeeNo, Integer touchBranchNo, String apiNo) throws Exception {
        RestTemplate restTemplate = new RestTemplate();
        String apiParams = mapToQueryString(urlParams);
        URI uri = URI.create(endpointPath + apiParams);

        // Convert MultiValueMap to URL-encoded form string
        String formEncodedBody = "";
        if (request != null) {
            formEncodedBody = request.entrySet().stream()
                    .map(entry -> entry.getKey() + "=" + entry.getValue().stream().findFirst().orElse(""))
                    .reduce((a, b) -> a + "&" + b)
                    .orElse("");
        }

        HttpEntity<String> entity = new HttpEntity<>(formEncodedBody, headers);
//        String apiLogNo = logRepository.logApiError(apiNo, touchEmployeeNo, touchBranchNo, endpointPath, formEncodedBody, "POST");

        ResponseEntity<Object> responseEntity;
        try {
            responseEntity = restTemplate.exchange(uri, HttpMethod.POST, entity, Object.class);
        } catch (HttpStatusCodeException exception) {
//            if (!apiLogNo.isEmpty()) {
//                logRepository.updateApiLog(apiLogNo, touchEmployeeNo, touchBranchNo, ex.getResponseBodyAsString(), ex.getStatusCode().value());
//            }

            throw  new ApiLogHttpStatusException(exception.getStatusCode(), exception.getResponseBodyAsString());
        } catch (Exception exception) {
//            if (!apiLogNo.isEmpty()) {
//                logRepository.updateApiLog(apiLogNo, touchEmployeeNo, touchBranchNo, ex.getMessage(), 500);
//            }

            throw new Exception(exception.getMessage());
        }

//        try {
////            if (!apiLogNo.isEmpty()) {
////                logRepository.updateApiLog(apiLogNo, touchEmployeeNo, touchBranchNo, responseEntity.getBody() == null ? null : new ObjectMapper().writeValueAsString(responseEntity.getBody()), responseEntity.getStatusCode().value());
////            }
//        } catch (JsonProcessingException exception) {
//            throw new ApiLogJsonProcessingException(exception.getMessage());
//        }

        return responseEntity;
    }

    public ResponseEntity<Object> genericDeleteWebRequest(Map<String, String> urlParams, HttpHeaders headers, String endpointPath, Integer touchEmployeeNo, Integer touchBranchNo, String apiNo) throws Exception {
        RestTemplate restTemplate = new RestTemplate();
        String apiParams = mapToQueryString(urlParams);
        URI uri = URI.create(endpointPath + apiParams);

        HttpEntity<String> entity = new HttpEntity<>(headers);
//        String apiLogNo = logRepository.logApiError(apiNo, touchEmployeeNo, touchBranchNo, endpointPath, "", "DELETE");

        ResponseEntity<Object> responseEntity;
        try {
            responseEntity = restTemplate.exchange(uri, HttpMethod.DELETE, entity, Object.class);
            new ObjectMapper().writeValueAsString(responseEntity.getBody());
        } catch (HttpStatusCodeException exception) {
//            if (!apiLogNo.isEmpty()) {
//                logRepository.updateApiLog(apiLogNo, touchEmployeeNo, touchBranchNo, ex.getResponseBodyAsString(), ex.getStatusCode().value());
//            }

            throw new ApiLogHttpStatusException(exception.getStatusCode(), exception.getResponseBodyAsString());
        } catch (Exception exception) {

            throw new Exception(exception.getMessage());
        }

//        try {
////            if (!apiLogNo.isEmpty()) {
////                logRepository.updateApiLog(apiLogNo, touchEmployeeNo, touchBranchNo, responseEntity.getBody() == null ? null : new ObjectMapper().writeValueAsString(responseEntity.getBody()), responseEntity.getStatusCode().value());
////            }
//        } catch (JsonProcessingException exception) {
//            throw new ApiLogJsonProcessingException(exception.getMessage());
//        }

        return responseEntity;
    }

    public String mapToQueryString(Map<String, String> params) {
        if (params == null || params.isEmpty()) {
            return "";
        }

        StringBuilder queryString = new StringBuilder();

        for (Map.Entry<String, String> entry : params.entrySet()) {
            if (entry.getValue() != null && !entry.getValue().isEmpty()) {
                if (!queryString.isEmpty()) {
                    queryString.append("&");
                } else {
                    queryString.append("?");
                }

                queryString.append(encodeValue(entry.getKey()))
                        .append("=")
                        .append(encodeValue(entry.getValue()));
            }
        }

        return queryString.toString();
    }

    private String encodeValue(String value) {

        return java.net.URLEncoder.encode(value, StandardCharsets.UTF_8);
    }

    public <T> T convertResponseToClass(ResponseEntity<Object> response, Class<T> clazz) throws ApiLogJsonProcessingException {
        ObjectMapper mapper = new ObjectMapper();

        mapper.registerModule(new JavaTimeModule());
        mapper.configure(DeserializationFeature.FAIL_ON_UNKNOWN_PROPERTIES, false);

        try {
            if (response.getBody() instanceof List) {
                JavaType listType = mapper.getTypeFactory().constructCollectionType(List.class, clazz);
                return mapper.readValue(mapper.writeValueAsString(response.getBody()), listType);
            } else {
                return mapper.readValue(mapper.writeValueAsString(response.getBody()), clazz);
            }
        } catch (JsonProcessingException exception) {
            throw new ApiLogJsonProcessingException(exception.getMessage());
        }
    }

    public <T> Optional<T> convertToClassInstance(ResponseEntity<Object> response, Class<T> clazz) {
        ObjectMapper mapper = new ObjectMapper();
        mapper.registerModule(new JavaTimeModule());
        mapper.configure(DeserializationFeature.FAIL_ON_UNKNOWN_PROPERTIES, false);
        try {
            T instance = mapper.readValue(mapper.writeValueAsString(response.getBody()), clazz);
            return Optional.of(instance);
        } catch (JsonProcessingException e) {
            return Optional.empty();
        }
    }

    public String getBasicAuthenticationHeader(String username, String password) {
        String valueToEncode = username + ":" + password;
        return "Basic " + Base64.getEncoder().encodeToString(valueToEncode.getBytes());
    }
}
