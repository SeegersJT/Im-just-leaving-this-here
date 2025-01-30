package za.co.ca.api.integration.SMSDepot.models;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.ArrayList;

/**
 * @author Hanno Seegers
 */
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class BulkMessagesResponse {
    // When SMSDepot returns statusCode 200
    private int cost;
    private int RemainingBalance;
    private long eventId;
    private String sample;
    private ArrayList<CostBreakdown> costBreakdown;
    private int messages;
    private int parts;
    private ErrorReport errorReport;

    // When SMSDepot returns statusCode !200
    private int statusCode;
    private ArrayList<ErrorReport> errors;
}