package za.co.ca.api.common.props;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.PropertySource;
import org.springframework.stereotype.Component;

/**
 * @author Hanno Seegers
 */
@Component
@PropertySource("classpath:id-validation.properties")
public class IDValidationProps {

    @Value("${SOUTH_AFRICAN_ID_VALIDATION.regexp}")
    public String SOUTH_AFRICAN_ID_VALIDATION;

    @Value("${NAMIBIAN_ID_VALIDATION.regexp}")
    public String NAMIBIAN_ID_VALIDATION;

    @Value("${BOTSWANA_ID_VALIDATION.regexp}")
    public String BOTSWANA_ID_VALIDATION;
}
