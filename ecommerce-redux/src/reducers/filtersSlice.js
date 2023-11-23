import { createSlice } from "@reduxjs/toolkit";

const filtersSlice = createSlice({
    name: 'filters',
    initialState: {
        searchText: '',
        recommended: 'All',
        price: '0,0',
        color: 'All',
        category: 'All'
    },
    reducers: {
        setSearchText: (state, action) => {
            state.searchText = action.payload
        }
    }
})

export default filtersSlice;