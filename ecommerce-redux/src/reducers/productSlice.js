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
        }).addCase(addNewProductThunkAction.fulfilled, (state, action) => {
            state.status = 'idle'
            state.products.unshift(action.payload)
        }).addCase(fetchProductByIdThunkAction.pending, (state, action) => {
            state.status = 'loading'
        }).addCase(fetchProductByIdThunkAction.fulfilled, (state, action) => {
            state.status = 'idle'
            state.product = action.payload
        }).addCase(editProductThunkAction.fulfilled, (state, action) => {
            state.status = 'idle'
            state.products = state.products.map(p => {
                if (p.id === action.payload?.id) {
                    return action.payload
                }
                return p
            })
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

export const addNewProductThunkAction = createAsyncThunk('productList/addNewProductThunkAction', async (data) => {
    let addProductRes = await fetch('https://jsonserver-vercel-api.vercel.app/products', {
        method: "POST",
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    })
    let result = await addProductRes.json()
    return result
})

export const editProductThunkAction = createAsyncThunk('productList/editProductThunkAction', async (data) => {
    let addProductRes = await fetch(`https://jsonserver-vercel-api.vercel.app/products/${data?.id}`, {
        method: "PUT",
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    })
    let result = await addProductRes.json()
    return result
})

export default productSlice

/*
    status
    - pending
    - fulfilled
    - rejected
 */