import { configureStore, getDefaultMiddleware } from "@reduxjs/toolkit";
import productSlice from "../reducers/productSlice";
import filtersSlice from "../reducers/filtersSlice";
import cartSlice from "../reducers/cartSlice";
import orderSlice from "../reducers/orderSlice";
import manageProductSlice from "../reducers/manageProductSlice";

const store = configureStore({
    reducer: {
        productList: productSlice.reducer,
        filters: filtersSlice.reducer,
        cart: cartSlice.reducer,
        orders: orderSlice.reducer,
        manageProduct: manageProductSlice.reducer
    },
    middleware: (getDefaultMiddleware) => getDefaultMiddleware({
        serializableCheck: false
    })
})

export default store