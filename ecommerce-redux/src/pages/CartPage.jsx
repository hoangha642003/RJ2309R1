import React from "react";
import MainLayout from "../layouts/MainLayout";
import { cartSelector } from "../redux-toolkit/selectors";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { FaArrowLeft } from "react-icons/fa";
import cartSlice from "../reducers/cartSlice";

function CartPage() {
    const dispatch = useDispatch()
    const cart = useSelector(cartSelector)
    const { cartInfo, cartDetails } = cart
    return (
        <MainLayout>
            <div className="container mt-1">
                <div className="row">
                    <div className="col-md-12">
                        <h3 className=" py-2">Cart Detail</h3>
                    </div>
                </div>
                <div className="row">
                    <div className="col-md-8">
                        <table className="table cart-table">
                            <thead>
                                <tr>
                                    <th>Product</th>
                                    <th className="text-end">Price</th>
                                    <th className="text-center">Quantity</th>
                                    <th className="text-end">Total</th>
                                    <th className="text-center">Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {
                                    cartDetails?.map((cartItem) => (
                                        <tr key={cartItem.id}>
                                            <td style={{ maxWidth: '200px' }}>
                                                <div className="d-flex align-items-center">
                                                    <img className="product-image" src={cartItem.img} alt="" />
                                                    <div className="d-inline">
                                                        <div className="d-block fw-bolder mb-2">{cartItem.title}</div>
                                                        <div className="d-block">{cartItem.color}</div>
                                                    </div>
                                                </div>

                                            </td>
                                            <td className="text-end">
                                                ${cartItem.newPrice}
                                            </td>
                                            <td >
                                                <div className="cart-quantity-wrap">
                                                    <div className="cart-quantity">
                                                        {
                                                            cartItem.quantity > 1 ? 
                                                                <span onClick={() => dispatch(cartSlice.actions.decrementQuantity(cartItem))}>-</span> :
                                                                <span>-</span>
                                                        }
                                                        <span>{cartItem.quantity}</span>
                                                        <span onClick={() => dispatch(cartSlice.actions.incrementQuantity(cartItem))}>+</span>
                                                    </div>
                                                </div>

                                            </td>
                                            <td className="text-end">
                                                ${cartItem.amount}
                                            </td>
                                            <td>
                                                <div className="action-wrap">
                                                    <span className="btn-remove"
                                                        onClick={() => dispatch(cartSlice.actions.removeCartItem(cartItem))}
                                                    >&times;</span>
                                                </div>
                                            </td>
                                        </tr>
                                    ))
                                }
                            </tbody>
                        </table>
                        <Link to={'/shoe'} className="btn btn-link">
                            <FaArrowLeft /> Continue shopping
                        </Link>
                    </div>
                    <div className="col-md-4" style={{ minWidth: '300px' }}>
                        <div className="order-summary p-3">
                            <h3 className="border-bottom py-2">Order Summary</h3>
                            <div className="d-flex flex-column">
                                <div className="d-flex align-items-center justify-content-between py-2">
                                    <span>Subtotal</span>
                                    <span className="fw-bolder">${cartInfo.totalAmount}</span>
                                </div>
                                <div className="d-flex align-items-center justify-content-between py-2">
                                    <span>Shipping</span>
                                    <span className="fw-bolder">Free</span>
                                </div>
                            </div>
                            <div className="d-flex align-items-center justify-content-between border-top mt-2 py-2">
                                <span className="fs-6">Total</span>
                                <span className="fw-bolder fs-6">${cartInfo.totalAmount}</span>
                            </div>
                        </div>
                        <div className="py-3 bg-success mt-2 d-flex align-items-center justify-content-center text-white btn-checkout"
                            onClick={() => dispatch(cartSlice.actions.checkoutCart())}
                        >
                            CHECKOUT
                        </div>
                    </div>
                </div>
            </div>
        </MainLayout>
    )
}

export default CartPage