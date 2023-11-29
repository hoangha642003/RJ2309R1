import React from "react";
import MainLayout from "../layouts/MainLayout";
import { cartSelector } from "../redux-toolkit/selectors";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { FaArrowLeft } from "react-icons/fa";
import cartSlice, { checkoutCartThunkAction } from "../reducers/cartSlice";
import { useForm } from "react-hook-form"
import { yupResolver } from "@hookform/resolvers/yup"
import * as yup from "yup"
import Swal from "sweetalert2";
import { v4 as uuid } from "uuid";

const schema = yup.object({
    fullname: yup.string().required(),
    mobile: yup.string().required(),
    address: yup.string().required(),
    email: yup.string().required()
})

function CartPage() {
    const dispatch = useDispatch()
    const cart = useSelector(cartSelector)
    const { cartInfo, cartDetails } = cart

    const { register, handleSubmit, formState: { errors }, reset } = useForm({
        resolver: yupResolver(schema)
    })

    const handleCheckoutCart = (data) => {
        Swal.fire({
            title: 'Confirm checkout',
            text: 'Are you sure to checkout',
            showCancelButton: true,
            confirmButtonColor: 'red',
            cancelButtonColor: 'black'

        }).then(result => {
            if (result.isConfirmed) {
                const order = {
                    orderId: uuid(),
                    orderInfo: {
                        ...cart.cartInfo,
                        orderDate: Math.floor(Date.now() / 1000),
                    },
                    orderDetails: [
                        ...cart.cartDetails
                    ],
                    customerInfo: {
                        ...data
                    }
                }
                dispatch(checkoutCartThunkAction(order))
                reset()
                Swal.fire('Cart checkout success!')
            }
        })

    }
    return (
        <MainLayout>
            <div className="container mt-1">
                <div className="row">
                    <div className="col-md-12">
                        <h3 className=" py-2">Cart Detail</h3>
                    </div>
                </div>
                <div className="row">
                    <div className="col-lg-8 col-md-12 col-sm-12">
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
                                                        <div className={`badge py-1 px-3 ${cartItem.color === 'white' ? 'border text-black' : ''}`} style={{ backgroundColor: cartItem.color }}>{cartItem.color}</div>
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
                    <div className="col-lg-4 col-md-12 col-sm-12" style={{ minWidth: '300px' }}>
                        <form onSubmit={handleSubmit(handleCheckoutCart)}>
                            <div className="order-summary p-3">
                                <h3 className="border-bottom py-2">Order Summary</h3>
                                <div className="d-flex flex-column">
                                    <div className="d-flex align-items-center justify-content-between py-2">
                                        <span>Subtotal</span>
                                        <span className="fw-bolder">${cartInfo.subTotal}</span>
                                    </div>
                                    <div className="d-flex align-items-center justify-content-between py-2">
                                        <span>Shipping</span>
                                        <span className="fw-bolder">{`${cartInfo.shipping ? '$' + cartInfo.shipping : 'Free'}`}</span>
                                    </div>
                                </div>
                                <div className="d-flex align-items-center justify-content-between border-top mt-2 py-2">
                                    <span className="fs-6">Total</span>
                                    <span className="fw-bolder fs-6">${cartInfo.total}</span>
                                </div>
                            </div>
                            <div className="customer-info p-3 mt-2">
                                <h3 className="border-bottom py-2">Customer Info</h3>
                                <div className="mb-2">
                                    <label className="form-label">Fullname</label>
                                    <input type="text"
                                        className={`form-control  ${errors?.fullname?.message ? 'is-invalid' : ''}`}
                                        placeholder="Fullname"
                                        {...register("fullname")}
                                    />
                                    <span className="invalid-feedback">{errors?.fullname?.message}</span>
                                </div>
                                <div className="mb-2">
                                    <label className="form-label">Mobile</label>
                                    <input type="text"
                                        className={`form-control  ${errors?.mobile?.message ? 'is-invalid' : ''}`}
                                        placeholder="Mobile"
                                        {...register("mobile")}
                                    />
                                    <span className="invalid-feedback">{errors?.mobile?.message}</span>
                                </div>
                                <div className="mb-2">
                                    <label className="form-label">Address</label>
                                    <input type="text"
                                        className={`form-control  ${errors?.address?.message ? 'is-invalid' : ''}`}
                                        placeholder="Address"
                                        {...register("address")}
                                    />
                                    <span className="invalid-feedback">{errors?.address?.message}</span>
                                </div>
                                <div className="form-group mb-3">
                                    <label className="form-label">Email</label>
                                    <input type="text"
                                        className={`form-control ${errors?.email?.message ? 'is-invalid' : ''}`}
                                        placeholder="Email"
                                        {...register('email')}
                                    />
                                    <span className="invalid-feedback">{errors?.email?.message}</span>
                                </div>
                            </div>
                            <div className="py-2 bg-success mt-2 d-flex align-items-center justify-content-center text-white btn-checkout">
                                <button className="btn btn-block text-white w-100 h-100" type="submit">CHECKOUT</button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </MainLayout>
    )
}

export default CartPage