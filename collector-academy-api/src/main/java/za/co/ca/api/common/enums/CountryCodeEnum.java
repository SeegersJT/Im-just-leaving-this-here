package za.co.ca.api.common.enums;

import za.co.ca.api.common.exceptions.DataNotFoundException;

/**
 * @author Hanno Seegers
 */
public enum CountryCodeEnum {
    ZA,
    BW,
    NA;

    public static CountryCodeEnum countryCodeEnumFromString(String countryCode) {
        for (CountryCodeEnum countryCodeEnum : CountryCodeEnum.values()) {
            if (countryCodeEnum.name().equalsIgnoreCase(countryCode)) {
                return countryCodeEnum;
            }
        }
        throw new DataNotFoundException("Branch not found '" + countryCode + "'");
    }
}
