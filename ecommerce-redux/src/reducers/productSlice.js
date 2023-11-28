import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

const productSlice = createSlice({
    name: 'productList',
    initialState: {
        status: 'idle',
        products: []
    },
    reducers: {
        fetchProducts: (state, action) => {
            state = action.payload
        }
    },
    extraReducers: (builder) => {
        builder.addCase(fetchProductListThunkAction.pending, (state, action) => {
            state.status = 'loading'
        }).addCase (fetchProductListThunkAction.fulfilled, (state, action) => {
            state.status = 'idle'
            state.products = action.payload
        })
    }
})
export const fetchProductListThunkAction = createAsyncThunk('thunkActionProductList/fetchProducts',  async () => {
    let productsRes = await fetch('http://localhost:3000/products')
    let data = await productsRes.json()
    return data
})
export default productSlice

/*
    status
    - pending
    - fulfilled
    - rejected
 */