import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { FaTimes, FaUpload } from "react-icons/fa";
import { FaCirclePlus } from "react-icons/fa6";
import { useForm } from "react-hook-form"
import { yupResolver } from "@hookform/resolvers/yup"
import * as yup from "yup"
import { toast } from "react-toastify";
import useFetchResource from "../../../custom-hooks/useFetchResource";
import { CATEGORY_API_URL, COLOR_API_URL, COMPANY_API_URL } from "../../../services/common";
import { addNewProductThunkAction } from "../../../reducers/manageProductSlice";
import axios from "axios";
import Swal from "sweetalert2";

const schema = yup.object({
    title: yup.string().required(),
    // img: yup.string().required().typeError('photo is a required'),
    newPrice: yup.number().positive().integer().required().typeError('price is a required field'),
    company: yup.string().required(),
    color: yup.string().required(),
    category: yup.string().required()
})

function AddProduct({ setOpenAddArea, setselectProduct }) {
    const categoryList = useFetchResource(CATEGORY_API_URL)
    const colorList = useFetchResource(COLOR_API_URL)
    const companyList = useFetchResource(COMPANY_API_URL)
    const [temporaryPhoto, setTemporaryPhoto] = useState(null)
    const [selectedFile, setSelectedFile] = useState()
    const [uploading, setUploading] = useState(false)

    const dispatch = useDispatch()
    const { register, handleSubmit, formState: { errors }, reset, setValue } = useForm({
        resolver: yupResolver(schema),
    })

    const handleAddNewProduct = (data) => {
        if (!data?.img) {
            Swal.fire({
                title: 'Alret',
                text: 'You need upload photo first'
            })
            return;
        }
        let newProduct = {
            ...data,
            prevPrice: 0,
            star: 0,
            reviews: 0
        }
        console.log(newProduct);
        dispatch(addNewProductThunkAction(newProduct))
        reset()
        setSelectedFile(null)
        setTemporaryPhoto(null)
        toast.success('Product created success')
    }

    const handleCloseAddArea = () => {
        reset()
        setTemporaryPhoto(null)
        setOpenAddArea(false)
        setselectProduct({})
        setSelectedFile(null)
    }

    const handleSelectPhoto = (e) => {
        if (e.target.files[0]?.name) {
            const fakePhotoUrl = URL.createObjectURL(e.target.files[0])
            setTemporaryPhoto(fakePhotoUrl)
            setSelectedFile(e.target.files[0])
        }
    }

    const handleUploadPhoto = async (e) => {
        e.stopPropagation()
        setUploading(true)
        const formData = new FormData()
        formData.append('file', selectedFile)
        formData.append("upload_preset", "lhih0wco")
        let uploadRes = await axios.post('https://api.cloudinary.com/v1_1/dikortveg/image/upload', formData)
        setTemporaryPhoto(uploadRes?.data?.secure_url)
        setValue('img', uploadRes?.data?.secure_url)
        toast.info('File uploaded success');
        setUploading(false)
    }

    return (
        <div className="col-md-12 mt-2">
            <form className="pt-2" onSubmit={handleSubmit(handleAddNewProduct)}>
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
                        <div className="form-group mb-3">
                            <label className="form-label"></label>
                            <div className="d-flex align-items-center justify-content-between">
                                <button type="submit" className="btn btn-success btn-sm flex-grow-1 d-flex align-items-center justify-content-center me-2">
                                    <FaCirclePlus className="me-2" size={18} /> <span>Add</span>
                                </button>
                                <button type="button" className="btn btn-dark btn-sm flex-grow-1 d-flex align-items-center justify-content-center"
                                    onClick={handleCloseAddArea}>
                                    <FaTimes className="me-2" size={18} /> <span>Close</span>
                                </button>
                            </div>
                        </div>
                    </div>
                    <div className="col-md-4">
                        <div className="form-group mb-3">
                            <label className="form-label">Category</label>
                            <select
                                className={`form-select form-select-sm ${errors?.category?.message ? 'is-invalid' : ''}`}
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
                                className={`form-select form-select-sm ${errors?.company?.message ? 'is-invalid' : ''}`}
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
                        <div className="form-group mb-3">
                            <label className="form-label">Color</label>
                            <select
                                className={`form-select form-select-sm ${errors?.color?.message ? 'is-invalid' : ''}`}
                                placeholder="Color"
                                {...register('color')}
                                defaultValue={''}
                            >
                                <option value={''} disabled>please select color</option>
                                {
                                    colorList?.map((item) => (
                                        <option key={item.id} value={item.name}>{item.name}</option>
                                    ))
                                }
                            </select>
                            <span className="invalid-feedback">{errors?.color?.message}</span>
                        </div>
                    </div>
                    <div className="col-md-4">
                        <div className="form-group d-flex flex-column align-items-center justify-content-between border-dashed w-100 h-100">
                            <div className="h-100 text-secondary" role="button"
                                onClick={() => document.getElementById('file-photo').click()}
                            >
                                {
                                    temporaryPhoto ? (
                                        <div className="d-flex flex-column align-items-center justify-content-between h-100 p-1">
                                            <img style={{ maxHeight: '180px', maxWidth: '80%' }} src={temporaryPhoto} alt="" />
                                            {
                                                uploading ? (
                                                    <>
                                                        <button type="button" className="btn btn-sm btn-secondary d-flex align-items-center" disabled>
                                                            <FaUpload className="me-2" />
                                                            Uploading...
                                                        </button>
                                                    </>
                                                ) : (
                                                    <>
                                                        <button type="button" className="btn btn-sm btn-secondary d-flex align-items-center"
                                                            onClick={handleUploadPhoto}
                                                        >
                                                            <FaUpload className="me-2" />
                                                            Upload
                                                        </button>
                                                    </>
                                                )
                                            }


                                        </div>
                                    ) : (
                                        <div className="d-flex flex-column align-items-center justify-content-center h-100 text-secondary p-1">
                                            <FaUpload size={40} className="mb-2" />
                                            <span className="text-decoration-underline">Browse a photo</span>

                                        </div>
                                    )
                                }
                                <input id="file-photo"
                                    type="file" accept="image/*"
                                    className={`d-none`}
                                    onChange={handleSelectPhoto}
                                />
                                {/* <span className="invalid-feedback">{errors?.img?.message}</span> */}
                            </div>
                        </div>
                    </div>
                </div>
                <div className="row">

                </div>
            </form>
        </div>
    )
}

export default AddProduct