import regex from 'utils/regex/Regex';

export const validateField = (type, value) => {
  switch (type) {
    case 'testTitle':
      return (
        regex.startsWithCapitalLetter.test(value) &&
        regex.containsAlphanumericOrSpaces.test(value) &&
        value.length <= regex.maxLength &&
        !regex.hasNoDoubleSpaces.test(value) &&
        regex.noLeadingOrTrailingSpaces.test(value)
      );
    case 'testDuration':
    case 'testPassPercentage':
      return regex.isNumeric.test(value) && regex.noLeadingOrTrailingSpaces.test(value);

    case 'retries':
      return regex.isNumeric.test(value) && regex.nonNegativeNumbers.test(value) && regex.notHigherThanSeven.test(value);
    default:
      return true;
  }
};
