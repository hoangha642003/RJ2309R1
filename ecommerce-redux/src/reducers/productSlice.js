import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

const productSlice = createSlice({
    name: 'productList',
    initialState: {
        status: 'idle',
        products: [],
        product: {},
        pagination: {}
    },
    reducers: {
        fetchProducts: (state, action) => {
            state = action.payload
        }
    },
    extraReducers: (builder) => {
        builder.addCase(fetchProductListThunkAction.pending, (state, action) => {
            state.status = 'loading'
        }).addCase(fetchProductListThunkAction.fulfilled, (state, action) => {
            state.status = 'idle'
            state.products = action.payload
        }).addCase(fetchProductByIdThunkAction.pending, (state, action) => {
            state.status = 'loading'
        }).addCase(fetchProductByIdThunkAction.fulfilled, (state, action) => {
            state.status = 'idle'
            state.product = action.payload
        })
    }
})
export const fetchProductListThunkAction = createAsyncThunk('productList/fetchProductListThunkAction', async () => {
    let productsRes = await fetch(`https://jsonserver-vercel-api.vercel.app/products`)
    let data = await productsRes.json()
    data = data.sort((item_1, item_2) => item_2.id - item_1.id)
    return data
})


export const fetchProductByIdThunkAction = createAsyncThunk('productList/fetchProductByIdThunkAction', async (id) => {
    let productsRes = await fetch(`https://jsonserver-vercel-api.vercel.app/products/${id}`)
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