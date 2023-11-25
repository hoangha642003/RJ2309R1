import { createSlice } from "@reduxjs/toolkit";

const cartSlice = createSlice({
    name: 'cart',
    initialState: {
        cartInfo: {
            totalAmount: 0
        },
        cartDetails: [

        ]
    },
    reducers: {
        addToCart: (state, action) => {
            let cartItem = state.cartDetails?.find((item) => item.id === action?.payload?.id)
            if(cartItem?.id){
                cartItem.quantity =  Number(cartItem.quantity) + 1;
                cartItem.amount =  Number(cartItem.quantity * cartItem.newPrice)
            }
            else {
                state.cartDetails.push({
                    ...action.payload,
                    quantity: 1,
                    amount: action?.payload?.newPrice
                })
            }
            let newTotalAmount = state.cartDetails.reduce((preValue, curValue) => preValue + (curValue.newPrice * curValue.quantity), 0)
            state.cartInfo.totalAmount = newTotalAmount
        },
        incrementQuantity: (state, action) => {
            let cartItem = state.cartDetails?.find((item) => item.id === action?.payload?.id)
            cartItem.quantity =  Number(cartItem.quantity) + 1;
            cartItem.amount =  Number(cartItem.quantity * cartItem.newPrice)
            let newTotalAmount = state.cartDetails.reduce((preValue, curValue) => preValue + (curValue.newPrice * curValue.quantity), 0)
            state.cartInfo.totalAmount = newTotalAmount
        },
        decrementQuantity: (state, action) => {
            let cartItem = state.cartDetails?.find((item) => item.id === action?.payload?.id)
            cartItem.quantity =  Number(cartItem.quantity) - 1;
            cartItem.amount =  Number(cartItem.quantity * cartItem.newPrice)
            let newTotalAmount = state.cartDetails.reduce((preValue, curValue) => preValue + (curValue.newPrice * curValue.quantity), 0)
            state.cartInfo.totalAmount = newTotalAmount
        },
        removeCartItem: (state, action) => {
            state.cartDetails = state.cartDetails.filter((item) => item.id !== action.payload.id)
            let newTotalAmount = state.cartDetails.reduce((preValue, curValue) => preValue + (curValue.newPrice * curValue.quantity), 0)
            state.cartInfo.totalAmount = newTotalAmount
        }
    }
})

export default cartSlice;