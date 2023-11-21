import React from "react";
import Navbar from "../components/Navbar/Navbar";

function CartPage() {
    return (
        <div className='container d-flex flex-column'>
            <Navbar />
            <div className="d-flex mt-2">
                <div className='flex-grow-1'>
                    Cart Info
                </div>
                <div className="bg-danger" style={{ width: "300px" }}>
                    Payment Info
                </div>
            </div>

        </div>
    )
}

export default CartPage;