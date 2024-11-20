export const wait = (ms: number) => {
  return new Promise(resolve => setTimeout(resolve, ms));
};
// wait(2000)


export const numberFormat = (
  value: any,
  locale = 'en-GB',
  options: any = {},
) => new Intl.NumberFormat(locale, options).format(value);



// For first letter capital
export const capitalizeFirstLetter = (str: string) =>
  str && str.length ? str.charAt(0).toUpperCase() + str.slice(1) : str;

export const isBlankString = (str: string) =>
  !str || str.length === 0 || /^\s*$/.test(str);

// =================================================================
// ! Array Method

export const isNotEmptyArray = (arr: any[]) =>
  Array.isArray(arr) && arr.length > 0;

// =================================================================


export const checkObjEmptyOrNullGivenKeys = (obj: Record<string, any>, properties?: string[]): boolean => {

  if (Object.keys(obj).length === 0) {
    return true; // Object is empty
  }

  const propertiesToCheck = properties || Object.keys(obj);

  for (const property of propertiesToCheck) {
    const propertyValue = obj[property];
    if (propertyValue === null || propertyValue === undefined || propertyValue.length === 0) {
      return true; // Property value is null or undefined
    }

    if (typeof propertyValue === 'object' && Object.keys(propertyValue).length === 0) {
      return true; // Property is an object and is empty
    }
  }

  return false; // Object is not empty, and none of the specified properties are null or empty
};

// =================================================================

export function ellipsizeMiddle(text: string, maxLength: number) {
  if (text.length <= maxLength) {
    return text;
  }
  const start = text.slice(0, maxLength);
  const end = text.slice(-maxLength);
  return start + '...' + end;
}
