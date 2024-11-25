
import React, { useState, useEffect } from "react";
import { useForm } from 'react-hook-form'
import { useLocation, useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import axios from 'axios'
import TopNav from '../Pages/TopNav'
import SideNav from '../Pages/SideNav'
import Footer from "../Pages/Footer"
import { Slide, toast } from 'react-toastify';
import { ProductPostApi, ProdcutPutApiById, ProductGetApiById } from "../Axios";

const Products = () => {
    const [existing, setExisting] = useState([])
    const [update, setUpdate] = useState([])
    const [load,setLoad]=useState(false)
    const { register, handleSubmit, reset,setValue,trigger, formState: { errors } } = useForm();
    const navigate = useNavigate();
    const location = useLocation();
    const onSubmit = async(data) => {
            try{
                setLoad(true); // Show loader while making the request
              if (location && location.state && location.state.productId) {
                const res = await ProdcutPutApiById(location.state.productId, data);
                    toast.success(res.data.data, {  //Notification status
                      position: 'top-right',
                      autoClose: 1000, // Close the toast after 1 seconds
                    });
                    navigate('/productview')
                    console.log(res.data.data);
                    setUpdate(res.data.data);
              } else {
                const response = await ProductPostApi(data);
                    toast.success('Data Saved Successfully', {  //Notification status
                      position: 'top-right',
                      autoClose: 1000, // Close the toast after 1 seconds
                    });
                    console.log(response.data);
                    console.log(data);
                    navigate('/productview')
                  }
          
                }
         catch (error) {
            toast.error('Invalid Credentials', {  //Notification status
              position: 'top-right',
              autoClose: 1000, // Close the toast after 1 seconds
            });
            console.log('error occured',error);
      }
      finally{
        setLoad(false) // hide the loader after the request in completes
      }
    }
    useEffect(() => {
        const fetchProductsData = async () => {
            // Ensure that productId exists in the state
            if (location?.state?.productId) {
                try {
                    const response = await ProductGetApiById(location.state.productId);
                    reset(response.data); // Populate form with customer data
                    setUpdate(response.data); // Store fetched data in update state
                    console.log(response.data.productId);
                } catch (error) {
                    toast.error('Error fetching customer data', {
                        position: 'top-right',
                        autoClose: 1000,
                    });
                    console.error('Error fetching customer data:', error);
                }
            } else {
                // Handle case where no productId is passed (new registration)
                console.log('No productId found, starting new registration');
            }
        };
        fetchProductsData();
    }, [location, reset]);

    const allowNumbersDecimals = (e) => {
        if (!/[0-9.]/.test(e.key)) {
            e.preventDefault();
        }
        // Prevent multiple dots
        const input = e.target.value;
        if (e.key === '.' && input.includes('.')) {
            e.preventDefault();
        }
    }
    const preventNonNumericCharacters = (e) => {
        if (!/[0-9]/.test(e.key)) {
            e.preventDefault();
        }
    }
    const handleInputChange = async (e, triggerField, allowSpecialChars = false) => {
        let value = e.target.value;
        value = value.trimStart();
        value = value.replace(/ {2,}/g, ' ');
        if (value && value.length > 0) {
            value = value.charAt(0).toUpperCase() + value.slice(1);
        }
        value = value.replace(/(\s[a-z])/g, (match) => match.toUpperCase());
        if (allowSpecialChars) {
            value = value.replace(/[^a-zA-Z0-9\s\/\-,]/g, '');  // Allow /, -, and ,
        } else {
            value = value.replace(/[^a-zA-Z0-9\s]/g, '');  // Only allow alphanumeric characters and spaces
        }
        setValue(triggerField, value);
        await trigger(triggerField);
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
                                    <li className="breadcrumb-item"><Link to={'/'}>Home</Link></li>
                                    <li className="breadcrumb-item"><Link to={'/productview'}>Products List</Link></li>
                                    <li className="breadcrumb-item active" aria-current="page">Products Registration</li>
                                </ol>
                            </nav>
                        </div>
                    </div>
                </div>
            </div>
            <div className='container-fliuid'>
                <div className='row'>
                    <div className='col-md-9 ' style={{ marginLeft: "300px", paddingTop: "50px" }}>
                        <div className="card">
                            <form className="form-horizontal" onSubmit={handleSubmit(onSubmit)}>
                                <div className="card-body">
                                    <h4 className="card-title">Product Info</h4>
                                    <div className="form-group row mt-5">
                                        <label htmlFor="productName" className="col-sm-3 text-right control-label col-form-label">Product Name</label>
                                        <div className="col-sm-9">
                                            <input type="text" className="form-control" name="productName" id="productName" placeholder="Enter Product Name Here"
                                                {...register("productName", {
                                                    required: 'Product Name is required.',
                                                    minLength: {
                                                        value: 3,
                                                        message: "productName must be at least 3 characters long"
                                                    },
                                                    maxLength: {
                                                        value: 60,
                                                        message: "productName must not exceed 60 characters."
                                                    },
                                                })}
                                                onChange={(e) => handleInputChange(e, "productName")}
                                                onKeyPress={(e) => {
                                                    if (/[0-9]/.test(e.key)) {
                                                        e.preventDefault();
                                                    }
                                                }
                                                }
                                            />
                                        </div>
                                        {errors.productName && (<p className="errorsMsg" id="errorMsg"> {errors.productName.message} </p>)}
                                    </div>

                                    <div className="form-group row">
                                        <label htmlFor="productcost" className="col-sm-3 text-right control-label col-form-label">Product Cost</label>
                                        <div className="col-sm-9">
                                            <input type="text" className="form-control" name="productCost" id="productCost" placeholder="Enter Price"
                                                {...register("productCost", {
                                                    required: 'Product Cost is required',
                                                    pattern: {
                                                        value: /^[0-9]{1,8}(\.[0-9]{1,2})?$/,
                                                        message: 'Enter a valid price (max 8 digits before decimal, e.g., 99999999.99)',
                                                    },
                                                    onChange: async (e) => {
                                                        e.target.value = e.target.value.trim(); // Trim whitespace
                                                        await trigger("productCost"); // Trigger validation
                                                    },
                                                })}
                                                onKeyPress={allowNumbersDecimals}
                                            />
                                        </div>
                                        {errors.productCost && (<p className="errorsMsg" id="errorMsg"> {errors.productCost.message}</p>)}
                                    </div>
                                    <div className="form-group row">
                                        <label htmlFor="hsnNo" className="col-sm-3 text-right control-label col-form-label">HSN No</label>
                                        <div className="col-sm-9">
                                            <input type="text" className="form-control" name="hsnNo" id="hsnNo" placeholder="Enter HSN-no"
                                                {...register("hsnNo", {
                                                    required: 'HSN Number is required.',
                                                    pattern: {
                                                        value: /^[0-9]{4}$/,
                                                        message: 'HSN should be a 4-digit number.',
                                                    },
                                                    onChange: async (e) => {
                                                        e.target.value = e.target.value.trim(); // Trim whitespace
                                                        await trigger("hsnNo"); // Trigger validation
                                                    },
                                                })}
                                                onKeyPress={preventNonNumericCharacters}
                                            />

                                        </div>
                                        {errors.hsnNo && (<p className="errorsMsg" id="errorMsg"> {errors.hsnNo.message} </p>)}
                                    
                                    </div>
                                    <div className="form-group row">
                                        <label htmlFor="gst" className="col-sm-3 text-right control-label col-form-label">GST</label>
                                        <div className="col-sm-9">
                                            <input type="text" className="form-control" name="gst" id="gst" placeholder="Enter Cgst "
                                                {...register("gst", {
                                                    required: 'Enter GST%',
                                                    pattern: {
                                                        value: /^[0-9]{1,2}(\.[0-9]{1,2})?$/,
                                                        message: 'Enter a valid GST percentage (e.g., 9 or 9.00) and Percentage must be less than 100%',
                                                    },
                                                    onChange: async (e) => {
                                                        e.target.value = e.target.value.trim(); // Trim whitespace
                                                        await trigger("gst"); // Trigger validation
                                                    },
                                                })}
                                                onKeyPress={allowNumbersDecimals}
                                            />
                                        </div>
                                        {errors.gst && (<p className="errorsMsg" id="errorMsg"> {errors.gst.message}</p>)}
                                    </div>
                                </div>
                                <div className="border-top">
                                    <div className="card-body">
                                        <button type="submit" className="btn btn-primary" style={{ marginLeft: "440px" }} disabled={load}>Submit</button>
                                    </div>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
            <Footer />
        </div>
    )
}


export default Products