export function splitString(input, spliter) {
  if (!input) {
    return [];
  }
  return input
    .split(spliter)
    .map((item) => item.trim())
    .filter((item) => item.length > 0); // Remove empty strings
}

export function trimString(input, charCount) {
  if (charCount < 0) {
    throw new Error('Character count must be non-negative');
  }

  return input.length <= charCount ? input : input.slice(0, charCount) + "...";
}



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