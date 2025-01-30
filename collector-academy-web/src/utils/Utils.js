import { CalculationsOperators } from './constants/Calculations.enum';
import { DateUnit } from './constants/Datetime.enum';
import regex from './regex/Regex';

/* eslint-disable max-len */
export class Utils {
  static countdownInterval = null;

  /**
   * Check if a value is undefined.
   * @param {any} value - The value to check.
   * @returns {boolean} True if the value is undefined, otherwise false.
   */
  static isUndefined = (value) => typeof value === 'undefined';

  /**
   * Check if a value is null.
   * @param {any} value - The value to check.
   * @returns {boolean} True if the value is null, otherwise false.
   */
  static isNull = (value) => value === null;

  /**
   * Check if an array is empty.
   * @param {Array} arr - The array to check.
   * @returns {boolean} True if the array is empty, otherwise false.
   */
  static isEmpty = (arr) => !this.isNull(arr) && arr.length === 0;

  /**
   * Check if a string is empty or null.
   * @param {string} str - The string to check.
   * @returns {boolean} True if the string is empty or null, otherwise false.
   */
  static isEmptyString = (str) => !str || str.trim().length === 0;

  /**
   * Generate a random number between a specified range (inclusive).
   * Uses the crypto API for secure random number generation.
   * @param {number} min - The minimum value.
   * @param {number} max - The maximum value.
   * @returns {number} A random number between min and max (inclusive).
   */
  static generateRandomNumber = (min, max) => {
    const minValue = Math.ceil(min);
    const maxValue = Math.floor(max);

    const crypto = window.crypto.getRandomValues(new Uint32Array(1))[0];

    return Math.floor((crypto / (0xffffffff + 1)) * (maxValue - minValue + 1)) + minValue;
  };

  /**
   * Generate a random ID of the specified length in hexadecimal format.
   * @param {number} [length=16] - The length of the random ID to generate.
   * @returns {string} A random ID string of the specified length.
   */
  static generateRandomID = (length = 16) => {
    const array = new Uint8Array(length);
    window.crypto.getRandomValues(array);

    return Array.from(array, (byte) => byte.toString(16).padStart(2, '0')).join('');
  };

  /**
   * Generate a random UUID v4 (Universally Unique Identifier).
   * This UUID follows the RFC 4122 version 4 format.
   * @returns {string} A randomly generated UUID v4.
   */
  static generateUUID() {
    const randomValues = window.crypto.getRandomValues(new Uint8Array(16));

    // eslint-disable-next-line no-bitwise
    randomValues[6] = (randomValues[6] & 0x0f) | 0x40;
    // eslint-disable-next-line no-bitwise
    randomValues[8] = (randomValues[8] & 0x3f) | 0x80;

    const hex = [...randomValues].map((byte) => byte.toString(16).padStart(2, '0')).join('');

    return `${hex.substring(0, 8)}-${hex.substring(8, 12)}-${hex.substring(12, 16)}-${hex.substring(16, 20)}-${hex.substring(20, 32)}`;
  }

  /**
   * Generate a random number between a specified range (inclusive).
   * Uses the crypto API for secure random number generation.
   * @param {string} baseClassName - The base class name.
   * @param {string} modifiers - The modifiers that will be attached onto the base class name.
   * @returns {string} - A combination of the base class name and the modifiers attached to the base class name.
   */
  static getClassNames(baseClassName, modifiers = {}) {
    const classes = [baseClassName];

    Object.entries(modifiers).forEach(([name, active]) => {
      if (!active) return;

      classes.push(`${baseClassName}--${name}`);
    });

    return classes.join(' ');
  }

