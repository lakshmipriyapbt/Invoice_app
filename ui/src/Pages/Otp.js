//import { response } from 'express';
import React, { useState } from 'react'
import { useForm } from 'react-hook-form'
import { useLocation,useNavigate } from 'react-router-dom';
import axios from 'axios';
import { Slide, toast } from 'react-toastify';
import { ValidateOtp } from '../Axios';

const Otp = () => {
    const [load, setLoad] = useState(false)
    const navigate = useNavigate();
    const { register, handleSubmit,formState: { errors } } = useForm();
   //fetching Login page email input to Otp page input field 
     const location=useLocation();    
    const onSubmit = (data) => {   
        setLoad(true)  // Show loading spinner when submitting OTP  
        ValidateOtp(data) 
            .then((response) => {
                if (response.status === 200) {
                    toast.success(response.data, {
                        position: 'top-right',
                        transition: Slide,
                        hideProgressBar: true,
                        theme: "colored",
                        autoClose: 1000, // Close the toast after 3 seconds
                    });
                    console.log(response.data);
                    //storing data in sessionStorage
                    sessionStorage.setItem('user', JSON.stringify(data))
                    sessionStorage.setItem('role', response.data.role);
                    sessionStorage.setItem('Access_Token', response.data.access_token);
                    sessionStorage.setItem('Refresh_Token', response.data.refresh_token);
                    navigate('/main')
                } else {
                    toast.error(response.data.data, {
                        position: 'middle-right',
                        hideProgressBar: true,
                        transition: Slide,
                    });
                    throw new Error('Invalid credentials');
                }
            })
            .catch((error) => {
                setLoad(false);

                if (error.response && error.response.status === 400) {
                    // Handle the 400 Bad Request error
                    // Access error details from error.response.data or error.response.status
                    // const errorMessage = error.res.data; // Assuming the server sends an error message
                    toast.error(`Error Occured!`, {
                        position: 'top-right',
                        transition: Slide,
                        hideProgressBar: true,
                        theme: "colored",
                        autoClose: 1000,
                    });
                }
            });
    }

    return (
        <div>
            <div className="main-wrapper">
                {/* ============================================================== */}
                {/* Preloader - style you can find in spinners.css */}
                {/* ============================================================== */}

                {load && (
                    <div className="preloader">
                        <div className="lds-ripple">
                            <div className="lds-pos" />
                            <div className="lds-pos" />
                        </div>
                    </div>
                )}
                {/* ============================================================== */}
                {/* Login box.scss */}
                {/* ============================================================== */}
                <div className="auth-wrapper d-flex justify-content-center align-items-center" style={{ backgroundColor: "#11375B" }}>
                    <div className="auth-box border-top border-secondary" style={{ backgroundColor: "#fefef" }}>
                        <div id="loginform">
                            <div className="text-center p-t-20 p-b-20">
                                <span className="db"><img src="assets/images/pathbreaker_logo.png " style={{ height: "80px", width: "250px", marginBottom: "18px" }} alt="logo" /></span>
                            </div>
                            {/* Form */}
                            <form className="form-horizontal m-t-20" id="loginform" onSubmit={handleSubmit(onSubmit)}>
                                <div className="row p-b-30">
                                    <div className="col-12">
                                        <div className="input-group-prepend">
                                            <label style={{ color: "orange" }}>Email</label>
                                        </div>
                                        <div className="input-group ">
                                            <input className="form-control" name="email" type='text' id="email"  placeholder="Enter Email"
                                            defaultValue={location.state?.companyEmail} readOnly
                                                {...register("companyEmail", {
                                                    required: "Email is Required",
                                                    pattern: {
                                                        value: /^[^@ ]+@[^@ ]+\.[^@ .]{2,}$/,
                                                        message: "Invalid Email"
                                                    }
                                                })}
                                            />
                                        </div>
                                        {errors.companyEmail && ((<p className="errorsMsg mt-1" >{errors.companyEmail.message}</p>))}
                                        <div>
                                            <label style={{ color: "orange" }}>Enter OTP</label>
                                        </div>
                                        <div className="input-group mb-3">
                                            <input type="text" id='otp' name='otp' className="form-control form-control-lg" placeholder="*****" aria-label="Username" aria-describedby="basic-addon1"
                                               maxLength={6}
                                               {...register("otp", {
                                                    required: "OTP required"
                                                   
                                                })}
                                            /> 
                                        </div>
                                        {errors.otp && (<p className='errorsMsg mb-1'>{errors.otp.message}</p>)}
                                    </div>
                                </div>
                                <div className="row border-top border-secondary">
                                    <div className="col-12">
                                        <div className="form-group">
                                            <div className="p-t-20">

                                                <button className="btn btn-success mt-3" style={{ marginLeft: "40%" }} type="submit">Verify OTP</button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </form>
                        </div>
                    </div>
                   

                </div>
                {/* ============================================================== */}
                {/* Login box.scss */}
            </div>

        </div>
    )
}

export default Otp
 {/** <div id="recoverform">
                <div className="text-center">
                <span className="text-white">Enter your e-mail address below and we will send you instructions how to recover a password.</span>
                </div>
                <div className="row m-t-20">
                
                <form className="col-12" action="index.html">
                    
                    <div className="input-group mb-3">
                    <div className="input-group-prepend">
                        <span className="input-group-text bg-danger text-white" id="basic-addon1"><i className="ti-email" /></span>
                    </div>
                    <input type="text" className="form-control form-control-lg" placeholder="Email Address" aria-label="Username" aria-describedby="basic-addon1" />
                    </div>
                    
                    <div className="row m-t-20 p-t-20 border-top border-secondary">
                    <div className="col-12">
                        <a className="btn btn-success" href="#" id="to-login" name="action">Back To Login</a>
                        <button className="btn btn-info float-right" type="button" name="action">Recover</button>
                    </div>
                    </div>
                </form>
                </div>
            </div>
            */}
