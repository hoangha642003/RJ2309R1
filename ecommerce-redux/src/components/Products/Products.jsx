import React from "react";
import Product from "./Product";
import { useDispatch, useSelector } from "react-redux";

function Products() {
    const productList = useSelector((state) => state.productList)
    const {searchText, recommended} = useSelector((state) => state.filters)
    const dispatch = useDispatch()

    const queryProduct = () => {
        let remainProductList = [...productList]
        if(searchText) {
            remainProductList = remainProductList.filter((p) => p.title.toLowerCase().includes(searchText.toLowerCase()))
        }
        if(recommended != 'All') {
            remainProductList = remainProductList.filter((p) => p.company.toLowerCase() === recommended.toLowerCase())
        }

        return remainProductList
    }
    const remainProductList = queryProduct()
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