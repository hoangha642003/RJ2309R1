export const setSearchText = (payload) => {
    return {
        type: 'filters/searchText',
        payload
    }
}

export const setSearchRecommended = (payload) => {
    return {
        type: 'filters/searchRecommended',
        payload
    }
}