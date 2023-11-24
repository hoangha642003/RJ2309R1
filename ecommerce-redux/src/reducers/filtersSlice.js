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
        },
        setSearchRecommended: (state, action) => {
            state.recommended = action.payload
        },
        setSearchColor: (state, action) => {
            state.color = action.payload
        },
        setSearchPrice: (state, action) => {
            state.price = action.payload
        },
        setSearchCategory: (state, action) => {
            state.category = action.payload
        }
    }
})

export default filtersSlice;