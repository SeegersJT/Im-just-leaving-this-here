package za.co.ca.api.authentication.services;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import za.co.ca.api.authentication.enums.ConfirmationTokenTypeEnum;
import za.co.ca.api.authentication.models.ConfirmationTokenType;
import za.co.ca.api.authentication.repositories.ConfirmationTokenTypeRepository;
import za.co.ca.api.common.exceptions.DataNotFoundException;

/**
 * @author Hanno Seegers
 */
@Service
@RequiredArgsConstructor
public class ConfirmationTokenTypeService {

    private final ConfirmationTokenTypeRepository confirmationTokenTypeRepository;

    public ConfirmationTokenType findByConfirmationTokenType(ConfirmationTokenTypeEnum confirmationTokenTypeEnum) {
        return confirmationTokenTypeRepository.findByConfirmationTokenType(confirmationTokenTypeEnum)
                .orElseThrow(() -> new DataNotFoundException("Confirmation Token Tpe Not Found - '" + confirmationTokenTypeEnum.toString() + "'"));
    }

    public ConfirmationTokenType findByConfirmationTokenTypeNo(Integer confirmationTokenTypeNo) {
        return confirmationTokenTypeRepository.findByConfirmationTokenTypeNo(confirmationTokenTypeNo)
                .orElseThrow(() -> new DataNotFoundException("Confirmation Token Type Not Found - '" + confirmationTokenTypeNo.toString() + "'"));
    }

}
