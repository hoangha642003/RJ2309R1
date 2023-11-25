import React from "react";
import { FaCartPlus, FaSearch, FaShoppingCart, FaUser } from 'react-icons/fa'
import { useDispatch, useSelector } from "react-redux";
import filtersSlice from "../../reducers/filtersSlice";
import { cartSelector, searchTextSelector } from "../../redux-toolkit/selectors";
import { Link } from "react-router-dom";

function Navbar() {
    const searchText = useSelector(searchTextSelector)
    const cart = useSelector(cartSelector)
    const dispatch = useDispatch()
    return (
        <div className="container d-flex align-items-center border-bottom py-3">
            <div className="d-flex align-items-center" style={{ minWidth: "180px" }}>
                <Link to={"/"} className="logo">
                    <FaCartPlus size={22} className="me-2" /> Shoe Ecommerce
                </Link>
            </div>
            <div className="d-flex flex-grow-1 justify-content-between">
                <form className="w-50 d-flex align-items-center">
                    <input
                        type="search"
                        placeholder="Enter your search shoes"
                        className="form-control form-control-sm"
                        style={{ paddingRight: '25px' }}
                        value={searchText}
                        onInput={(e) => dispatch(filtersSlice.actions.setSearchText(e.target.value))}
                    />
                    <FaSearch size={15} style={{ marginLeft: '-25px', color: 'rgba(0,0,0,.2)' }} />
                </form>
                <div className="">
                    {
                        cart?.cartDetails.length ? (
                            <Link to={'/cart'} className="position-relative me-3">
                                <FaShoppingCart size={20} className="me-2" role="button" />
                                <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger">
                                    {cart?.cartDetails.length}
                                </span>
                            </Link>
                        ) : (
                            <FaShoppingCart size={20} className="me-2" />
                        )
                    }

                    <FaUser size={20} role="button" />
                </div>
            </div>

        </div>
    )
}

export default Navbar;