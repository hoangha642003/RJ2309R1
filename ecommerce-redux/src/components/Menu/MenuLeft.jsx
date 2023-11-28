import React from "react";
import { FaCartArrowDown, FaCartPlus, FaPersonBooth } from "react-icons/fa";
import { Link } from "react-router-dom";

const menuList = [
    {
        name: 'Order List',
        icon: <FaCartArrowDown size={20} />,
        path: '/dashboard/order-list'
    },
    {
        name: 'Customer',
        icon: <FaPersonBooth size={20} />,
        path: '/dashboard/order-list'
    }
]
function MenuLeft() {
    return (
        <div style={{ minWidth: "180px" }} className="border-end vh-100">
            <div className="d-flex align-items-center" style={{ minHeight: "60px" }}>
                <Link to={"/dashboard"} className="logo">
                    <FaCartPlus size={22} className="me-2" /> Shoe Ecommerce
                </Link>
            </div>
            <div className="d-flex flex-column">
                <h5>Menu</h5>
                {
                    menuList.map((menu) => (
                        <Link key={menu.name} to={menu.path} className="text-decoration-none">
                            {menu.name === 'Order List' ? (
                                <div className="menu active">
                                    {menu.icon} {menu.name}
                                </div>) : (
                                <div className="menu">
                                    {menu.icon} {menu.name}
                                </div>)}
                        </Link>
                    ))
                }
            </div>
        </div>
    )
}

export default MenuLeft