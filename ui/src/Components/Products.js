import React, { useState, useEffect } from "react";
import { useForm } from 'react-hook-form';
import { useLocation, useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import TopNav from '../Pages/TopNav';
import SideNav from '../Pages/SideNav';
import Footer from "../Pages/Footer";
import { Slide, toast } from 'react-toastify';
import { ProdcutPutApiById, ProductGetApiById, ProductPostApi } from "../Axios";

const Products = () => {
    const { register, handleSubmit, reset, trigger, setValue, formState: { errors } } = useForm();
    const [productData, setProductData] = useState(null);
    const [isUpdating, setIsUpdating] = useState(false);
    const navigate = useNavigate();
    const location = useLocation();

    const onSubmit = (data) => {
        if (location && location.state && location.state.productId) {
            ProdcutPutApiById(location.state.productId, data)
                .then((res) => {
                    toast.success('Updated Successfully', {
                        position: 'top-right',
                        transition: Slide,
                        hideProgressBar: true,
                        theme: "colored",
                        autoClose: 1000,
                    });
                    navigate('/productview');
                });
        } else {
            ProductPostApi(data)
                .then((response) => {
                    toast.success('Registered Successfully', {
                        position: 'top-right',
                        transition: Slide,
                        hideProgressBar: true,
                        theme: "colored",
                        autoClose: 1000,
                    });
                    navigate('/productview');
                })
                .catch((errors) => {
                    toast.error(errors, {
                        position: 'top-right',
                        transition: Slide,
                        hideProgressBar: true,
                        theme: "colored",
                        autoClose: 1000,
                    });
                    console.log('Error occurred');
                });
        }
    };

    useEffect(() => {
        if (location && location.state && location.state.productId) {
            ProductGetApiById(location.state.productId)
                .then((response) => {
                    setIsUpdating(true);
                    console.log("API Response Data:", response.data); // Debugging the API response
                    setProductData(response.data);  // Store data in state
                })
                .catch((error) => {
                    console.error('Error fetching data:', error);
                });
        }
    }, [location]);

    // Use effect to reset form after the product data is set
    useEffect(() => {
        if (productData) {
            reset(productData); // Only reset when productData is available
        }
    }, [productData, reset]);

    const validateField = (value, type) => {
        switch (type) {

            case 'productName':
                return value.length >= 3 && value.length <= 60 || "Product name must be between 3 and 60 characters";

            case 'productCost':
                return /^[0-9]{1,8}(\.[0-9]{1,2})?$/.test(value) || "Product cost must be a valid number (max 8 digits before decimal, e.g., 99999999.99)";

            case 'hsnNo':
                return /^[0-9]{6}$/.test(value) || "HSN number must be exactly 6 digits";

            case 'gst':
                return /^[0-9]{1,2}(\.[0-9]{1,2})?$/.test(value) && parseFloat(value) < 100 || "GST must be a valid number less than 100%";
            default:
                return true;
        }
    };
    const preventInvalidInput = (e, type) => {
        const key = e.key;
        const inputValue = e.target.value;
    
        if (type === 'alpha' && /[^a-zA-Z\s]/.test(key)) {
            e.preventDefault();
        }
        // Numeric check for fields that should only allow numbers
        if (type === 'numeric' && !/^[0-9]$/.test(key)) {
            e.preventDefault();
        }
        if (type === 'decimal') {
            // Prevent invalid decimal input
            if (!/^[0-9.]$/.test(key)) {
                e.preventDefault();
            }
            // Prevent multiple dots
            if (key === '.' && inputValue.includes('.')) {
                e.preventDefault();
            }
        }
        // Prevent spaces (if any additional validation is needed)
        if (type === 'whitespace' && key === ' ') {
            e.preventDefault();
        }
    };
    const handleInputChange = (e, fieldName) => {
        let value = e.target.value;
    
        // Remove leading and trailing spaces
        value = value.trimStart().replace(/ {2,}/g, ' ');
    
        if (fieldName === 'productName') {
            // Capitalize the first letter of each word
            value = value.replace(/\b\w/g, (char) => char.toUpperCase());
        } else if (fieldName === 'productCost' || fieldName === 'gst') {
            // Ensure only numeric or decimal input
            value = value.replace(/[^0-9.]/g, '');
    
            // Disallow multiple leading zeros unless followed by a decimal
            if (value.startsWith('0') && value.length > 1 && value[1] !== '.') {
                value = value.replace(/^0+/, '0'); // Retain only a single leading zero
            }
    
            // Prevent multiple decimals
            const parts = value.split('.');
            if (parts.length > 2) {
                value = parts[0] + '.' + parts.slice(1).join('');
            }
        } else if (fieldName === 'hsnNo') {
            // Ensure only numeric input for HSN
            value = value.replace(/[^0-9]/g, '');
        }
    
        // Set value and trigger validation
        setValue(fieldName, value);
        trigger(fieldName); // Validate the updated field
    };
    
    return (
        <div id="main-wrapper" data-sidebartype="mini-sidebar">
            <TopNav />
            <SideNav />
            <div className="page-breadcrumb" style={{ width: "78%", marginLeft: "280px", marginTop: "30px" }}>
                <div className="row">
                    <div className="col-12 d-flex no-block align-items-center">
                        <h4 className="page-title" style={{ color: "blue" }}>Product Registration</h4>
                        <div className="ml-auto text-right">
                            <nav aria-label="breadcrumb">
                                <ol className="breadcrumb">
                                    <li className="breadcrumb-item"><a href='/main'>Home</a></li>
                                    <li className="breadcrumb-item"><Link to={'/productview'}>Products</Link></li>
                                    <li className="breadcrumb-item active" aria-current="page">Products Registration</li>
                                </ol>
                            </nav>
                        </div>
                    </div>
                </div>
            </div>
            <div className='container-fluid'>
                <div className='row'>
                    <div className='col-md-9 ' style={{ marginLeft: "300px", paddingTop: "50px" }}>
                        <form className="form-horizontal" onSubmit={handleSubmit(onSubmit)}>
                            <div className="card">
                                <div className="card-body">
                                    <h4 className="card-title">Product Info</h4>

                                    {/* Product Name */}
                                    <div className='form row mt-4'>
                                        <div className="form-group col-md-6">
                                            <label htmlFor="productName" className="col-sm-4 text-left control-label col-form-label">Product Name</label>
                                            <input
                                                type="text"
                                                className="form-control"
                                                name="productName"
                                                id="productName"
                                                placeholder="Enter Product Name Here"
                                                {...register("productName", {
                                                    required: 'Product Name is required.',
                                                    validate: (value) => validateField(value, 'productName')
                                                })}
                                                onChange={(e) => handleInputChange(e, "productName")}
                                                onKeyPress={(e) => preventInvalidInput(e, 'alpha')}
                                            />
                                            {errors.productName && <p className="errorsMsg">{errors.productName.message}</p>}
                                        </div>

                                        {/* Product Cost */}
                                        <div className="form-group col-md-6">
                                            <label htmlFor="productCost" className="col-sm-4 text-left control-label col-form-label">Product Cost</label>
                                            <input
                                                type="text"
                                                className="form-control"
                                                name="productCost"
                                                id="productCost"
                                                placeholder="Enter Price"
                                                {...register("productCost", {
                                                    required: 'Product Cost is required',
                                                    validate: (value) => validateField(value, 'productCost')
                                                })}
                                                onChange={(e) => handleInputChange(e, "productCost")}
                                                onKeyPress={(e) => preventInvalidInput(e, 'decimal')}
                                            />
                                            {errors.productCost && <p className="errorsMsg">{errors.productCost.message}</p>}
                                        </div>
                                    </div>
                                    {/* HSN Number */}
                                    <div className='form row mt-4'>
                                        <div className="form-group col-md-6">
                                            <label htmlFor="hsnNo" className="col-sm-4 text-left control-label col-form-label">HSN No</label>
                                            <input
                                                type="text"
                                                className="form-control"
                                                name="hsnNo"
                                                id="hsnNo"
                                                placeholder="Enter HSN-no"
                                                {...register("hsnNo", {
                                                    required: 'HSN Number is required.',
                                                    validate: (value) => validateField(value, 'hsnNo')
                                                })}
                                                onChange={(e) => handleInputChange(e, "hsnNo")}
                                                onKeyPress={(e) => preventInvalidInput(e, 'numeric')}
                                            />
                                            {errors.hsnNo && <p className="errorsMsg">{errors.hsnNo.message}</p>}
                                        </div>

                                        {/* CGST */}
                                        <div className="form-group col-md-6">
                                            <label htmlFor="gst" className="col-sm-4 text-left control-label col-form-label">GST</label>
                                            <input
                                                type="text"
                                                className="form-control"
                                                name="gst"
                                                id="gst"
                                                placeholder="Enter CGST"
                                                {...register("gst", {
                                                    // required: 'Enter GST%',
                                                    // validate: (value) => validateField(value, 'gst')
                                                })}
                                                onChange={(e) => handleInputChange(e, "gst")}
                                                onKeyPress={(e) => preventInvalidInput(e, 'decimal')}
                                            />
                                            {errors.gst && <p className="errorsMsg">{errors.gst.message}</p>}
                                        </div>
                                    </div>
                                    <div className='form row mt-4'>
                                        <div className="form-group col-md-6">
                                            <label htmlFor="hsnNo" className="col-sm-4 text-left control-label col-form-label">Service</label>
                                            <input
                                                type="text"
                                                className="form-control"
                                                name="service"
                                                id="service"
                                                placeholder="Enter Product Service"
                                                {...register("service", {
                                                    required: 'Product Service is required.',
                                                    validate: (value) => validateField(value, 'service')
                                                })}
                                                onChange={(e) => handleInputChange(e, "service")}
                                                onKeyPress={(e) => preventInvalidInput(e, 'alpha')}
                                            />
                                            {errors.service && <p className="errorsMsg">{errors.service.message}</p>}
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="border-top">
                                <div className="card-body d-flex justify-content-end">
                                    <button
                                        className="btn btn-secondary btn-md mr-2"
                                        type="button"
                                        onClick={() => reset()} // Reset form fields to initial values
                                    >
                                        Reset
                                    </button>
                                    <button
                                        className={
                                            isUpdating
                                                ? "btn btn-danger bt-lg"
                                                : "btn btn-primary bt-lg"
                                        }
                                        type="submit"
                                    >
                                        {isUpdating ? "Update Product" : "Add Product"}
                                    </button>
                                </div>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
            <Footer />
        </div>
    );
};

export default Products;
