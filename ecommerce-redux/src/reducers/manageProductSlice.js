import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

const manageProductSlice = createSlice({
    name: 'manageProduct',
    initialState: {
        status: 'idle',
        data: {
            pagination: {},
            products: []
        }
    },
    reducers: {
    },
    extraReducers: (builder) => {
        builder
            .addCase(removeProductThunkAction.fulfilled, (state, action) => {
                state.status = 'idle'
                state.products = state.products.filter((p) => p.id !== action.payload?.id)
            })
            .addCase(fetchProductPaginationThunkAction.pending, (state, action) => {
                state.status = 'loading'
            })
            .addCase(fetchProductPaginationThunkAction.fulfilled, (state, action) => {
                state.status = 'idle'
                state.data = action.payload
            })
    }
})

export const removeProductThunkAction = createAsyncThunk('productList/removeProductThunkAction', async (data) => {
    let removeProductRes = await fetch(`https://jsonserver-vercel-api.vercel.app/products/${data?.id}`, {
        method: "DELETE"
    })
    await removeProductRes.json()
    return data
})

export const fetchProductPaginationThunkAction = createAsyncThunk('productList/fetchProductPaginationThunkAction', async (data) => {
    const { _page, _limit } = data
    let res = await fetch(`https://jsonserver-vercel-api.vercel.app/products`)
    let result = await res.json();
    
    let productsRes = await fetch(`https://jsonserver-vercel-api.vercel.app/products?_page=${_page}&_limit=${_limit}`)
    let products = await productsRes.json()
    let payload = {
        pagination: {
            totalPage: Math.ceil(Number(result.length) / _limit),
            currentPage: _page,
            pageSize: _limit
        },
        products: products
    }
    console.log(payload.pagination);
    return payload
})

export default manageProductSlice;
