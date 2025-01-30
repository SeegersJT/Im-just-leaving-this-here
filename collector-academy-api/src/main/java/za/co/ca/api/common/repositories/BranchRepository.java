package za.co.ca.api.common.repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import za.co.ca.api.common.enums.BranchEnum;
import za.co.ca.api.common.models.Branch;

import java.util.Optional;

/**
 * @author Hanno Seegers
 */
public interface BranchRepository extends JpaRepository<Branch, Integer> {
    Optional<Branch> findByBranchNo(Integer branchNo);
    Optional<Branch> findByBranchName(BranchEnum branchEnum);
}
