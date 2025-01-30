import regex from 'utils/regex/Regex';

export const validateField = (type, value) => {
  switch (type) {
    case 'courseTitle':
    case 'courseDescription':
      return (
        regex.startsWithCapitalLetter.test(value) &&
        regex.containsAlphanumericOrSpaces.test(value) &&
        value.length <= regex.maxLength &&
        !regex.hasNoDoubleSpaces.test(value) &&
        regex.noLeadingOrTrailingSpaces.test(value)
      );
    case 'courseDuration':
      return regex.isNumeric.test(value) && regex.noLeadingOrTrailingSpaces.test(value);
    default:
      return true;
  }
};
