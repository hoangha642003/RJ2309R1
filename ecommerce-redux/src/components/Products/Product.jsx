import React from "react";
import { FaCartArrowDown, FaStar } from "react-icons/fa";
import { useDispatch } from "react-redux";
import cartSlice from "../../reducers/cartSlice";
import { toast } from 'react-toastify';

function Product({ product }) {
    const { img, title, star, reviews, prevPrice, newPrice } = product
    const dispatch = useDispatch()

    const handleAddToCart = (product) => {
        dispatch(cartSlice.actions.addToCart(product))
        toast.success(`${product.title} added to cart`, { autoClose: 1000 })
    }
    return (
        <div className="col-md-3 mb-4">
            <div className="card d-flex align-items-center pt-2">
                <div className="d-flex align-items-center justify-content-center" style={{minHeight: '210px'}}>
                    <img src={img}
                        alt=""
                        style={{ width: "70%" }}
                    />
                </div>
                <div className="card-body px-0 d-flex flex-column align-items-center">
                    <p className="fw-bolder text-center">{title}</p>
                    <div className="d-flex align-items-center mb-2">
                        <div className="me-1">
                            {
                                star > 0 ? 
                                (new Array(star).fill(1)).map((item, index) => (
                                    <FaStar key={index} color="yellow" />
                                )) : 
                                (new Array(5).fill(1)).map((item, index) => (
                                    <FaStar key={index} color="gray" />
                                ))
                            }
                        </div>
                        <div className="fs-10">
                            ({reviews} reviewer)
                        </div>
                    </div>
                    <div className="d-flex align-items-center justify-content-evenly w-75">
                        <div>
                            {prevPrice > 0 && <del className="line-through me-2">${prevPrice}</del>}
                            <span>${newPrice}</span>
                        </div>
                        <FaCartArrowDown size={20} className="btn-cart" 
                            onClick={() => handleAddToCart(product)}
                        />
                    </div>
                </div>
            </div>
        </div>

    )
}

export default Product;