  /**
   * Start a countdown timer that updates the time left in real-time.
   * @param {string} targetDate - The target date in ISO 8601 format (e.g., '2024-11-21T12:34:13.719+02:00').
   * @param {function} callback - The callback function to update the UI with the remaining time.
   */
  static startCountdown(targetDate, callback) {
    const target = new Date(targetDate);

    if (Utils.countdownInterval) {
      clearInterval(Utils.countdownInterval);
    }

    Utils.countdownInterval = setInterval(() => {
      const now = new Date();
      const timeDiff = target - now;

      if (timeDiff <= 0) {
        clearInterval(Utils.countdownInterval);
        callback('Expired');
        return;
      }

      const secondsLeft = Math.floor(timeDiff / 1000);
      const minutesLeft = Math.floor(secondsLeft / 60);
      const hoursLeft = Math.floor(minutesLeft / 60);

      const remainingSeconds = secondsLeft % 60;
      const remainingMinutes = minutesLeft % 60;

      let timeLeft;
      if (hoursLeft > 0) {
        timeLeft = `${String(hoursLeft).padStart(2, '0')}:${String(remainingMinutes).padStart(2, '0')}:${String(remainingSeconds).padStart(2, '0')}`;
      } else if (minutesLeft > 0) {
        timeLeft = `${String(remainingMinutes).padStart(2, '0')}:${String(remainingSeconds).padStart(2, '0')}`;
      } else {
        timeLeft = `${String(remainingSeconds).padStart(2, '0')}`;
      }

      callback(timeLeft);
    }, 1000);
  }

  /**
   * Check if a value is a numeric string.
   * @param {string} value - The value to check.
   * @returns {boolean} - Returns true if the value is numeric, otherwise false.
   */
  static isNumeric(value) {
    return regex.isNumeric.test(value);
  }

  static noOp() {}

