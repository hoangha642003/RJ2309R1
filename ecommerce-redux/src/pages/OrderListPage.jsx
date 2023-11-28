import React from "react";
import DashboardLayout from "../layouts/DashboardLayout";
import OrderList from "../components/Dashboard/OrderList";

function OrderListPage() {
    return (
        <DashboardLayout>
            <div>Order List Page </div>
            <OrderList/>
        </DashboardLayout>
    )
}

export default OrderListPage;