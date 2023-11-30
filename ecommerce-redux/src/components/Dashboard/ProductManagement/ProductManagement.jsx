import React, { useState } from "react";
import { FaPlus } from "react-icons/fa";
import AddProduct from "./AddProduct";
import ProductTable from "./ProductTable";
import { useSelector } from "react-redux";
import { productSelector } from "../../../redux-toolkit/selectors";
import EditProduct from "./EditProduct";

function ProductManagement() {
    const [openAddArea, setOpenAddArea] = useState(false)
    const [isEdit, setIsEdit] = useState({})

    return (
        <>
            <div className="row">
                <div className="col-md-12 d-flex justify-content-between">
                    <h5>Product List Management</h5>
                    <button className="btn btn-warning btn-sm d-flex align-items-center" onClick={() => setOpenAddArea(true)}>
                        <FaPlus className="me-2" />
                        Add new product
                    </button>
                </div>
                {
                    isEdit?.id ?
                        <EditProduct setOpenAddArea={setOpenAddArea} isEdit={isEdit}  setIsEdit={setIsEdit} /> :
                        openAddArea && <AddProduct setOpenAddArea={setOpenAddArea} setIsEdit={setIsEdit} />
                }
            </div>
            <div className="row mt-2">
                <ProductTable setIsEdit={setIsEdit} setOpenAddArea={setOpenAddArea} />
            </div>
        </>
    )
}

export default ProductManagement