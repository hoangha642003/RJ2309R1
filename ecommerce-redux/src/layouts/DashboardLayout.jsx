import React from "react";
import MenuLeft from "../components/Menu/MenuLeft";
import NavbarDashboard from "../components/Navbar/NavbarDashboard";

function DashboardLayout({ children }) {
    return (
        <>
            <NavbarDashboard />
            <div className="container d-flex">
                <div style={{ minWidth: "180px" }} className="px-1">
                    <MenuLeft />
                </div>
                <div className='flex-grow-1 px-1'>
                    {children}
                </div>
            </div>
        </>
    )
}

export default DashboardLayout