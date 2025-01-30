package za.co.ca.api.authentication.props;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.PropertySource;
import org.springframework.stereotype.Component;

/**
 * @author Hanno Seegers
 */
@Component
@PropertySource("classpath:authentication.properties")
public class AuthenticationProps {
    @Value("${SECRET_ENCRYPTION_KEY}")
    public String SECRET_ENCRYPTION_KEY;

    @Value("${OTP_LENGTH}")
    public String OTP_LENGTH;
}