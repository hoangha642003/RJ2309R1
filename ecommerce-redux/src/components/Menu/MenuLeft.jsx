import React from "react";
import { FaCartArrowDown } from "react-icons/fa";
import { FaSitemap } from "react-icons/fa6";
import { NavLink } from "react-router-dom";

const menuList = [
    {
        name: 'Order List',
        icon: <FaCartArrowDown size={18} />,
        path: '/dashboard/order-list'
    },
    {
        name: 'Products',
        icon: <FaSitemap size={18} />,
        path: '/dashboard/product-list'
    }
]
function MenuLeft() {
    return (
        <div style={{ minWidth: "180px" }} className="border-end vh-100">
            <div className="d-flex flex-column">
                <h5>Menu</h5>
                {
                    menuList.map((menu) => (
                        <NavLink key={menu.name} to={menu.path} className="text-decoration-none">
                            <div className="menu d-flex align-items-center">
                                <span className="me-2">{menu.icon}</span> 
                                <span>{menu.name}</span>
                            </div>
                        </NavLink>
                    ))
                }
            </div>
        </div>
    )
}

export default MenuLeft