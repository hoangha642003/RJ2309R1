import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { addNewProductThunkAction } from "../../../reducers/productSlice";
import { FaSave, FaTimes, FaUndo } from "react-icons/fa";
import { FaCirclePlus } from "react-icons/fa6";
import { useForm } from "react-hook-form"
import { yupResolver } from "@hookform/resolvers/yup"
import * as yup from "yup"
import { toast } from "react-toastify";
import { categoryList, colorList, companyList } from "../../../services/common";
import { productSelector } from "../../../redux-toolkit/selectors";

const schema = yup.object({
    title: yup.string().required(),
    img: yup.string().required(),
    newPrice: yup.number().positive().integer().required().typeError('price is a required field'),
    company: yup.string().required(),
    color: yup.string().required(),
    category: yup.string().required()
})

function EditProduct({ setOpenAddArea, isEdit, setIsEdit }) {
    const dispatch = useDispatch()
    const product = isEdit
    const { register, handleSubmit, formState: { errors }, reset } = useForm({
        resolver: yupResolver(schema),
        defaultValues: {
            title: product.title,
            img: product.img,
            newPrice: product.newPrice,
            company: product.company,
            color: product.color,
            category: product.category
        }
    })

    const handleUpdateProduct = (data) => {
        console.log({
            ...product,
            ...data
        });
        // let newProduct = {
        //     ...data,
        //     prevPrice: 0,
        //     star: 0,
        //     reviews: 0
        // }
        // console.log(newProduct);
        // dispatch(addNewProductThunkAction(newProduct))
        // reset()
        // toast.success('Product created success')
    }

    const handleCloseAddArea = () => {
        setOpenAddArea(false)
        setIsEdit({})
    }

    return (
        <div className="col-md-12 mt-2">
            <form className="pt-2" onSubmit={handleSubmit(handleUpdateProduct)}>
                <div className="row">
                    <div className="col-md-4">
                        <div className="form-group mb-3">
                            <label className="form-label">Title</label>
                            <input
                                type="text"
                                className={`form-control ${errors?.title?.message ? 'is-invalid' : ''}`}
                                placeholder="Title"
                                {...register('title')}
                            />
                            <span className="invalid-feedback">{errors?.title?.message}</span>
                        </div>
                        <div className="form-group mb-3">
                            <label className="form-label">Price</label>
                            <input
                                type="text"
                                className={`form-control ${errors?.newPrice?.message ? 'is-invalid' : ''}`}
                                placeholder="Price"
                                {...register('newPrice')}
                            />
                            <span className="invalid-feedback">{errors?.newPrice?.message}</span>
                        </div>
                    </div>
                    <div className="col-md-4">
                        <div className="form-group mb-3">
                            <label className="form-label">Category</label>
                            <select
                                className={`form-control ${errors?.category?.message ? 'is-invalid' : ''}`}
                                placeholder="Category"
                                {...register('category')}
                                defaultValue={''}
                            >
                                <option value={''} disabled>please select catetory</option>
                                {
                                    categoryList?.map((cat) => (
                                        <option key={cat.id} value={cat.name}>{cat.name}</option>
                                    ))
                                }
                            </select>
                            <span className="invalid-feedback">{errors?.category?.message}</span>
                        </div>
                        <div className="form-group mb-3">
                            <label className="form-label">Company</label>
                            <select
                                className={`form-control ${errors?.company?.message ? 'is-invalid' : ''}`}
                                placeholder="Company"
                                {...register('company')}
                                defaultValue={''}
                            >
                                <option value={''} disabled>please select company</option>
                                {
                                    companyList?.map((item) => (
                                        <option key={item.id} value={item.name}>{item.name}</option>
                                    ))
                                }
                            </select>
                            <span className="invalid-feedback">{errors?.company?.message}</span>
                        </div>
                    </div>
                    <div className="col-md-4">
                        <div className="form-group mb-3">
                            <label className="form-label">Color</label>
                            <select
                                className={`form-control ${errors?.color?.message ? 'is-invalid' : ''}`}
                                placeholder="Color"
                                {...register('color')}
                                defaultValue={''}
                            >
                                <option value={''} disabled>please select color</option>
                                {
                                    colorList?.map((item, index) => (
                                        <option key={index} value={item.toLocaleLowerCase()}>{item}</option>
                                    ))
                                }
                            </select>
                            <span className="invalid-feedback">{errors?.color?.message}</span>
                        </div>
                        <div className="form-group mb-3">
                            <label className="form-label">Image</label>
                            <input
                                type="text"
                                className={`form-control ${errors?.img?.message ? 'is-invalid' : ''}`}
                                placeholder="Image"
                                {...register('img')}
                            />
                            <span className="invalid-feedback">{errors?.img?.message}</span>
                        </div>
                    </div>
                </div>
                <div className="row">
                    <div className="col-md-4 mb-3">
                        <div className="border-0 d-flex align-items-center justify-content-between">
                            <button type="submit" className="btn btn-success flex-grow-1 d-flex align-items-center justify-content-center me-2">
                                <FaSave className="me-2" size={18} /> <span>Save</span>
                            </button>
                            <button type="button" className="btn btn-dark flex-grow-1 d-flex align-items-center justify-content-center"
                                onClick={handleCloseAddArea}>
                                <FaUndo className="me-2" size={18} /> <span>Cancel</span>
                            </button>
                        </div>
                    </div>
                </div>
            </form>
        </div>
    )
}

export default EditProduct