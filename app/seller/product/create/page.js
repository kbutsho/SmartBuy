"use client";
import { useState } from 'react';
import { ProductType } from '@/constant/productType';
import { ProductStatus } from '@/constant/productStatus';
import { BsTrash } from 'react-icons/bs';
import Link from 'next/link';

const CreateProduct = () => {
    const [formData, setFormData] = useState({
        title: '',
        description: '',
        brand: '',
        thumbnail: null,
        images: [],
        variants: [
            {
                type: ProductType.UNOFFICIAL,
                price: '',
                discountPrice: '',
                colour: '',
                storage: '',
                stock: '',
                region: '',
                status: ProductStatus.AVAILABLE
            }
        ],
        others: [{ key: '', value: '' }],
        errors: {}
    });

    const handleChange = (event) => {
        const { name, value, files } = event.target;

        const arrayFieldMatch = name.match(/^(\w+)\[(\d+)\]\.(\w+)$/);
        if (arrayFieldMatch) {
            const [_, field, indexStr, subField] = arrayFieldMatch;
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
                    },
                };
            });
        }
        else if (name === 'images') {
            setFormData(prev => ({
                ...prev,
                images: [...files],
                errors: {
                    ...prev.errors,
                    images: null,
                },
            }));
        } else if (name === 'thumbnail') {
            setFormData(prev => ({
                ...prev,
                thumbnail: files[0],
                errors: {
                    ...prev.errors,
                    thumbnail: null,
                },
            }));
        } else {
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
        const list = formData[field].filter((_, i) => i !== index);
        setFormData({ ...formData, [field]: list });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
    };

    return (
        <div className="container my-5">
            <div className="card p-4">
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
                                <div className="col-md-6">
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
                                <div className="col-md-6">
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
                                <div className="col-12">
                                    <label className="form-label fw-bold text-uppercase">
                                        Description&nbsp;<span className="text-danger">*</span>
                                    </label>
                                    <textarea
                                        rows={3}
                                        name="description"
                                        value={formData.description}
                                        onChange={handleChange}
                                        className={`form-control ${formData.errors.description ? 'is-invalid' : ''}`} />
                                    <div className="invalid-feedback">{formData.errors.description}</div>
                                </div>
                                <div className="col-md-6">
                                    <label className="form-label fw-bold text-uppercase">
                                        Thumbnail&nbsp;<span className="text-danger">*</span>
                                    </label>
                                    <input
                                        type="file"
                                        name="thumbnail"
                                        accept="image/*"
                                        onChange={handleChange}
                                        className={`form-control ${formData.errors.thumbnail ? 'is-invalid' : ''}`} />
                                    <div className="invalid-feedback">{formData.errors.thumbnail}</div>
                                </div>
                                <div className="col-md-6">
                                    <label className="form-label fw-bold text-uppercase">
                                        Featured Images&nbsp;<span className="text-danger">*</span>
                                    </label>
                                    <input
                                        type="file"
                                        name="images"
                                        accept="image/*"
                                        multiple
                                        onChange={handleChange}
                                        className={`form-control ${formData.errors.images ? 'is-invalid' : ''}`} />
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
                                            name={`variants[${idx}].type`}
                                            value={formData.variants[idx].type}
                                            onChange={handleChange}
                                            className={`form-select ${formData.errors[`variants[${idx}].type`] ? 'is-invalid' : ''}`}>
                                            {Object.values(ProductType).map((pt) => (
                                                <option key={pt} value={pt}>{pt}</option>
                                            ))}
                                        </select>
                                        <div className="invalid-feedback">{formData.errors[`variants[${idx}].type`]}</div>
                                    </div>
                                    <div className="col-md-3">
                                        <label className="form-label fw-bold text-uppercase">
                                            Price&nbsp;<span className="text-danger">*</span>
                                        </label>
                                        <input
                                            type="number"
                                            name={`variants[${idx}].price`}
                                            value={formData.variants[idx].price}
                                            onChange={handleChange}
                                            className={`form-control ${formData.errors[`variants[${idx}].price`] ? 'is-invalid' : ''}`} />
                                        <div className="invalid-feedback">{formData.errors[`variants[${idx}].price`]}</div>
                                    </div>
                                    <div className="col-md-3">
                                        <label className="form-label fw-bold text-uppercase">
                                            Discount Price
                                        </label>
                                        <input
                                            type="number"
                                            name={`variants[${idx}].discountPrice`}
                                            value={formData.variants[idx].discountPrice}
                                            onChange={handleChange}
                                            className={`form-control ${formData.errors[`variants[${idx}].discountPrice`] ? 'is-invalid' : ''}`} />
                                        <div className="invalid-feedback">{formData.errors[`variants[${idx}].discountPrice`]}</div>
                                    </div>
                                    <div className="col-md-3">
                                        <label className="form-label fw-bold text-uppercase">
                                            Stock&nbsp;<span className="text-danger">*</span>
                                        </label>
                                        <input
                                            type="number"
                                            name={`variants[${idx}].stock`}
                                            value={formData.variants[idx].stock}
                                            onChange={handleChange}
                                            className={`form-control ${formData.errors[`variants[${idx}].stock`] ? 'is-invalid' : ''}`} />
                                        <div className="invalid-feedback">{formData.errors[`variants[${idx}].stock`]}</div>
                                    </div>
                                    <div className="col-md-3">
                                        <label className="form-label fw-bold text-uppercase">
                                            Colour&nbsp;<span className="text-danger">*</span>
                                        </label>
                                        <input
                                            type="text"
                                            name={`variants[${idx}].colour`}
                                            value={formData.variants[idx].colour}
                                            onChange={handleChange}
                                            className={`form-control ${formData.errors[`variants[${idx}].colour`] ? 'is-invalid' : ''}`} />
                                        <div className="invalid-feedback">{formData.errors[`variants[${idx}].colour`]}</div>
                                    </div>
                                    <div className="col-md-3">
                                        <label className="form-label fw-bold text-uppercase">
                                            Region&nbsp;<span className="text-danger">*</span>
                                        </label>
                                        <input
                                            type="text"
                                            name={`variants[${idx}].region`}
                                            value={formData.variants[idx].region}
                                            onChange={handleChange}
                                            className={`form-control ${formData.errors[`variants[${idx}].region`] ? 'is-invalid' : ''}`} />
                                        <div className="invalid-feedback">{formData.errors[`variants[${idx}].region`]}</div>
                                    </div>
                                    <div className="col-md-3">
                                        <label className="form-label fw-bold text-uppercase">
                                            Storage&nbsp;<span className="text-danger">*</span>
                                        </label>
                                        <input
                                            type="text"
                                            name={`variants[${idx}].storage`}
                                            value={formData.variants[idx].storage}
                                            onChange={handleChange}
                                            className={`form-control ${formData.errors[`variants[${idx}].storage`] ? 'is-invalid' : ''}`} />
                                        <div className="invalid-feedback">{formData.errors[`variants[${idx}].storage`]}</div>
                                    </div>
                                    <div className="col-md-3">
                                        <label className="form-label fw-bold text-uppercase">
                                            Status&nbsp;<span className="text-danger">*</span>
                                        </label>
                                        <select
                                            name={`variants[${idx}].status`}
                                            value={formData.variants[idx].status}
                                            onChange={handleChange}
                                            className={`form-select ${formData.errors[`variants[${idx}].status`] ? 'is-invalid' : ''}`}>
                                            {Object.values(ProductStatus).map((ps) => (
                                                <option key={ps} value={ps}>{ps} </option>
                                            ))}
                                        </select>
                                        <div className="invalid-feedback">{formData.errors[`variants[${idx}].status`]}</div>
                                    </div>
                                </div>
                            </div>
                        ))}
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
                            <table className="table table-borderless align-middle">
                                <thead className="table-light">
                                    <tr>
                                        <th className="text-uppercase fw-bold" style={{ width: "48%" }}>
                                            Key <span className="text-danger">*</span>
                                        </th>
                                        <th className="text-uppercase fw-bold" style={{ width: "48%" }}>
                                            Value <span className="text-danger">*</span>
                                        </th>
                                        <th className="text-uppercase fw-bold" style={{ width: "4%" }}>
                                            Action
                                        </th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {formData.others.map((_, idx) => (
                                        <tr key={idx}>
                                            <td>
                                                <input
                                                    type="text"
                                                    name={`others[${idx}].key`}
                                                    value={formData.others[idx].key}
                                                    onChange={handleChange}
                                                    className={`form-control ${formData.errors[`others[${idx}].key`] ? 'is-invalid' : ''}`}
                                                />
                                                <div className="invalid-feedback">{formData.errors[`others[${idx}].key`]}</div>
                                            </td>
                                            <td>
                                                <input
                                                    type="text"
                                                    name={`others[${idx}].value`}
                                                    value={formData.others[idx].value}
                                                    onChange={handleChange}
                                                    className={`form-control ${formData.errors[`others[${idx}].value`] ? 'is-invalid' : ''}`}
                                                />
                                                <div className="invalid-feedback">{formData.errors[`others[${idx}].value`]}</div>
                                            </td>
                                            <td className="text-center">
                                                <button
                                                    type="button"
                                                    className="btn btn-danger"
                                                    onClick={() => removeItem('others', idx)}>
                                                    <BsTrash size={20} />
                                                </button>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
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
