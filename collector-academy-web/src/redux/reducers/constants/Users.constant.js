export const formatConstantUsers = (user) => ({
  employeeNo: user.employeeNo || null,
  employeeTypeNo: user.employeeTypeNo || null,
  employeeType: user.employeeType || '',
  performanceManagerEmployeeNo: user.performanceManagerEmployeeNo || 1,
  performanceManagerUsername: user.performanceManagerUsername || 'N/A',
  username: user.username || '',
  name: user.name || '',
  surname: user.surname || '',
  idNumber: user.idNumber || '',
  emailAddress: user.emailAddress || '',
  mobileNumber: user.mobileNumber || '',
  genderNo: user.genderNo || null,
  gender: user.gender || '',
  branchNo: user.branchNo || null,
  branchName: user.branchName || '',
  password: user.password || null,
  errors: user.errors || null
});
