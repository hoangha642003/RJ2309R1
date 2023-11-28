import React, { useState } from "react";

function OrderList() {
    const [openDetail, setOpenDetail] = useState()
    return (
        <div className="container">
            <div></div>
            <div className="row">
                <div className={`${openDetail ? "col-md-12" : "col-md-7"} bg-success vh-100`}>
                    List
                </div>
                {!openDetail && (
                    <div className="col-md-5 bg-primary vh-100">
                        Detail
                    </div>
                )}

            </div>
        </div>
    )
}

export default OrderList