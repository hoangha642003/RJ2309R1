import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchOrderListThunkAction } from "../../reducers/orderSlice";
import { loadingOrderListSelector, orderListSelector } from "../../redux-toolkit/selectors";
import dayjs from "dayjs";
import { MdOutlineReadMore } from "react-icons/md";
function OrderManagement() {
    const dispatch = useDispatch()
    const orderList = useSelector(orderListSelector)
    const loading = useSelector(loadingOrderListSelector)
    useEffect(() => {
        dispatch(fetchOrderListThunkAction())
    }, [dispatch])
    const [order, setOrder] = useState()
    return (
        <>
            <h5>Order List Management</h5>
            <div className="row">
                {
                    loading === 'loading' ? <p>Loading...</p> : (
                        <>
                            <div className={`${!order ? "col-md-12 col-lg-12 col-sm-12" : "col-lg-7 col-md-12 col-sm-12"}`}>
                                <table className="table table-striped table-hover table-orders">
                                    <thead>
                                        <tr>
                                            <th className="text-end align-middle">Order Date</th>
                                            <th className="text-end align-middle">Total Products</th>
                                            <th className="text-end align-middle">Subtotal</th>
                                            <th className="text-end align-middle">Shipping</th>
                                            <th className="text-end align-middle">Total Amount</th>
                                            <th className="text-end align-middle">Status</th>
                                            <th className="text-end align-middle">Customer Name</th>
                                            <th className="text-end align-middle">Actions</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {
                                            orderList?.map((orderItem) => (
                                                <tr key={orderItem.orderId} role="button">
                                                    <td className="text-end align-middle py-3">
                                                        {dayjs(Date(orderItem?.orderInfo?.orderDate)).format('MMM DD YYYY')}
                                                    </td>
                                                    <td className="text-end align-middle py-3">
                                                        {orderItem?.orderDetails?.length}
                                                    </td>
                                                    <td className="text-end align-middle py-3">
                                                        ${orderItem?.orderInfo?.subTotal}
                                                    </td>
                                                    <td className="text-end align-middle py-3">
                                                        {`${orderItem?.orderInfo?.shipping ? "$" + orderItem?.orderInfo?.shipping : 'Free'}`}
                                                    </td>
                                                    <td className="text-end align-middle py-3">
                                                        ${orderItem?.orderInfo?.total}
                                                    </td>
                                                    <td className="text-end align-middle py-3">
                                                        <span className={`badge ${orderItem?.orderInfo?.status === 'draft' ? 'bg-secondary' : 'bg-success'}`}>
                                                            {orderItem?.orderInfo?.status}
                                                        </span>
                                                    </td>
                                                    <td className="text-end align-middle py-3">
                                                        {orderItem?.customerInfo?.fullname}
                                                    </td>
                                                    <td className="text-end align-middle py-3 text-primary">
                                                        <MdOutlineReadMore size={20} onClick={() => setOrder(orderItem)} />
                                                    </td>
                                                </tr>
                                            ))
                                        }
                                    </tbody>
                                </table>
                            </div>
                            {order && (
                                <div className="col-lg-5 col-md-12 col-sm-12 border p-2 rounded">
                                    <div className="d-flex align-items-center justify-content-between border-bottom">
                                        <h5>Order details</h5>
                                        <span role="button" className="fw-bolder btn-close" onClick={() => setOrder(null)}></span>
                                    </div>
                                    <div className="mt-3">
                                        <h6 className="py-2">Order Summary</h6>
                                        <div className="d-flex flex-column">
                                            <div className="d-flex align-items-center justify-content-between py-1">
                                                <span>Subtotal</span>
                                                <span className="fw-bolder">${order?.orderInfo?.subTotal}</span>
                                            </div>
                                            <div className="d-flex align-items-center justify-content-between py-1">
                                                <span>Shipping</span>
                                                <span className="fw-bolder">{`${order?.orderInfo?.shipping ? '$' + order?.orderInfo?.shipping : 'Free'}`}</span>
                                            </div>
                                            <div className="d-flex align-items-center justify-content-between py-1">
                                                <span>Total</span>
                                                <span className="fw-bolder">${order?.orderInfo?.total}</span>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="mt-3 border-top">
                                        <h6 className="py-2">Customer Info</h6>
                                        <div className="d-flex flex-column">
                                            <div className="d-flex align-items-center justify-content-between py-1">
                                                <span>Fullname</span>
                                                <span className="fw-bolder">{order?.customerInfo?.fullname}</span>
                                            </div>
                                            <div className="d-flex align-items-center justify-content-between py-1">
                                                <span>Mobile</span>
                                                <span className="fw-bolder">{order?.customerInfo?.mobile}</span>
                                            </div>
                                            <div className="d-flex align-items-center justify-content-between py-1">
                                                <span>Address</span>
                                                <span className="fw-bolder">{order?.customerInfo?.address}</span>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="mt-3 border-top">
                                        <h6 className="py-2">Order details</h6>
                                        <table className="table table-striped">
                                            <tbody>
                                                {
                                                    order?.orderDetails?.map((orderDetailItem) => (
                                                        <tr key={orderDetailItem.orderId}>
                                                            <td>
                                                                <div className="d-flex align-items-center py-2">
                                                                    <img className="product-img-sm me-2" style={{ width: '40px' }} src={orderDetailItem?.img} alt="" />
                                                                    <span>{orderDetailItem?.title}</span>
                                                                </div>
                                                            </td>
                                                            <td className="text-end align-middle">
                                                                {orderDetailItem?.quantity}
                                                            </td>
                                                            <td className="text-end align-middle">
                                                                ${orderDetailItem?.newPrice}
                                                            </td>
                                                            <td className="fw-bolder text-end align-middle">
                                                                ${orderDetailItem?.amount}
                                                            </td>
                                                        </tr>
                                                    ))
                                                }
                                            </tbody>
                                        </table>
                                    </div>
                                </div>
                            )}
                        </>
                    )
                }
            </div>
        </>
    )
}

export default OrderManagement