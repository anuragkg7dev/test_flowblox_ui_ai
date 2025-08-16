export const filterRoutes = (list, type) => {
    return list.filter(x => type == x.type)
}

export const getHomeRoute = (list, type) => {
    let result = filterRoutes(list, type)
    return result && result.length > 0 ? result[0] : undefined
}

