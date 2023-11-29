import { FaCartPlus } from "react-icons/fa";
import { RiLogoutBoxRLine } from "react-icons/ri";
import { Link } from "react-router-dom";

function NavbarDashboard() {
    return (
        <div className="container d-flex align-items-center justify-content-between border-bottom py-3">
            <div className="d-flex align-items-center" style={{ minWidth: "180px" }}>
                <Link to={"/dashboard/product-list"} className="logo">
                    <FaCartPlus size={22} className="me-2" /> Shoe Ecommerce
                </Link>
            </div>
            <div className="text-end">
                <Link to={'/dashboard/order-list'}>
                    Khoa Nguyễn <RiLogoutBoxRLine size={20} role="button"/>
                </Link>
            </div>
        </div >
    )
}

export default NavbarDashboard;