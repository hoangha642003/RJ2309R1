import React, { useContext } from "react";
import { FaCartArrowDown, FaStar } from "react-icons/fa";
import { ShoeContext } from "../../context/ShoeContext";
import { addToCart } from "../../reducer/actions";

function Product({ product }) {
    const { dispatch } = useContext(ShoeContext)
    const { title, star, reviews, prevPrice, newPrice } = product
    return (
        <div className="col-md-3 mb-4">
            <div className="card d-flex align-items-center pt-2">
                <img src={product.img}
                    className="card-image-top" alt=""
                    style={{ width: "70%" }}
                />
                <div className="card-body">
                    <p className="fw-bolder">{title}</p>
                    <div className="d-flex align-items-center mb-2">
                        <div className="me-1">
                            {
                                (new Array(star).fill(1)).map((item, index) => (
                                    <FaStar key={index} color="yellow" />
                                ))
                            }
                        </div>
                        <div className="fs-10">
                            ({reviews} reviews)
                        </div>
                    </div>
                    <div className="d-flex align-items-center justify-content-between">
                        <div>
                            <del className="line-through me-2">${prevPrice}</del>
                            <span>${newPrice}</span>
                        </div>
                        <FaCartArrowDown size={20} className="btn-cart"
                            onClick={() => dispatch(addToCart(product))}
                        />
                    </div>
                </div>
            </div>
        </div>

    )
}

export default Product;