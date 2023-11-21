const initState = {
    searchText: '',
    recommended: 'All',
    category: 'All',
    price: '0,0',
    color: 'All'
}

const filtersReducer = (state = initState, action) => {
    switch (action.type) {
        case 'filters/searchText': {
            return {
                ...state,
                searchText: action.payload
            }
        }
        case 'filters/searchRecommended': {
            return {
                ...state,
                recommended: action.payload
            }
        }
        default: {
            return state
        }
    }
}

export default filtersReducer