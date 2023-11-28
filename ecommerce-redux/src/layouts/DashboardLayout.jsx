import React from "react";
import MenuLeft from "../components/Menu/MenuLeft";

function DashboardLayout({ children }) {
    return (
        <div className='container d-flex'>
            <div style={{ minWidth: "180px" }}>
                <MenuLeft />
            </div>
            <div className='flex-grow-1'>
                {children}
            </div>
        </div>
    )
}

export default DashboardLayout