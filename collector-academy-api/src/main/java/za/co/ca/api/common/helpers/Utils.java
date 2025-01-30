package za.co.ca.api.common.helpers;

import org.apache.commons.lang3.RandomStringUtils;
import org.springframework.stereotype.Component;
import za.co.ca.api.common.exceptions.CommunicationFailureException;
import za.co.ca.api.communication.enums.CommunicationParseDataEnum;

import java.lang.reflect.Field;
import java.security.SecureRandom;
import java.util.Map;
import java.util.Objects;
import java.util.UUID;

/**
 * @author Hanno Seegers
 */
@Component
public class Utils {

    public static boolean isObjectEmpty(Object obj) {
        if (obj == null) {
            return true;
        }

        for (Field field : obj.getClass().getDeclaredFields()) {
            field.setAccessible(true);
            try {
                if (field.get(obj) != null) {
                    return false;
                }
            } catch (IllegalAccessException e) {
                e.printStackTrace();
            }
        }
        return true;
    }

    public static boolean isStringEmptyOrNull(String str){
        return str == null || str.isEmpty() || "NULL".equalsIgnoreCase(str);
    }

    public static <T> boolean isNull(T value) {
        return value == null;
    }

    public static String replaceSMSTemplatePlaceholders(String template, Map<CommunicationParseDataEnum, String> placeholders) {
        try {
            if (template == null || placeholders == null) {
                return null;
            }

            for (Map.Entry<CommunicationParseDataEnum, String> entry : placeholders.entrySet()) {
                String key = entry.getKey().name();
                String value = entry.getValue();

                String placeholder = "[( ${" + key + "} )]";

                template = template.replace(placeholder, Objects.requireNonNullElse(value, "N/A"));
            }

            template = template.replaceAll("\\[\\( \\$\\{[^}]+\\} \\)]", "[DATA NOT FOUND]");

            return template;
        } catch (Exception exception) {
            throw new CommunicationFailureException("Failed to parse SMS Template");
        }
    }

    public static String getFirstChars(String input, int i) {
        if (input.length() > i) {
            return input.substring(0, i);
        } else {
            return input;
        }
    }

    public static String generateRandomAlphaNumericCharacters() {
        return RandomStringUtils.randomAlphanumeric(25).toUpperCase();
    }

    public static String generateCustomToken() {
        String uuidString = UUID.randomUUID().toString().toUpperCase();
        return uuidString.substring(4, uuidString.length() - 8);
    }

    public static Integer generateOTP() {
        SecureRandom random = new SecureRandom();

        int max = (int) Math.pow(10, 6) - 1;
        int min = (int) Math.pow(10, 6 - 1);

        return min + random.nextInt(max - min + 1);
    }
}
