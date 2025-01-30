package za.co.ca.api.common.services;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import za.co.ca.api.common.models.Gender;
import za.co.ca.api.common.repositories.GenderRepository;
import za.co.ca.api.common.enums.GenderEnum;
import za.co.ca.api.common.exceptions.DataNotFoundException;

import java.util.List;

/**
 * @author Hanno Seegers
 */
@Service
@RequiredArgsConstructor
public class GenderService {

    private final GenderRepository genderRepository;

    public Gender findByGenderNo(Integer genderNo) {
        return genderRepository.findByGenderNo(genderNo)
                .orElseThrow(() -> new DataNotFoundException("Gender not found - '" + genderNo.toString()  + "'"));
    }

    public Gender findByGender(GenderEnum genderEnum) {
        return genderRepository.findByGender(genderEnum)
                .orElseThrow(() -> new DataNotFoundException("Gender not found - '" + genderEnum.name()  + "'"));
    }

    public List<Gender> findAll() {
        return genderRepository.findAll();
    }
}
