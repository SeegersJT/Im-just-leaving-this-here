package za.co.ca.api.integration.SMSDepot.props;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.PropertySource;
import org.springframework.stereotype.Component;

/**
 * @author Hanno Seegers
 */
@Component
@PropertySource("classpath:integration/smsdepot/smsdepot.properties")
public class SMSDepotProps {
    @Value("${SMS_DEPOT_TEST_MODE}")
    public Boolean SMS_DEPOT_TEST_MODE;

    @Value("${SMS_DEPOT_VALIDITY_PERIOD}")
    public Integer SMS_DEPOT_VALIDITY_PERIOD;
}