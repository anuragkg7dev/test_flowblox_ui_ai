export const clone = (data) => {
    return JSON.parse(JSON.stringify(data));
}

export const transformOptionsToKVObject = (options) => {

    return options?.reduce((acc, { label, value }) => {
        acc[value] = label
        return acc
    }, {})

}

export const getCombinedOptionsKVObject = (configuration) => {
    // Collect all options into a single array
    const allOptions = Object.values(configuration).flat()    
    // Transform the combined options into an object
    console.log(allOptions)
    return transformOptionsToKVObject(allOptions)
}

// Empty array
export const isEmptyArray = (value) => Array.isArray(value) && value.length === 0;

// Empty object
export const isEmptyObject = (value) => Object.keys(value).length === 0;

// Rturns Index
export function getIndexByCharSum(arr, target) {
  let sum = 0;
  for (let i = 0; i < arr.length; i++) {
    sum += arr[i].length;
    if (sum >= target) {
      return i > 0 ? i - 1 : 0;
    }
  }
  return arr.length - 1;
}