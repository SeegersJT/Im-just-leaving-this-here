import regex from 'utils/regex/Regex';

export const validateField = (type, value) => {
  switch (type) {
    case 'pageTitle':
    case 'pageDescription':
      return (
        regex.startsWithCapitalLetter.test(value) &&
        regex.containsAlphanumericOrSpaces.test(value) &&
        value.length <= regex.maxLength &&
        !regex.hasNoDoubleSpaces.test(value) &&
        regex.noLeadingOrTrailingSpaces.test(value)
      );
    default:
      return true;
  }
};
