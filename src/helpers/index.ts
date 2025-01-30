export const wait = (ms: number) => {
  return new Promise(resolve => setTimeout(resolve, ms));
};
// wait(2000)

export const numberFormat = (value: any, locale = 'en-GB', options: any = {}) =>
  new Intl.NumberFormat(locale, options).format(value);

// For first letter capital
export const capitalizeFirstLetter = (str: string): string => {
  if (!str) return ''; // Handle null, undefined, or empty string explicitly
  return str.charAt(0).toUpperCase() + str.slice(1);
};

export const isBlankString = (str: string) =>
  !str || str.length === 0 || /^\s*$/.test(str);