  /**
   * Capitalize the first character of a string.
   * @param {string} value - The string to capitalize.
   * @returns {string} - Returns the string with the first character capitalized.
   */
  static capitalizeFirstCharacter(value) {
    if (typeof value !== 'string' || value.length === 0) {
      return value;
    }

    return value
      .replace(/-/g, ' ') // Replace all hyphens with spaces
      .split(' ') // Split the string into words
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase()) // Capitalize each word
      .join(' '); // Join words back with spaces
  }

  /**
   * Format a value as a valid number with thousands separated by spaces.
   * @param {number|string} value - The input value to format.
   * @returns {string} - Returns the formatted number as a string, or an empty string if the value is invalid.
   */
  static formatNumber(value) {
    const number = parseFloat(value);

    if (isNaN(number)) {
      return '';
    }

    return number.toLocaleString('en-US', { useGrouping: true }).replace(/,/g, ' ');
  }

  /**
   * Compare a datetime with the current datetime based on a specific unit, operator, and value.
   * @param {Date|string} inputDatetime - The input datetime to compare.
   * @param {string} unit - The unit of time to compare (YEAR, MONTH, WEEK, etc.).
   * @param {string} operator - The comparison operator (=, <>, >, <, >=, <=).
   * @param {number} value - The value to compare against in the specified unit.
   * @returns {boolean} - Returns true if the condition is met; otherwise false.
   */
  static compareDate(inputDatetime, unit, operator, value) {
    if (!(unit in DateUnit)) {
      throw new Error(`Invalid unit provided: ${unit}`);
    }

    if (!Object.values(CalculationsOperators).includes(operator)) {
      throw new Error(`Invalid operator provided: ${operator}`);
    }

    const inputDate = new Date(inputDatetime);
    if (isNaN(inputDate)) {
      throw new Error('Invalid inputDatetime provided');
    }

    const now = new Date();
    let targetDate = new Date(now);

    switch (unit) {
      case DateUnit.YEAR:
        targetDate.setFullYear(now.getFullYear() - value);
        break;
      case DateUnit.MONTH:
        targetDate.setMonth(now.getMonth() - value);
        break;
      case DateUnit.WEEK:
        targetDate.setDate(now.getDate() - value * 7);
        break;
      case DateUnit.DAY:
        targetDate.setDate(now.getDate() - value);
        break;
      case DateUnit.HOUR:
        targetDate.setHours(now.getHours() - value);
        break;
      case DateUnit.MINUTE:
        targetDate.setMinutes(now.getMinutes() - value);
        break;
      case DateUnit.SECOND:
        targetDate.setSeconds(now.getSeconds() - value);
        break;
      case DateUnit.MILLISECOND:
        targetDate.setMilliseconds(now.getMilliseconds() - value);
        break;
      default:
        throw new Error(`Unsupported unit: ${unit}`);
    }

    switch (operator) {
      case CalculationsOperators.EQUALS:
        return inputDate.getTime() === targetDate.getTime();
      case CalculationsOperators.NOT_EQUALS:
        return inputDate.getTime() !== targetDate.getTime();
      case CalculationsOperators.MORE_THAN:
        return inputDate.getTime() > targetDate.getTime();
      case CalculationsOperators.LESS_THAN:
        return inputDate.getTime() < targetDate.getTime();
      case CalculationsOperators.MORE_THAN_EQUALS:
        return inputDate.getTime() >= targetDate.getTime();
      case CalculationsOperators.LESS_THAN_EQUALS:
        return inputDate.getTime() <= targetDate.getTime();
      default:
        throw new Error(`Unsupported operator: ${operator}`);
    }
  }

  /**
   * Convert a number of minutes into a readable string format with hours and minutes.
   * @param {number} value - The input value in minutes to format.
   * @returns {string} - Returns a formatted string like "30 min", "1 hour", or "1 hour 30 min".
   */
  static formatMinutes(value) {
    if (typeof value !== 'number' || value < 0) {
      return '';
    }

    const hours = Math.floor(value / 60);
    const minutes = value % 60;

    if (hours > 0 && minutes > 0) {
      return `${hours} hour${hours > 1 ? 's' : ''} ${minutes} min`;
    } else if (hours > 0) {
      return `${hours} hour${hours > 1 ? 's' : ''}`;
    } else {
      return `${minutes} min`;
    }
  }

  /**
   * Convert a datetime string into the format "YYYY-mm-dd hh:mm:ss".
   * @param {string} datetime - The input datetime string.
   * @returns {string} - Returns the formatted datetime string, or an empty string if the input is invalid.
   */
  static formatDateTime(datetime) {
    if (this.isNull(datetime)) {
      return null;
    }

    const date = new Date(datetime);

    if (isNaN(date.getTime())) {
      return '';
    }

    const pad = (num) => String(num).padStart(2, '0');

    const year = date.getFullYear();
    const month = pad(date.getMonth() + 1);
    const day = pad(date.getDate());
    const hours = pad(date.getHours());
    const minutes = pad(date.getMinutes());
    const seconds = pad(date.getSeconds());

    return `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
  }

  /**
   * Convert a datetime string into the format "YYYY-MM-DD".
   * @param {string} datetime - The input datetime string.
   * @returns {string} - Returns the formatted date string, or an empty string if the input is invalid.
   */
  static formatDate(datetime) {
    if (this.isNull(datetime)) {
      return 'N/A';
    }

    const date = new Date(datetime);

    if (isNaN(date.getTime())) {
      return '';
    }

    const pad = (num) => String(num).padStart(2, '0');

    const year = date.getFullYear();
    const month = pad(date.getMonth() + 1);
    const day = pad(date.getDate());

    return `${year}-${month}-${day}`;
  }

  /**
   * Format a string by replacing underscores and hyphens with spaces.
   * @param {string} value - The input string to format.
   * @returns {string} - Returns a formatted string with spaces instead of "_" and "-".
   */
  static formatString(value) {
    if (typeof value !== 'string') {
      return '';
    }

    return value.replace(/[_-]/g, ' ');
  }

  /**
   * Modify the current date by adding or subtracting the specified time.
   * @param {object} timeObject - An object specifying the time to add or subtract.
   * @param {number} [timeObject.days] - Number of days to modify.
   * @param {number} [timeObject.months] - Number of months to modify.
   * @param {number} [timeObject.years] - Number of years to modify.
   * @param {number} [timeObject.hours] - Number of hours to modify.
   * @param {number} [timeObject.minutes] - Number of minutes to modify.
   * @param {number} [timeObject.seconds] - Number of seconds to modify.
   * @param {'+'|'-'} operator - Specify whether to add ('+') or subtract ('-') the time.
   * @returns {Date} - The modified date.
   */
  static modifyDate(timeObject, operator) {
    if (!timeObject || typeof timeObject !== 'object') {
      throw new Error('Invalid input: timeObject must be an object.');
    }

    if (![CalculationsOperators.ADD, CalculationsOperators.SUBTRACT].includes(operator)) {
      throw new Error("Invalid operator: must be '+' or '-'.");
    }

    // Get today's date
    const currentDate = new Date();

    // Determine the multiplier based on operator
    const multiplier = operator === CalculationsOperators.ADD ? 1 : -1;

    // Apply the changes to the date
    if (timeObject.years) {
      currentDate.setFullYear(currentDate.getFullYear() + multiplier * timeObject.years);
    }
    if (timeObject.months) {
      currentDate.setMonth(currentDate.getMonth() + multiplier * timeObject.months);
    }
    if (timeObject.days) {
      currentDate.setDate(currentDate.getDate() + multiplier * timeObject.days);
    }
    if (timeObject.hours) {
      currentDate.setHours(currentDate.getHours() + multiplier * timeObject.hours);
    }
    if (timeObject.minutes) {
      currentDate.setMinutes(currentDate.getMinutes() + multiplier * timeObject.minutes);
    }
    if (timeObject.seconds) {
      currentDate.setSeconds(currentDate.getSeconds() + multiplier * timeObject.seconds);
    }

    return currentDate;
  }

  /**
   * Get the appropriate color based on theme, type, and colorKey.
   * @param {object} theme - The theme object containing the palette.
   * @param {number} type - The type indicating the color category.
   * @param {string} colorKey - The key indicating which color to retrieve.
   * @returns {string} - The resolved color value.
   */
  static getColor(theme, type, colorKey) {
    const colorMapping = {
      0: theme.palette.error.main,
      2: theme.palette.warning.main,
      1: colorKey === 'hover' || colorKey === 'focus' ? theme.palette.primary.main : theme.palette.secondary.light,
      default: colorKey === 'text' ? theme.palette.secondary[600] : theme.palette.secondary.light
    };

    return colorMapping[type] || colorMapping.default;
  }

  /**
   * Generate the text field styles based on theme and type.
   * @param {object} theme - The theme object containing the palette.
   * @param {number} type - The type indicating the color category.
   * @returns {object} - The styles for the text field.
   */
  static textFieldStyle(theme, type) {
    const getColor = (key) => this.getColor(theme, type, key);

    return {
      flex: 1,
      '& .MuiOutlinedInput-root': {
        '& fieldset': {
          borderColor: getColor('border')
        },
        '&:hover fieldset': {
          borderColor: getColor('hover')
        },
        '&.Mui-focused fieldset': {
          borderColor: getColor('focus')
        },
        '& .MuiFormLabel-root': {
          color: getColor('text')
        }
      },
      '& .MuiFormLabel-root.Mui-focused': {
        color: getColor('focus')
      }
    };
  }

  /**
   * Check if the provided user status is valid.
   * @param {object|null|undefined} isValidUser - The user status object to validate.
   * @returns {boolean} - Returns `true` if the user status is valid, otherwise `false`.
   */
  static checkIsValidStatus(isValidUser) {
    if (this.isNull(isValidUser)) {
      return true;
    }

    if (!isValidUser || typeof isValidUser !== 'object') {
      return false;
    }

    const values = Object.values(isValidUser);

    if (values.includes(0)) {
      return false;
    }

    if (values.includes(2)) {
      return true;
    }

    return false;
  }
}
