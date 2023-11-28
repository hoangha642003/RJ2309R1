import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

const cartSlice = createSlice({
    name: 'cart',
    initialState: {
        cartInfo: {
            subTotal: 0,
            shipping: 0,
            totalAmount: 0
        },
        cartDetails: [

        ]
    },
    reducers: {
        addToCart: (state, action) => {
            let cartItem = state.cartDetails?.find((item) => item.id === action?.payload?.id)
            if (cartItem?.id) {
                cartItem.quantity = Number(cartItem.quantity) + 1;
                cartItem.amount = Number(cartItem.quantity * cartItem.newPrice)
            }
            else {
                state.cartDetails.push({
                    ...action.payload,
                    quantity: 1,
                    amount: action?.payload?.newPrice
                })
            }
            let newSubTotal = state.cartDetails.reduce((preValue, curValue) => preValue + (curValue.newPrice * curValue.quantity), 0)
            state.cartInfo.subTotal = newSubTotal
            state.cartInfo.totalAmount = newSubTotal + state.cartInfo.shipping
        },
        incrementQuantity: (state, action) => {
            let cartItem = state.cartDetails?.find((item) => item.id === action?.payload?.id)
            cartItem.quantity = Number(cartItem.quantity) + 1;
            cartItem.amount = Number(cartItem.quantity * cartItem.newPrice)
            let newSubTotal = state.cartDetails.reduce((preValue, curValue) => preValue + (curValue.newPrice * curValue.quantity), 0)
            state.cartInfo.subTotal = newSubTotal
            state.cartInfo.totalAmount = newSubTotal + state.cartInfo.shipping
        },
        decrementQuantity: (state, action) => {
            let cartItem = state.cartDetails?.find((item) => item.id === action?.payload?.id)
            if (cartItem.quantity > 1) {
                cartItem.quantity = Number(cartItem.quantity) - 1;
                cartItem.amount = Number(cartItem.quantity * cartItem.newPrice)
                let newSubTotal = state.cartDetails.reduce((preValue, curValue) => preValue + (curValue.newPrice * curValue.quantity), 0)
                state.cartInfo.subTotal = newSubTotal
                state.cartInfo.totalAmount = newSubTotal + state.cartInfo.shipping
            }

        },
        removeCartItem: (state, action) => {
            state.cartDetails = state.cartDetails.filter((item) => item.id !== action.payload.id)
            let newSubTotal = state.cartDetails.reduce((preValue, curValue) => preValue + (curValue.newPrice * curValue.quantity), 0)
            state.cartInfo.subTotal = newSubTotal
            state.cartInfo.totalAmount = newSubTotal + state.cartInfo.shipping
        },
        checkoutCart: (state, action) => {
            state.cartDetails = []
            state.cartInfo = {
                subTotal: 0,
                shipping: 0,
                totalAmount: 0
            }
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(checkoutCartThunkAction.pending, (state, action) => {

            })
            .addCase(checkoutCartThunkAction.fulfilled, (state, action) => {
                state.cartDetails = []
                state.cartInfo = {
                    subTotal: 0,
                    shipping: 0,
                    totalAmount: 0
                }
            })
    }
})

export const checkoutCartThunkAction = createAsyncThunk('cart/checkoutThunkAction', async (data) => {
    let orderRes = await fetch('http://localhost:3000/orderList', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    })
    let result = await orderRes.json()
    return result;
})

export default cartSlice;