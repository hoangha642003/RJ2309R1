import React from "react";
import DashboardLayout from "../layouts/DashboardLayout";
import ProductManagement from "../components/Dashboard/ProductManagement/ProductManagement";

function ProductPage(){
    return (
        <DashboardLayout>
            <ProductManagement/>
        </DashboardLayout>
    )
}

export default ProductPage;