export const formatConstantBranch = (branch) => ({
  branchNo: branch.branchNo || null,
  branchName: branch.branchName || null,
  branchAbbreviation: branch.branchAbbreviation || '',
  countryNo: branch.countryNo || null
});

export const formatConstantGender = (gender) => ({
  genderNo: gender.genderNo || null,
  gender: gender.gender || null
});

export const formatConstantEmployeeTypes = (employeeType) => ({
  employeeTypeNo: employeeType.employeeTypeNo || null,
  employeeType: employeeType.employeeType || null
});

export const formatConstantPerformanceManagers = (performanceManager) => ({
  performanceManagerEmployeeNo: performanceManager.performanceManagerEmployeeNo || null,
  performanceManagerUsername: performanceManager.performanceManagerUsername || null,
  performanceManagerCountryNo: performanceManager.performanceManagerCountryNo || null
});
