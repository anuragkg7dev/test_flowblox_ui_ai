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