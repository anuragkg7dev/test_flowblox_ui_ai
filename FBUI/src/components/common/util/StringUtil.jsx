export function splitString(input, spliter) {
  if (!input) {
    return [];
  }
  return input
    .split(spliter)
    .map((item) => item.trim())
    .filter(item => item !== "" && item !== undefined); // Remove empty strings
}

export function trimString(input, charCount) {
  if (charCount < 0) {
    throw new Error('Character count must be non-negative');
  }

  return input.length <= charCount ? input : input.slice(0, charCount) + "...";
}

export const COMMA = ','


export function replacePlaceholders(inputStr, replaceArr) {

  /* Example replaceArr [{ replaceKey: "##~cost~##", replaceValue: "$200" }]; */

  if (!inputStr || !replaceArr || replaceArr.length === 0) {
    return inputStr; // Return original string if input is invalid
  }

  let result = inputStr;
  replaceArr.forEach(({ replaceKey, replaceValue }) => {
    result = result.replace("##~" + replaceKey + "~##", replaceValue);
  });

  return result;
}

// Null or undefined
export const isNullOrUndefined = (value) => value == null || value == undefined;

// Empty string
export const isEmptyString = (value) => value == "";

// Join STring present in array
export const joinStrings = (arr) => { return arr.filter(item => item && item.trim() !== "").join(", "); }

export function isNotUndefinedOrWhitespace(str) {
  return str !== undefined && String(str).trim().length > 0;
}

