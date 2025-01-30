package za.co.ca.api.common.services;

import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import za.co.ca.api.common.repositories.CountryRepository;
import za.co.ca.api.common.exceptions.DataNotFoundException;
import za.co.ca.api.common.models.Country;

/**
 * @author Hanno Seegers
 */
@Service
@RequiredArgsConstructor
public class CountryService {

    @Autowired
    CountryRepository countryRepository;

    public Country findByCountryNo(Integer countryNo) {
        return countryRepository.findByCountryNo(countryNo)
                .orElseThrow(() -> new DataNotFoundException("Country Not Found - '" + countryNo + "'"));
    }
}
