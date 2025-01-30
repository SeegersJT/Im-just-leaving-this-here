package za.co.ca.api.common.repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import za.co.ca.api.common.models.Country;

import java.util.Optional;

/**
 * @author Hanno Seegers
 */
public interface CountryRepository extends JpaRepository<Country, Integer> {

    Optional<Country> findByCountryNo(Integer countryNo);
}
