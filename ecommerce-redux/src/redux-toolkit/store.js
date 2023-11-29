import { configureStore } from "@reduxjs/toolkit";
import productSlice from "../reducers/productSlice";
import filtersSlice from "../reducers/filtersSlice";
import cartSlice from "../reducers/cartSlice";
import orderSlice from "../reducers/orderSlice";

const store = configureStore({
    reducer: {
        productList: productSlice.reducer,
        filters: filtersSlice.reducer,
        cart: cartSlice.reducer,
        orders: orderSlice.reducer
    }
})

export default store