import React from "react";
import DashboardLayout from "../layouts/DashboardLayout";
import OrderManagement from "../components/Dashboard/OrderManagement";

function OrderListPage() {
    return (
        <DashboardLayout>
            <OrderManagement/>
        </DashboardLayout>
    )
}

export default OrderListPage;