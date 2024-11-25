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
    const { register, handleSubmit, reset, formState: { errors } } = useForm();
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
                                                {...register("productName", { required: 'Enter Product Name' })}
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
                                                {...register("productCost", { required: 'Enter Product Cost' })}
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
                                                {...register("hsnNo", { required: 'Enter HSN Number' })}
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
                                                {...register("gst", { required: 'Enter GST' })}
                                            />
                                            {errors.gst && <p className="errorsMsg">{errors.gst.message}</p>}
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="border-top">
                                <div className="card-body">
                                    <button
                                        className={
                                            isUpdating
                                                ? "btn btn-danger bt-lg"
                                                : "btn btn-primary bt-lg"
                                        }
                                        style={{ marginLeft: "90%" }}
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
