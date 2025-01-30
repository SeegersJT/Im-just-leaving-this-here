package za.co.ca.api.common.props;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.PropertySource;
import org.springframework.stereotype.Component;

/**
 * @author Hanno Seegers
 */
@Component
@PropertySource("classpath:password.properties")
public class PasswordProps {
    @Value("${PASSWORD_VALID_MONTHS}")
    public Integer PASSWORD_VALID_MONTHS;

    @Value("${PASSWORD_CHECK_MIN_LENGTH}")
    public Integer PASSWORD_CHECK_MIN_LENGTH;

    @Value("${PASSWORD_CHECK_MAX_LENGTH}")
    public Integer PASSWORD_CHECK_MAX_LENGTH;

    @Value("${PASSWORD_CHECK_HAS_ALLOWED_CHARACTERS.regexp}")
    public String PASSWORD_CHECK_HAS_ALLOWED_CHARACTERS;

    @Value("${PASSWORD_CHECK_HAS_LOWERCASE.regexp}")
    public String PASSWORD_CHECK_HAS_LOWERCASE;

    @Value("${PASSWORD_CHECK_HAS_UPPERCASE.regexp}")
    public String PASSWORD_CHECK_HAS_UPPERCASE;

    @Value("${PASSWORD_CHECK_HAS_NUMBER.regexp}")
    public String PASSWORD_CHECK_HAS_NUMBER;

    @Value("${PASSWORD_CHECK_HAS_SPECIAL.regexp}")
    public String PASSWORD_CHECK_HAS_SPECIAL;
}