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
                state.data.products = state.data.products.filter((p) => p.id !== action.payload?.id)
            })
            .addCase(fetchProductPaginationThunkAction.pending, (state, action) => {
                state.status = 'loading'
            })
            .addCase(fetchProductPaginationThunkAction.fulfilled, (state, action) => {
                state.status = 'idle'
                state.data = action.payload
            })
            .addCase(editProductThunkAction.fulfilled, (state, action) => {
                state.status = 'idle'
                state.data.products = state.data.products.map(p => {
                    if (p.id === action.payload?.id) {
                        return action.payload
                    }
                    return p
                })
            })
            .addCase(addNewProductThunkAction.fulfilled, (state, action) => {
                state.status = 'idle'
                state.data.products.unshift(action.payload)
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
    const { _page, _limit, _sortField, _order } = data
    
    let res = await fetch(`https://jsonserver-vercel-api.vercel.app/products`)
    let result = await res.json();
    
    let productsRes = await fetch(`https://jsonserver-vercel-api.vercel.app/products?_page=${_page}&_limit=${_limit}&_sort=${_sortField}&_order=${_order}`)
    let products = await productsRes.json()
    let payload = {
        pagination: {
            totalPage: Math.ceil(Number(result.length) / _limit),
            currentPage: _page,
            pageSize: _limit
        },
        products: products
    }
    return payload
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


export default manageProductSlice;
