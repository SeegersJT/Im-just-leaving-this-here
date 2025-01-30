export const regex = {
  // General regex for validation
  startsWithCapitalLetter: /^[A-Z]/, // Checks if string starts with a capital letter
  hasNoDoubleSpaces: /\s{2,}/, // Checks for double spaces
  noLeadingOrTrailingSpaces: /^[^\s].*[^\s]$/, // Ensures no spaces at the start or end
  containsAlphanumericOrSpaces: /[A-Za-z0-9]+/, // Ensures the string contains alphanumeric characters or spaces
  isNumeric: /^[0-9]+$/, // Validates numeric strings
  nonNegativeNumbers: /^(?:\d+|\d*\.\d+)$/, // Matches non-negative integers or decimals
  maxLength: 255, // Maximum allowed length for strings
  notHigherThanSeven: /^[0-7]$/,

  // Additional common regex patterns can go here
  name: /^[A-Z][a-z]*( [A-Z][a-z]*)*$/,
  email: /^[^\s@]+@[^\s@]+\.[^\s@]+$/, // Email validation
  mobileNumber: /^[0-9]{10}$/, // Mobile number validation (10 digits)
  username: /^[a-zA-Z0-9_]{3,30}$/, // Username with letters, digits, and underscores, length 3-30
  password: /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/, // Password must have letters, digits, and min length of 8
  url: /^(https?|ftp):\/\/[^\s/$.?#].[^\s]*$/, // URL validation (http, https, or ftp)

  findYoutubeLink: /(https?:\/\/(?:www\.)?youtube\.com\/watch\?v=([a-zA-Z0-9_-]+)|https?:\/\/youtu\.be\/([a-zA-Z0-9_-]+))/g // Youtube Link URL
};

export default regex;
