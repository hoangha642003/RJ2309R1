import { combineReducers } from "redux";
import productReducer from "./productSlice";
import filtersReducer from "./filtersSlice";
const rootReducer = combineReducers({
    productList: productReducer,
    filters: filtersReducer
})
export default rootReducer;