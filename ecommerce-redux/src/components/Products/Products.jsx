import React, { useEffect } from "react";
import Product from "./Product";
import { useDispatch, useSelector } from "react-redux";
import { fetchProductListThunkAction } from "../../reducers/productSlice";

function Products() {
    const dispatch = useDispatch()
    const productList = useSelector((state) => state.productList.products)
    const {searchText} = useSelector((state) => state.filters)

    useEffect(() => {
        dispatch(fetchProductListThunkAction())
    }, [])

    const queryProductList = () => {
        let filterProducts = [...productList]
        if(searchText) {
            filterProducts = filterProducts.filter((p) => p.title.toLowerCase().includes(searchText.toLowerCase()))
        }
        return filterProducts
    }
    const remainProductList = queryProductList()
    return (
        <div className="py-2 d-flex flex-column justify-content-center">
            <h5>Products</h5>
            <div className="row">
                {
                    remainProductList?.map((product) => (
                        <Product key={product.id} product={product} />
                    ))
                }
            </div>
        </div>
    )
}

export default Products;