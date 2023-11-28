import React, { useEffect } from "react";
import Product from "./Product";
import { useDispatch, useSelector } from "react-redux";
import { fetchProductListThunkAction } from "../../reducers/productSlice";
import { filtersProductListSelector, loadingSelector } from "../../redux-toolkit/selectors";

function Products() {
    const loading = useSelector(loadingSelector)
    const dispatch = useDispatch()
    useEffect(() => {
        dispatch(fetchProductListThunkAction())
    }, [dispatch])
    const remainProductList = useSelector(filtersProductListSelector)
    return (
        <div className="py-2 d-flex flex-column justify-content-center">
            <h5>Products</h5>
            {
                loading === 'loading' ? (
                    <p>Loading ...</p>
                ) : (
                    <div className="row">
                    {
                        remainProductList?.map((product) => (
                            <Product key={product.id} product={product} />
                        ))
                    }
                </div>
                )
            }
            
        </div>
    )
}

export default Products;