import React, { useEffect } from "react";
import Product from "./Product";
import { useDispatch, useSelector } from "react-redux";
import { fetchProductListThunkAction } from "../../reducers/productSlice";
import { filtersProductListSelector } from "../../redux-toolkit/selectors";

function Products() {
    const dispatch = useDispatch()
    // const productList = useSelector((state) => state.productList.products)
    // const {searchText, category, recommended, price, color} = useSelector((state) => state.filters)

    useEffect(() => {
        dispatch(fetchProductListThunkAction())
    }, [dispatch])

    // const queryProductList = () => {
    //     let filterProducts = [...productList]
    //     if(searchText) {
    //         filterProducts = filterProducts.filter((p) => p.title.toLowerCase().includes(searchText.toLowerCase()))
    //     }
    //     if(category !== 'All'){
    //         filterProducts = filterProducts.filter((p) => p.category.toLowerCase() === category.toLowerCase())
    //     }
    //     if(recommended !== 'All'){
    //         filterProducts = filterProducts.filter((p) => p.company.toLowerCase() === recommended.toLowerCase())
    //     }
    //     if(color !== 'All'){
    //         filterProducts = filterProducts.filter((p) => p.color.toLowerCase() === color.toLowerCase())
    //     }
    //     if(price !== '0,0'){
    //         const [min, max] = price.split(',')
    //         if(min !== max) {
    //             filterProducts = filterProducts.filter((p) => p.newPrice > Number(min) && p.newPrice <= Number(max))
    //         }
    //         else {
    //             filterProducts = filterProducts.filter((p) => p.newPrice > Number(min))
    //         }
    //     }
    //     return filterProducts
    // }
    // const remainProductList = queryProductList()
    const remainProductList = useSelector(filtersProductListSelector)
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