"use client";
import { useState } from 'react';
import { ProductType } from '@/constant/productType';
import { ProductStatus } from '@/constant/productStatus';
import { BsTrash } from 'react-icons/bs';
import Link from 'next/link';
import axios from 'axios';
import { toast } from 'react-toastify';

const CreateProduct = () => {
    const [formData, setFormData] = useState({
        sellerId: '684ad65ab13862efe8a5cd05',
        title: '',
        description: '',
        brand: '684ae531b5a6aabc7193238b',
        thumbnail: null,
        images: [],
        variants: [{
            type: ProductType.UNOFFICIAL,
            price: '',
            discountPrice: '',
            colour: '',
            storage: '',
            stock: '',
            region: '',
            status: ProductStatus.AVAILABLE
        }],
        others: [{
            key: '',
            value: ''
        }],
        errors: []
    });

    const handleChange = (event) => {
        const { name, value } = event.target;
        const parts = name.split('.');
        if (parts.length === 3) {
            const [field, indexStr, subField] = parts;
            const index = parseInt(indexStr, 10);
            setFormData(prev => {
                const list = [...prev[field]];
                list[index] = { ...list[index], [subField]: value };
                return {
                    ...prev,
                    [field]: list,
                    errors: {
                        ...prev.errors,
                        [name]: null,
                    }
                };
            });
        }
        else {
            setFormData(prev => ({
                ...prev,
                [name]: value,
                errors: {
                    ...prev.errors,
                    [name]: null,
                },
            }));
        }
    };

    const addItem = (field) => {
        const list = [...formData[field]];
        if (field === 'variants') {
            list.push({
                type: ProductType.UNOFFICIAL,
                price: '',
                discountPrice: '',
                colour: '',
                storage: '',
                stock: '',
                region: '',
                status: ProductStatus.AVAILABLE
            });
        } else {
            list.push({ key: '', value: '' });
        }
        setFormData({ ...formData, [field]: list });
    };

    const removeItem = (field, index) => {
        if (formData[field].length <= 1) {
            toast.error("cannot remove last item");
            return
        }
        const list = formData[field].filter((_, i) => i !== index);
        setFormData({ ...formData, [field]: list });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const { errors, ...payload } = formData
            const response = await axios.post('/api/product', payload);
            console.log(response.data);
        } catch (error) {
            console.log(error);
            if (error.response && error.response.data) {
                setFormData({
                    ...formData,
                    errors: error.response.data.errors,
                });
            }
        }
    };

    return (
        <div className="container my-5">
            <div className="card p-4">
                <pre>{JSON.stringify(formData, null, 2)}</pre>
                <div className="d-flex flex-column flex-md-row justify-content-between align-items-start align-items-md-center">
                    <h3 className="mb-4 text-dark text-uppercase fw-bold">🛒 Create Product</h3>
                    <Link
                        href="/seller/product"
                        type="button"
                        style={{ width: "200px" }}
                        className="btn btn-primary mb-4 fw-bold text-uppercase">product list</Link>
                </div>
                <form onSubmit={handleSubmit} className="row">
                    <div className="col-12 bg-primary bg-opacity-10 p-4 rounded">
                        <h4 className="text-primary mb-4 text-uppercase fw-bold">🧾 General Information</h4>
                        <div className='border rounded px-3 py-4 mb-3 bg-light shadow-sm'>
                            <div className="row g-3">
                                <div className="col-md-4">
                                    <label className="form-label fw-bold text-uppercase">
                                        Title&nbsp;<span className="text-danger">*</span>
                                    </label>
                                    <input
                                        type="text"
                                        name="title"
                                        value={formData.title}
                                        onChange={handleChange}
                                        className={`form-control ${formData.errors.title ? 'is-invalid' : ''}`} />
                                    <div className="invalid-feedback">{formData.errors.title}</div>
                                </div>
                                <div className="col-md-4">
                                    <label className="form-label fw-bold text-uppercase">
                                        Brand&nbsp;<span className="text-danger">*</span>
                                    </label>
                                    <input
                                        type="text"
                                        name="brand"
                                        value={formData.brand}
                                        onChange={handleChange}
                                        className={`form-control ${formData.errors.brand ? 'is-invalid' : ''}`} />
                                    <div className="invalid-feedback">{formData.errors.brand}</div>
                                </div>
                                <div className="col-md-4">
                                    <label className="form-label fw-bold text-uppercase">
                                        Thumbnail&nbsp;<span className="text-danger">*</span>
                                    </label>
                                    <input
                                        type="url"
                                        name="thumbnail"
                                        onChange={handleChange}
                                        className={`form-control ${formData.errors.thumbnail ? 'is-invalid' : ''}`} />
                                    <div className="invalid-feedback">{formData.errors.thumbnail}</div>
                                </div>
                                <div className="col-md-6">
                                    <label className="form-label fw-bold text-uppercase">
                                        Description&nbsp;<span className="text-danger">*</span>
                                    </label>
                                    <textarea
                                        rows={8}
                                        name="description"
                                        value={formData.description}
                                        onChange={handleChange}
                                        style={{ minHeight: "220px" }}
                                        className={`form-control ${formData.errors.description ? 'is-invalid' : ''}`} />
                                    <div className="invalid-feedback">{formData.errors.description}</div>
                                </div>
                                <div className="col-md-6">
                                    <label className="form-label fw-bold text-uppercase">
                                        Featured Images&nbsp;<span className="text-danger">*</span>
                                    </label>
                                    {[...Array(5)].map((_, index) => (
                                        <input
                                            key={index}
                                            type="url"
                                            name="images"
                                            placeholder={`Featured image ${index + 1}`}
                                            value={formData.images?.[index] || ""}
                                            onChange={(e) => {
                                                const newImages = [...(formData.images || [])];
                                                newImages[index] = e.target.value;
                                                setFormData((prev) => ({
                                                    ...prev,
                                                    images: newImages,
                                                    errors: {
                                                        ...prev.errors,
                                                        images: null,
                                                    },
                                                }));
                                            }}
                                            className={`form-control mb-2 ${formData.errors?.images?.[index] ? "is-invalid" : ""
                                                }`}
                                        />
                                    ))}
                                    <div className="invalid-feedback">{formData.errors.images}</div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="col-12 mt-4 bg-info bg-opacity-10 p-4 rounded">
                        <div className="d-flex flex-column flex-md-row justify-content-between align-items-start align-items-md-center">
                            <h4 className="text-info mb-4 text-uppercase fw-bold">📦 Product Variants</h4>
                            <button
                                type="button"
                                style={{ width: "200px" }}
                                className="btn btn-info mb-4 fw-bold text-white text-uppercase"
                                onClick={() => addItem('variants')}>Add Variant</button>
                        </div>
                        {formData.variants.map((_, idx) => (
                            <div key={idx} className="border rounded px-3 py-4 mb-3 bg-light shadow-sm">
                                <div className="row g-3">
                                    <div className="col-12 d-flex justify-content-between align-items-center mb-3">
                                        <h5 className="fw-bold text-uppercase text-dark">Variant {idx + 1}</h5>
                                        <button
                                            type="button"
                                            className="btn btn-danger fw-bold text-uppercase"
                                            onClick={() => removeItem('variants', idx)}
                                            aria-label="Remove Variant">
                                            <BsTrash size={20} />
                                        </button>
                                    </div>
                                    <div className="col-md-3">
                                        <label className="form-label fw-bold text-uppercase">
                                            Type&nbsp;<span className="text-danger">*</span>
                                        </label>
                                        <select
                                            name={`variants.${idx}.type`}
                                            value={formData.variants[idx].type}
                                            onChange={handleChange}
                                            className={`form-select ${formData.errors[`variants.${idx}.type`] ? 'is-invalid' : ''}`}>
                                            {Object.values(ProductType).map((pt) => (
                                                <option key={pt} value={pt}>{pt}</option>
                                            ))}
                                        </select>
                                        <div className="invalid-feedback">{formData.errors[`variants.${idx}.type`]}</div>
                                    </div>
                                    <div className="col-md-3">
                                        <label className="form-label fw-bold text-uppercase">
                                            Price&nbsp;<span className="text-danger">*</span>
                                        </label>
                                        <input
                                            type="number"
                                            name={`variants.${idx}.price`}
                                            value={formData.variants[idx].price}
                                            onChange={handleChange}
                                            className={`form-control ${formData.errors[`variants.${idx}.price`] ? 'is-invalid' : ''}`} />
                                        <div className="invalid-feedback">{formData.errors[`variants.${idx}.price`]}</div>
                                    </div>
                                    <div className="col-md-3">
                                        <label className="form-label fw-bold text-uppercase">
                                            Discount Price
                                        </label>
                                        <input
                                            type="number"
                                            name={`variants.${idx}.discountPrice`}
                                            value={formData.variants[idx].discountPrice}
                                            onChange={handleChange}
                                            className={`form-control ${formData.errors[`variants.${idx}.discountPrice`] ? 'is-invalid' : ''}`} />
                                        <div className="invalid-feedback">{formData.errors[`variants.${idx}.discountPrice`]}</div>
                                    </div>
                                    <div className="col-md-3">
                                        <label className="form-label fw-bold text-uppercase">
                                            Stock&nbsp;<span className="text-danger">*</span>
                                        </label>
                                        <input
                                            type="number"
                                            name={`variants.${idx}.stock`}
                                            value={formData.variants[idx].stock}
                                            onChange={handleChange}
                                            className={`form-control ${formData.errors[`variants.${idx}.stock`] ? 'is-invalid' : ''}`} />
                                        <div className="invalid-feedback">{formData.errors[`variants.${idx}.stock`]}</div>
                                    </div>
                                    <div className="col-md-3">
                                        <label className="form-label fw-bold text-uppercase">
                                            Colour&nbsp;<span className="text-danger">*</span>
                                        </label>
                                        <input
                                            type="text"
                                            name={`variants.${idx}.colour`}
                                            value={formData.variants[idx].colour}
                                            onChange={handleChange}
                                            className={`form-control ${formData.errors[`variants.${idx}.colour`] ? 'is-invalid' : ''}`} />
                                        <div className="invalid-feedback">{formData.errors[`variants.${idx}.colour`]}</div>
                                    </div>
                                    <div className="col-md-3">
                                        <label className="form-label fw-bold text-uppercase">
                                            Region&nbsp;<span className="text-danger">*</span>
                                        </label>
                                        <input
                                            type="text"
                                            name={`variants.${idx}.region`}
                                            value={formData.variants[idx].region}
                                            onChange={handleChange}
                                            className={`form-control ${formData.errors[`variants.${idx}.region`] ? 'is-invalid' : ''}`} />
                                        <div className="invalid-feedback">{formData.errors[`variants.${idx}.region`]}</div>
                                    </div>
                                    <div className="col-md-3">
                                        <label className="form-label fw-bold text-uppercase">
                                            Storage&nbsp;<span className="text-danger">*</span>
                                        </label>
                                        <input
                                            type="text"
                                            name={`variants.${idx}.storage`}
                                            value={formData.variants[idx].storage}
                                            onChange={handleChange}
                                            className={`form-control ${formData.errors[`variants.${idx}.storage`] ? 'is-invalid' : ''}`} />
                                        <div className="invalid-feedback">{formData.errors[`variants.${idx}.storage`]}</div>
                                    </div>
                                    <div className="col-md-3">
                                        <label className="form-label fw-bold text-uppercase">
                                            Status&nbsp;<span className="text-danger">*</span>
                                        </label>
                                        <select
                                            name={`variants.${idx}.status`}
                                            value={formData.variants[idx].status}
                                            onChange={handleChange}
                                            className={`form-select ${formData.errors[`variants.${idx}.status`] ? 'is-invalid' : ''}`}>
                                            {Object.values(ProductStatus).map((ps) => (
                                                <option key={ps} value={ps}>{ps} </option>
                                            ))}
                                        </select>
                                        <div className="invalid-feedback">{formData.errors[`variants.${idx}.status`]}</div>
                                    </div>
                                </div>
                            </div>
                        ))}
                        <div className='d-flex justify-content-end'>
                            <button
                                type="button"
                                style={{ width: "200px" }}
                                className="btn btn-info mt-3 fw-bold text-white text-uppercase"
                                onClick={() => addItem('variants')}>Add Variant</button>
                        </div>
                    </div>

                    <div className="col-12 mt-4 bg-success bg-opacity-10 p-4 rounded">
                        <div className="d-flex flex-column flex-md-row justify-content-between align-items-start align-items-md-center">
                            <h4 className="text-success mb-4 text-uppercase fw-bold">⚙️ Other Specifications</h4>
                            <button
                                type="button"
                                style={{ width: "200px" }}
                                className="btn btn-success mb-4 fw-bold text-uppercase"
                                onClick={() => addItem('others')}>Add Specification</button>
                        </div>
                        <div className="border rounded px-3 py-4 mb-3 bg-light shadow-sm">
                            <div>
                                {formData.others.map((_, idx) => (
                                    <div key={idx} className="border rounded px-3 py-4 mb-3 bg-light shadow-sm">
                                        <div className='row g-3'>
                                            <div className="col-md-5">
                                                <label className="form-label fw-bold text-uppercase">
                                                    Key <span className="text-danger">*</span>
                                                </label>
                                                <input
                                                    type="text"
                                                    name={`others.${idx}.key`}
                                                    value={formData.others[idx].key}
                                                    onChange={handleChange}
                                                    className={`form-control ${formData.errors[`others.${idx}.key`] ? 'is-invalid' : ''}`}
                                                />
                                                <div className="invalid-feedback">{formData.errors[`others.${idx}.key`]}</div>
                                            </div>

                                            <div className="col-md-6">
                                                <label className="form-label fw-bold text-uppercase">
                                                    Value <span className="text-danger">*</span>
                                                </label>
                                                <input
                                                    type="text"
                                                    name={`others.${idx}.value`}
                                                    value={formData.others[idx].value}
                                                    onChange={handleChange}
                                                    className={`form-control ${formData.errors[`others.${idx}.value`] ? 'is-invalid' : ''}`}
                                                />
                                                <div className="invalid-feedback">{formData.errors[`others.${idx}.value`]}</div>
                                            </div>

                                            <div className="col-md-1 d-flex align-items-end justify-content-end mt-4 mt-md-0">
                                                <button
                                                    type="button"
                                                    className="btn btn-danger"
                                                    onClick={() => removeItem('others', idx)}
                                                    aria-label={`Remove specification ${idx + 1}`}>
                                                    <BsTrash size={20} />
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                    <div className="col-12 mt-4 bg-secondary bg-opacity-10 p-4 rounded">
                        <button type="submit" className="btn btn-lg btn-primary w-100 fw-bold text-uppercase">🚀 Create Product</button>
                    </div>
                </form>
            </div >
        </div >
    );
};

export default CreateProduct;
