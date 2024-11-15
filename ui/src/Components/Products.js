import React, { useState, useEffect } from "react";
import { useForm } from 'react-hook-form'
import { useLocation, useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import axios from 'axios'
import TopNav from '../Pages/TopNav'
import SideNav from '../Pages/SideNav'
import Footer from "../Pages/Footer"
import { Slide, toast } from 'react-toastify';
import {ProdcutPutApiById,ProductGetApiById,ProductPostApi} from '../Axos'
 
const Products = () => {
    const [existing, setExisting] = useState([])
    const { register, handleSubmit, reset, trigger, formState: { errors } } = useForm();
    const navigate = useNavigate();
    const location = useLocation();
    const Products = () => {
        const [existing, setExisting] = useState([]);
        const { register, handleSubmit, reset, formState: { errors } } = useForm();
        const navigate = useNavigate();
        const location = useLocation();
      
        // Handle form submission
        const onSubmit = async (data) => {
          try {
            if (location && location.state && location.state.id) {
              // Update product if ID exists in location.state
              const res = await ProdcutPutApiById(location.state.id, data);
              toast.success('Updated Successfully', {
                position: 'top-right',
                transition: Slide,
                hideProgressBar: true,
                theme: "colored",
                autoClose: 1000,
              });
              console.log(res.data.data);
              setExisting(res.data.data);
              navigate('/productview');
            } else {
              // Create new product if no ID in location.state
              const response = await ProductPostApi(data, { headers: { 'Content-Type': 'application/json' } });
              toast.success('Registered Successfully', {
                position: 'top-right',
                transition: Slide,
                hideProgressBar: true,
                theme: "colored",
                autoClose: 1000,
              });
              console.log(response.data);
              console.log(data);
              navigate('/productview');
            }
          } catch (error) {
            toast.error('An error occurred while saving the product', {
              position: 'top-right',
              transition: Slide,
              hideProgressBar: true,
              theme: "colored",
              autoClose: 1000,
            });
            console.error('Error occurred:', error);
          }
        };
      

        useEffect(() => {
          const fetchProductData = async () => {
            try {
              if (location && location.state && location.state.id) {
                const response = await ProductGetApiById(location.state.id);
                console.log(response.data);
                reset(response.data.data);  // Populate form with fetched data
              }
            } catch (error) {
              console.error('Error fetching product data:', error);
              toast.error('Error fetching product data', {
                position: 'top-right',
                transition: Slide,
                hideProgressBar: true,
                theme: "colored",
                autoClose: 1000,
              });
            }
          };
      
          fetchProductData();
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
    const productnameValidation = (value) => {
        const regex = /^[A-Za-z\s]+$/;
        if (!regex.test(value)) {
          return "ProductName can only contain letters and spaces.";
        }
        if (value.length < 3) {
          return "ProductName must be at least 3 characters long.";
        }
        if (value.length > 60) {
          return "ProductName must not exceed 60 characters.";
        }
        return true;
      };
      const preventNumbers = (e) => {
        if (/[0-9]/.test(e.key)) {
          e.preventDefault();
        }
      }
      const preventNonNumericCharacters = (e) => {
        if (!/[0-9]/.test(e.key)) {
          e.preventDefault();
        }
      }


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
                                        <label htmlFor="product_name" className="col-sm-3 text-right control-label col-form-label">Product Name</label>
                                        <div className="col-sm-9">
                                            <input type="text" className="form-control" name="product_name" id="product_name" placeholder="Enter Product Name Here"
                                                {...register("product_name", {
                                                    required: 'Product Name is required.',
                                                    validate: (value) => {
                                                        const trimmedValue = value.trim();
                                                        const productnameValidationResult = productnameValidation(trimmedValue); // Call the validation function
                                                        if (productnameValidationResult !== true) {
                                                          return productnameValidationResult; // Return error message if validation fails
                                                        }
                                                        // Check that the trimmed value has at least one character,and allows one space after the first character.
                                                        return /^(\S+ ?)$/.test(trimmedValue);
                                                      },
                                                    onChange: async (e) => {
                                                        const trimmedValue = e.target.value.trimStart(); // Trim leading whitespace
                                                        e.target.value = trimmedValue.replace(/ {2,}/g, ' '); // Replace multiple spaces with a single space
                                                        let value = e.target.value;
                                                        if (value && value.length > 0) {
                                                            value = value.charAt(0).toUpperCase() + value.slice(1);
                                                        }
                                                        // Capitalize letters after spaces
                                                        value = value.replace(/(\s[a-z])/g, (match) => match.toUpperCase());
                                                        e.target.value = value;
                                                        await trigger("product_name"); // Trigger validation
                                                    },
                                                })}
                                                onKeyPress={preventNumbers}
                                            />
                                        </div>
                                        {errors.product_name && (<p className="errorsMsg" id="errorMsg"> {errors.product_name.message} </p>)}
                                    </div>

                                    <div className="form-group row">
                                        <label htmlFor="productcost" className="col-sm-3 text-right control-label col-form-label">Product Cost</label>
                                        <div className="col-sm-9">
                                            <input type="text" className="form-control" name="product_cost" id="product_cost" placeholder="Enter Price"
                                                {...register("product_cost", {
                                                    required: 'Product Cost is required',
                                                    pattern: {
                                                        value: /^[0-9]{1,8}(\.[0-9]{1,2})?$/,
                                                        message: 'Enter a valid price (max 8 digits before decimal, e.g., 99999999.99)',
                                                    },
                                                    onChange: async (e) => {
                                                        e.target.value = e.target.value.trim(); // Trim whitespace
                                                        await trigger("product_cost"); // Trigger validation
                                                    },
                                                })}
                                                onKeyPress={allowNumbersDecimals}
                                              />
                                        </div>
                                        {errors.product_cost && (<p className="errorsMsg" id="errorMsg">{errors.product_cost.message}</p>)}
                                    </div>
                                    <div className="form-group row">
                                        <label htmlFor="hsn_no" className="col-sm-3 text-right control-label col-form-label">HSN No</label>
                                        <div className="col-sm-9">
                                            <input type="text" className="form-control" name="hsn_no" id="hsn_no" placeholder="Enter HSN-no"
                                                {...register("hsn_no", {
                                                    required: 'HSN Number is required.',
                                                    pattern: {
                                                        value: /^[0-9]{6}$/,
                                                        message: 'HSN should be a 6-digit number.',
                                                    },
                                                    onChange: async (e) => {
                                                        e.target.value = e.target.value.trim(); // Trim whitespace
                                                        await trigger("hsn_no"); // Trigger validation
                                                    },
                                                })}
                                                onKeyPress={preventNonNumericCharacters}
                                              />
                           
                                        </div>
                                        {errors.hsn_no && (<p className="errorsMsg" id="errorMsg">{errors.hsn_no.message}</p>)}
                                    </div>
                                    <div className="form-group row">
                                        <label htmlFor="cgst" className="col-sm-3 text-right control-label col-form-label">CGST</label>
                                        <div className="col-sm-9">
                                            <input type="text" className="form-control" name="cgst" id="cgst" placeholder="Enter Cgst "
                                                {...register("cgst", {
                                                    required: 'Enter CGST%',
                                                    pattern: {
                                                        value: /^[0-9]{1,2}(\.[0-9]{1,2})?$/,
                                                        message: 'Enter a valid CGST percentage (e.g., 9 or 9.00) and Percentage must be less than 100%',
                                                    },
                                                    onChange: async (e) => {
                                                        e.target.value = e.target.value.trim(); // Trim whitespace
                                                        await trigger("cgst"); // Trigger validation
                                                    },
                                                })}
                                                onKeyPress={allowNumbersDecimals}
                                             />
                                        </div>
                                        {errors.cgst && (<p className="errorsMsg" id="errorMsg">{errors.cgst.message}</p>)}
                                    </div>
                                    <div className="form-group row">
                                        <label htmlFor="sgst" className="col-sm-3 text-right control-label col-form-label">SGST</label>
                                        <div className="col-sm-9">
                                            <input type="text" className="form-control" name="sgst" id="sgst" placeholder="Enter SGST"
                                                {...register("sgst", {
                                                    required: 'Enter SGST%',
                                                    pattern: {
                                                        value: /^[0-9]{1,2}(\.[0-9]{1,2})?$/,
                                                        message: 'Enter a valid SGST percentage (e.g., 9 or 9.00) and Percentage must be less than 100%',
                                                    },
                                                    onChange: async (e) => {
                                                        e.target.value = e.target.value.trim(); // Trim whitespace
                                                        await trigger("sgst"); // Trigger validation
                                                    },
                                                })}
                                                onKeyPress={allowNumbersDecimals}
                                           />
                                        </div>
                                        {errors.sgst && (<p className="errorsMsg" id="errorMsg">{errors.sgst.message}</p>)}
                                    </div>
                                    <div className="form-group row">
                                        <label htmlFor="igst" className="col-sm-3 text-right control-label col-form-label">IGST</label>
                                        <div className="col-sm-9">
                                            <input type="text" className="form-control" name="igst" id="igst" placeholder="Enter IGST"
                                                {...register("igst", {
                                                    required: 'Enter IGST%',
                                                    pattern: {
                                                        value: /^[0-9]{1,2}(\.[0-9]{1,2})?$/,
                                                        message: 'Enter a valid IGST percentage (e.g., 9 or 9.00) and Percentage must be less than 100% ',
                                                    },
                                                    onChange: async (e) => {
                                                        e.target.value = e.target.value.trim(); // Trim whitespace
                                                        await trigger("igst"); // Trigger validation
                                                    },
                                                })}
                                                onKeyPress={allowNumbersDecimals}
                                            />                  
                                        </div>
                                        {errors.igst && (<p className="errorsMsg" id="errorMsg">{errors.igst.message}</p>)}
                                    </div>
                                </div>
                                <div className="border-top">
                                    <div className="card-body">
                                        <button type="submit" className="btn btn-primary" style={{ marginLeft: "440px" }}>Submit</button>
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
}



export default Products;
