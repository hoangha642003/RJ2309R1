import React, { useEffect, useState } from "react";
import { FaSave, FaUndo } from "react-icons/fa";
import { useForm } from "react-hook-form"
import { yupResolver } from "@hookform/resolvers/yup"
import * as yup from "yup"
import { CATEGORY_API_URL, COLOR_API_URL, COMPANY_API_URL } from "../../../services/common";
import useFetchResource from "../../../custom-hooks/useFetchResource";
import { useDispatch } from "react-redux";
import { toast } from "react-toastify";
import { editProductThunkAction } from "../../../reducers/manageProductSlice";

const schema = yup.object({
    title: yup.string().required(),
    newPrice: yup.number().positive().required().typeError('price is a required field'),
    category: yup.string().required(),
    color: yup.string().required(),
    company: yup.string().required(),
    img: yup.string().required(),
})

function EditProductModel({ selectProduct, setselectProduct }) {
    const dispatch = useDispatch()
    const [product, setProduct] = useState({})
    const [loading, setLoading] = useState(false)
    useEffect(() => {
        setLoading(true)
        async function getProductById() {
            let productListRes = await fetch(`https://jsonserver-vercel-api.vercel.app/products/${selectProduct?.id}`)
            let data = await productListRes.json()
            setProduct(data)
            setLoading(false)
            setValue('title', data.title)
            setValue('newPrice', data.newPrice)
            setValue('category', data.category)
            setValue('color', data.color)
            setValue('company', data.company)
            setValue('img', data.img)
        }
        getProductById()
    }, [selectProduct?.id])

    const companyList = useFetchResource(COMPANY_API_URL)
    const categoryList = useFetchResource(CATEGORY_API_URL)
    const colorList = useFetchResource(COLOR_API_URL)

    const { register, handleSubmit, reset, formState: { errors }, setValue } = useForm({
        resolver: yupResolver(schema)
    })

    const handleEditProduct = (data) => {
        let newProduct = {
            ...product,
            ...data,
            prevPrice: Number(product.newPrice) !== Number(data.newPrice) ? Number(product.newPrice) : Number(product.prevPrice)
        }

        console.log(newProduct);
        dispatch(editProductThunkAction(newProduct))
        reset()
        toast.success('Product update succeed!')
        setselectProduct({})
    }

    const handleCloseEditProductModel = () => {
        setselectProduct({})
        reset()
    }

    return (
        <>
            {
                selectProduct?.id && (
                    <div
                        className={`modal fade show`}
                        style={{ display: selectProduct?.id ? 'block' : 'none' }}
                    >
                        <div className="modal-dialog modal-lg">
                            <div className="modal-content">
                                <form onSubmit={handleSubmit(handleEditProduct)}>
                                    <div className="modal-header">
                                        <h5 className="modal-title">Edit Product</h5>
                                        <button type="button" className="btn-close" onClick={() => setselectProduct({})} />
                                    </div>
                                    <div className="modal-body row">
                                        {
                                            loading ? <p>Loading....</p> : (
                                                <>
                                                    <div className="col-md-4">
                                                        <div className="form-group mb-2">
                                                            <label className="form-label">Title</label>
                                                            <input
                                                                type="text"
                                                                className={`form-control form-control-sm ${errors?.title?.message ? 'is-invalid' : ''}`}
                                                                placeholder="Title"
                                                                {...register('title')}
                                                            />
                                                            <span className="invalid-feedback">{errors?.title?.message}</span>
                                                        </div>
                                                        <div className="form-group mb-2">
                                                            <label className="form-label">Price</label>
                                                            <input
                                                                type="text"
                                                                className={`form-control form-control-sm ${errors?.newPrice?.message ? 'is-invalid' : ''}`}
                                                                placeholder="Price"
                                                                {...register('newPrice')}
                                                            />
                                                            <span className="invalid-feedback">{errors?.newPrice?.message}</span>
                                                        </div>
                                                        <div className="form-group mb-2">
                                                            <label className="form-label">Color</label>
                                                            <select
                                                                className={`form-select form-select-sm ${errors?.color?.message ? 'is-invalid' : ''}`}
                                                                defaultValue={''}
                                                                {...register('color')}
                                                            >
                                                                <option value={''} disabled>Please select color</option>
                                                                {
                                                                    colorList?.map((color) => (
                                                                        <option key={color.id} value={color.name}>{color.name}</option>
                                                                    ))
                                                                }
                                                            </select>
                                                            <span className="invalid-feedback">{errors?.color?.message}</span>
                                                        </div>
                                                    </div>
                                                    <div className="col-md-4">
                                                        <div className="form-group mb-2">
                                                            <label className="form-label">Category</label>
                                                            <select
                                                                className={`form-select form-select-sm ${errors?.category?.message ? 'is-invalid' : ''}`}
                                                                defaultValue={''}
                                                                {...register('category')}
                                                            >
                                                                <option value={''} disabled>Please select category</option>
                                                                {
                                                                    categoryList?.map((cat) => (
                                                                        <option key={cat.id} value={cat.name}>{cat.name}</option>
                                                                    ))
                                                                }
                                                            </select>
                                                            <span className="invalid-feedback">{errors?.category?.message}</span>
                                                        </div>
                                                        <div className="form-group mb-2">
                                                            <label className="form-label">Company</label>
                                                            <select
                                                                className={`form-select form-select-sm ${errors?.company?.message ? 'is-invalid' : ''}`}
                                                                defaultValue={''}
                                                                {...register('company')}
                                                            >
                                                                <option value={''} disabled>Please select company</option>
                                                                {
                                                                    companyList?.map((company) => (
                                                                        <option key={company.id} value={company.name}>{company.name}</option>
                                                                    ))
                                                                }
                                                            </select>
                                                            <span className="invalid-feedback">{errors?.company?.message}</span>
                                                        </div>
                                                        <div className="form-group mb-2">
                                                            <label className="form-label">Image</label>
                                                            <input
                                                                type="text"
                                                                className={`form-control form-control-sm ${errors?.img?.message ? 'is-invalid' : ''}`}
                                                                placeholder="Image"
                                                                {...register('img')}
                                                            />
                                                            <span className="invalid-feedback">{errors?.img?.message}</span>
                                                        </div>
                                                    </div>
                                                    <div className="col-md-4">
                                                        <div className="form-group mb-2 border-dashed h-100 v-100">
                                                            <img style={{ maxHeight: '100%', maxWidth: '100%' }} src={product?.img} alt="" />
                                                        </div>
                                                    </div>
                                                </>
                                            )
                                        }

                                    </div>
                                    <div className="modal-footer">
                                        <button type="button" className="btn btn-dark" onClick={handleCloseEditProductModel} >
                                            <FaUndo /> Cancel
                                        </button>
                                        <button type="submit" className="btn btn-success">
                                            <FaSave /> Save
                                        </button>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div >
                )
            }
        </>
    )
}

export default EditProductModel