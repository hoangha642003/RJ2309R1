import { configureStore } from "@reduxjs/toolkit";
import productSlice from "../reducers/productSlice";
import filtersSlice from "../reducers/filtersSlice";
import cartSlice from "../reducers/cartSlice";

const store = configureStore({
    reducer: {
        productList: productSlice.reducer,
        filters: filtersSlice.reducer,
        cart: cartSlice.reducer
    }
})

export default store