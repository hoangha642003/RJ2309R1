import React, { useState } from "react";
import { FaPlus } from "react-icons/fa";
import AddProduct from "./AddProduct";
import ProductTable from "./ProductTable";
import EditProductModel from "./EditProductModel";

function ProductManagement() {
    const [openAddArea, setOpenAddArea] = useState(false)
    const [selectProduct, setselectProduct] = useState({})

    return (
        <>
            <EditProductModel selectProduct={selectProduct}  setselectProduct={setselectProduct} />
            <div className="row">
                <div className="col-md-12 d-flex justify-content-between">
                    <h5>Product List Management</h5>
                    <button className="btn btn-warning btn-sm d-flex align-items-center" onClick={() => setOpenAddArea(true)}>
                        <FaPlus className="me-2" />
                        Add new product
                    </button>
                </div>
                {
                    openAddArea && <AddProduct setOpenAddArea={setOpenAddArea} setselectProduct={setselectProduct} />
                }
            </div>
            <div className="row mt-2">
                <ProductTable setselectProduct={setselectProduct} />
            </div>
        </>
    )
}

export default ProductManagement