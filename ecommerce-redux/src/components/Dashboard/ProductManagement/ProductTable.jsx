import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { manageProductLoadingSelector, manageProductSelector } from "../../../redux-toolkit/selectors";
import { FaEdit, FaEye, FaStar, FaTrash } from "react-icons/fa";
import { toast } from "react-toastify";
import Swal from "sweetalert2";
import { fetchProductPaginationThunkAction, removeProductThunkAction } from "../../../reducers/manageProductSlice";

function ProductTable({ setselectProduct }) {
    const [currentPage, setCurrentPage] = useState(1)
    const [direction, setDirection] = useState('next')
    const [currentPageSize, setCurrenPageSize] = useState(10)
    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(fetchProductPaginationThunkAction({ _page: currentPage, _limit: currentPageSize }))
    }, [dispatch, currentPage, currentPageSize])

    const { products, pagination } = useSelector(manageProductSelector)
    const loading = useSelector(manageProductLoadingSelector)

    const handleRemoveProduct = (product) => {
        Swal.fire({
            title: 'Confirm remove product',
            text: 'Are you sure to remove this product?',
            showCancelButton: true
        }).then(result => {
            if (result.isConfirmed) {
                dispatch(removeProductThunkAction(product))
                toast.info('Product removed success')
            }
        })
    }

    const handleEditProduct = (product) => {
        setselectProduct(product)
    }
    const handleNextPage = () => {
        if (currentPage < pagination.totalPage) {
            setCurrentPage(currentPage + 1)
            setDirection('next')
        }
    }
    const handlePreviousPage = () => {
        if (currentPage > 1) {
            setCurrentPage(currentPage - 1)
            setDirection('prev')
        }
    }
    const handleChangePageSize = (e) => {
        setCurrenPageSize(Number(e.target.value))
        setCurrentPage(1)
        setDirection('next')
    }
    console.log(currentPage);
    return (
        <>
            {
                loading === 'loading' ? <p>Loading...</p> : (
                    <div className="col-md-12 col-lg-12 col-sm-12">
                        <table className="table table-hover table-orders">
                            <thead>
                                <tr>
                                    <th className="text-center align-middle">Title</th>
                                    <th className="text-start align-middle">Color</th>
                                    <th className="text-start align-middle">Category</th>
                                    <th className="text-start align-middle">Company</th>
                                    <th className="text-end align-middle">Price</th>
                                    <th className="text-center align-middle">Rate</th>
                                    <th className="text-center align-middle">Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {
                                    products?.map((product => (
                                        <tr key={product.id}>
                                            <td className="text-center align-middle" style={{ width: '300px' }}>
                                                <div className="d-flex align-items-center py-2">
                                                    <img src={product.img} alt="" className="me-1" style={{ width: '15%' }} />
                                                    {product.title}
                                                </div>
                                            </td>
                                            <td className="text-start align-middle">
                                                <span className={`badge ${product.color === 'white' ? 'border text-dark' : ''}`} style={{ backgroundColor: product.color }}>{product.color}</span>
                                            </td>
                                            <td className="text-start align-middle">
                                                {product.category}
                                            </td>
                                            <td className="text-start align-middle">
                                                {product.company}
                                            </td>
                                            <td className="text-end align-middle">
                                                <div className="d-flex flex-column">
                                                    {product.prevPrice > 0 && <del>${product.prevPrice}</del>}
                                                    <span>${product.newPrice}</span>
                                                </div>
                                            </td>
                                            <td className="text-center align-middle">
                                                <div className="d-flex flex-column align-items-center justify-content-center">
                                                    <div className="d-flex align-items-center">
                                                        <span className="me-1">{product.star}</span>
                                                        <FaStar color="yellow" />
                                                    </div>
                                                    <div className="d-flex align-items-center">
                                                        <span className="me-1">{product.reviews}</span>
                                                        <FaEye color="green" />
                                                    </div>
                                                </div>
                                            </td>
                                            <td className="text-center align-middle">
                                                <div className="d-flex align-items-center justify-content-center">
                                                    <FaEdit role="button" size={15} className="text-success me-2" onClick={() => handleEditProduct(product)} />
                                                    <FaTrash role="button" size={15} className="text-danger" onClick={() => handleRemoveProduct(product)} />
                                                </div>
                                            </td>
                                        </tr>
                                    )))
                                }
                            </tbody>
                        </table>
                        <div className="d-flex align-items-center justify-content-between">
                            <ul className="pagination my-0">
                                <li className={`page-item ${currentPage <= 1 ? 'disabled' : ''} ${direction === 'prev' ? 'active' : ''}`}>
                                    <button className="page-link"
                                        onClick={handlePreviousPage}
                                    >Previous
                                    </button>
                                </li>
                                <li className={`page-item ${currentPage >= pagination.totalPage ? 'disabled' : ''} ${direction === 'next' ? 'active' : ''}`}>
                                    <button className="page-link"
                                        onClick={handleNextPage}
                                    >Next
                                    </button>
                                </li>
                            </ul>
                            <div className="d-flex align-items-center justify-content-end" style={{ minWidth: "150px" }}>
                                <span className="flex-grow-1">Item per page</span>
                                <select className="form-control" style={{ width: "50px" }} defaultValue={currentPageSize}
                                    onChange={handleChangePageSize}
                                >
                                    <option value="10">10</option>
                                    <option value="30">30</option>
                                    <option value="50">50</option>
                                    <option value="100">100</option>
                                </select>
                            </div>
                        </div>
                    </div>
                )
            }
        </>

    )
}

export default ProductTable