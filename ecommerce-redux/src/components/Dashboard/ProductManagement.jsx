import React, { useEffect} from "react";
import { useDispatch, useSelector } from "react-redux";
import { loadingSelector, productListSelector } from "../../redux-toolkit/selectors";
import { fetchProductListThunkAction } from "../../reducers/productSlice";
import { FaEye, FaStar } from "react-icons/fa";
function ProductManagement() {
    const dispatch = useDispatch()
    const products = useSelector(productListSelector)
    const loading = useSelector(loadingSelector)
    useEffect(() => {
        dispatch(fetchProductListThunkAction())
    }, [dispatch])
    return (
        <>
            <h5>Product List Management</h5>
            <div className="row">
                {
                    loading === 'loading' ? <p>Loading...</p> : (
                        <div className="col-md-12 col-lg-12 col-sm-12">
                            <table className="table table-hover table-orders">
                                <thead>
                                    <tr>
                                        <th className="text-center align-middle">Title</th>
                                        <th className="text-start align-middle">Color</th>
                                        <th className="text-start align-middle">Category</th>
                                        <th className="text-start align-middle">Company</th>
                                        <th className="text-end align-middle">Price</th>
                                        <th className="text-center align-middle">Rate</th>
                                        <th className="text-center align-middle">Actions</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {
                                        products?.map((product => (
                                            <tr key={product.id}>
                                                <td className="text-center align-middle" style={{width: '300px'}}>
                                                    <div className="d-flex align-items-center py-2">
                                                        <img src={product.img} alt="" className="me-1" style={{width: '15%'}}/>
                                                        {product.title}
                                                    </div>
                                                </td>
                                                <td className="text-start align-middle">
                                                    <span className={`badge ${product.color === 'white' ? 'border text-dark' : ''}`} style={{backgroundColor: product.color}}>{product.color}</span>
                                                </td>
                                                <td className="text-start align-middle">
                                                    {product.category}
                                                </td>
                                                <td className="text-start align-middle">
                                                    {product.company}
                                                </td>
                                                <td className="text-end align-middle">
                                                    <div className="d-flex flex-column">
                                                        <del>${product.prevPrice}</del>
                                                        <span>${product.newPrice}</span>
                                                    </div>
                                                </td>
                                                <td className="text-center align-middle">
                                                    <div className="d-flex flex-column align-items-center justify-content-center">
                                                        <div className="d-flex align-items-center">
                                                            <span className="me-1">{product.star}</span>
                                                            <FaStar color="yellow"/>
                                                        </div>
                                                        <div className="d-flex align-items-center">
                                                            <span className="me-1">{product.reviews}</span>
                                                            <FaEye color="green"/>
                                                        </div>
                                                    </div>
                                                </td>
                                                <td></td>
                                            </tr>
                                        )))
                                    }
                                </tbody>
                            </table>
                        </div>
                    )
                }
            </div>
        </>
    )
}

export default ProductManagement