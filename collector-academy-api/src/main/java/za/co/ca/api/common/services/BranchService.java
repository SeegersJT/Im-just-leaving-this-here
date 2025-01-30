package za.co.ca.api.common.services;

import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import za.co.ca.api.common.repositories.BranchRepository;
import za.co.ca.api.common.enums.BranchEnum;
import za.co.ca.api.common.exceptions.DataNotFoundException;
import za.co.ca.api.common.models.Branch;

import java.util.List;

/**
 * @author Hanno Seegers
 */
@Service
@RequiredArgsConstructor
public class BranchService {

    @Autowired
    BranchRepository branchRepository;

    public Branch findByBranchNo(Integer branchNo) {
        return branchRepository.findByBranchNo(branchNo)
                .orElseThrow(() -> new DataNotFoundException("Branch Not Found - '" + branchNo.toString() + "'"));
    }

    public Branch findByBranchName(BranchEnum branchEnum) {
        return branchRepository.findByBranchName(branchEnum)
                .orElseThrow(() -> new DataNotFoundException("Branch Not Found - '" + branchEnum.name() + "'"));
    }

    public List<Branch> findAll() {
        return branchRepository.findAll();
    }

    public void validateBranchName(BranchEnum branchEnum) {
        findByBranchName(branchEnum);
    }
}
