package za.co.ca.api.common.enums;

import za.co.ca.api.common.exceptions.DataNotFoundException;

/**
 * @author Hanno Seegers
 */
public enum BranchEnum {
    HEADOFFICE,
    GABORONE,
    WINDHOEK,
    DURBAN,
    RANDBURG,
    JOHANNESBURG;

    public static BranchEnum branchEnumFromString(String branchName) {
        for (BranchEnum branch : BranchEnum.values()) {
            if (branch.name().equalsIgnoreCase(branchName)) {
                return branch;
            }
        }
        throw new DataNotFoundException("Branch not found '" + branchName + "'");
    }
}
