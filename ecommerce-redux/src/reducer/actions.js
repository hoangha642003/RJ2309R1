/*
    action: {
        type: feature/action
        payload
    }
*/ 
export const setSearchText = (payload) => {
    return {
        type: 'filters/searchText',
        payload: payload
    }
}

export const setSearchRecommended = (payload) => {
    return {
        type: 'filters/searchRecommended',
        payload: payload
    }
}

export const setSearchCategory = (payload) => {
    return {
        type: 'filters/searchCategory',
        payload: payload
    }
}

export const setSearchColor = (payload) => {
    return {
        type: 'filters/searchColor',
        payload: payload
    }
}

export const setSearchPrice = (payload) => {
    return {
        type: 'filters/searchPrice',
        payload: payload
    }
}

export const fetchProducts = (payload) => {
    return {
        type: 'productList/fetchProducts',
        payload
    }
}

export const addToCart = (payload) => {
    return {
        type: 'cart/addToCart',
        payload
    }
}