import React, { useState, useEffect, useRef } from 'react'
import SideNav from "../Pages/SideNav";
import TopNav from "../Pages/TopNav";
import axios from 'axios';
import { Controller, useForm } from 'react-hook-form';
import { Link } from 'react-router-dom';
import Footer from '../Pages/Footer';
import { Slide, toast } from 'react-toastify'
import { CompanyRegistrationApi } from '../Axos';
const AdminRegistration = () => {
<<<<<<< Updated upstream
  const { register, handleSubmit, formState: { errors }, control } = useForm();
  const [selectedFile, setSelectedFile] = useState(null);

  

  const onSubmit = async (data) => {
    const formData =new FormData();
    formData.append("client",data.client);
    formData.append("email",data.email);
    formData.append("phone",data.phone);
    formData.append("company",data.pan);
    formData.append("pan",data.pan);
    formData.append("gstnumber",data.gstnumber);
    formData.append("gender",data.gender);
    formData.append("File",data.stamp[0]);
    formData.append("FileName",data.stamp[0].name);
    formData.append("BandkAccount",data.bankAccount);
    formData.append("BankName",data.bankName);
    formData.append("BankBranch",data.bankBranch);
    formData.append("ifsc",data.ifsc);
    formData.append("address",data.address);
    formData.append("state",data.state);
    try {
      
      const response = await axios.post("http://122.175.43.71:8001/api/adminprofile", formData, {
=======
  const { register, handleSubmit, formState: { errors }, control, trigger,setValue } = useForm();
  const [selectedFile, setSelectedFile] = useState(null);

  const onSubmit = async (data) => {
    const token = localStorage.getItem("token");
    const formData = new FormData();
    formData.append("userName", data.userName);
    formData.append("email", data.email);
    formData.append("password", data.password)
    formData.append("phone", data.phone);
    formData.append("companyName", data.companyName);
    formData.append("service", data.service)
    formData.append("pan", data.pan);
    formData.append("gstNumber", data.gstNumber);
    formData.append("gender", data.gender);
    formData.append("stampAndSign",data.stampAndSign)
    formData.append("bankAccount", data.bankAccount);
    formData.append("bankName", data.bankName);
    formData.append("branch", data.branch);
    formData.append("ifscCode", data.ifscCode);
    formData.append("address", data.address);
    formData.append("state", data.state);
    try {
      // Assuming CompanyRegistrationApi uses formData
      const response = await CompanyRegistrationApi(formData, {
>>>>>>> Stashed changes
        headers: {
          Authorization: `Bearer ${token}`, // Include token if necessary
        },
      });
  
      if (response.status === 201) {
        toast.success('Register Successfully', {
          position: 'top-right',
          theme: "colored",
          autoClose: 1000,
          transition: Slide,
        });
        console.log('Response data:', response.data);
        console.log('Submitted data:', data);
      } else {
        toast.error('invalid credentials');
      }
    } catch (error) {
      console.error('Error:', error);
      if (error.response) {
        // If error.response exists, it means the error came from the server.
        console.error('Server Error:', error.response.data);
        toast.error(`Error: ${error.response.data.detail || 'Unknown error'}`);
      } else {
        // Network or other errors
        toast.error('Network or unknown error occurred.');
      }
    }
  };
<<<<<<< Updated upstream
=======
  // custom validation function for email
  const emailValidation = (value) => {
    if (/[A-Z]/.test(value)) {
      return "Email cannot contain uppercase letters";
    }
    return /^[a-z]([a-z0-9._-]*[a-z0-9])?@[a-z]([a-z0-9.-]*[a-z0-9])?\.(com|in|net|gov|org|edu)$/.test(value) || "Invalid Email format";
  };
  // Prevent input of non-numeric characters
  const preventNonNumericCharacters = (e) => {
    if (!/[0-9]/.test(e.key)) {
      e.preventDefault();
    }
  }
  const handlePhoneChange = (e) => {
    const value = e.target.value;
    // Allow only the first digit to be 6-9
    if (value.length === 0 && /^[0-5]$/.test(e.key)) {
      e.preventDefault();
    }
    // Prevent entering more than 10 digits
    if (value.length >= 10) {
      e.preventDefault();
    }
  };
  const preventNonAlphabets= (e)=>{
    if(!/^[a-zA-Z\s]*$/.test(e.key)){
      e.preventDefault();
    }
  }

  const handleInputChange = async (e, triggerField,allowSpecialChars = false) => {
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
  

>>>>>>> Stashed changes
  return (
    <div id="main-wrapper" data-sidebartype="mini-sidebar">
      <TopNav />
      <SideNav />
      <div className="page-breadcrumb" style={{ width: "78%", marginLeft: "280px", marginTop: "20px" }}>
        <div className="row">
          <div className="col-12 d-flex no-block align-items-center">
            <h4 className="page-title" style={{ color: "blue" }}>Admin Registration</h4>
            <div className="ml-auto text-right">
              <nav aria-label="breadcrumb">
                <ol className="breadcrumb">
                  <li className="breadcrumb-item"><Link to={'/'}>Home</Link></li>
                  <li className="breadcrumb-item active" aria-current="page">Admin</li>
                </ol>
              </nav>
            </div>
          </div>
        </div>
      </div>
      <div className='container-fliuid'>
        <div className='row'>
          <div className='col-md-9 ' style={{ marginLeft: "300px", marginTop: "40px" }}>
            <div className="card">
              <form className="form-horizontal" onSubmit={handleSubmit(onSubmit)} encType='multipart/form-data'>
                <div className="card-body">
<<<<<<< Updated upstream
                  <h4 className="card-title" style={{ marginLeft: "80px" }}>Admin Info</h4>
                  <div className="form-group row mt-5">
                    <label htmlFor="fname" className="col-sm-3 text-right control-label col-form-label">User Name</label>
                    <div className="col-sm-9">
                      <input type="text" className="form-control" name="client" id="client" placeholder="Client Name"
                        {...register("client", {
                          required: true,
                        })}
                      />
=======
                  <h3 className="card-title" style={{ marginLeft: "10px", marginTop: "10px" }}>Admin Info</h3>
                  <div className='form row mt-4'>
                    <div className="form-group col-md-6">
                      <label htmlFor="fname" className="col-sm-4 text-left control-label col-form-label">User Name</label>
                      <input type="text" className="form-control" name="client" id="client" placeholder="Enter Client Name"
                        {...register("userName", {
                          required: "User Name is Required",
                          minLength:{
                            value:3,
                            message:"Username must be at least 3 characters long"
                          },
                          maxLength:{
                            value:60,
                            message:"Username must not exceed 60 characters."
                          },
                          // validate: (value) => {
                          //   const trimmedValue = value.trim();
                          //   // return /^(\S+ ?)$/.test(trimmedValue);
                          // },
                        })}
                        onChange={(e)=>handleInputChange(e,"userName",false)}
                        onKeyPress={preventNonAlphabets}
                      />
                      {errors.userName && <p className='errorsMsg '>{errors.userName.message}</p>}
>>>>>>> Stashed changes
                    </div>
                    <div>
                      {errors.client && <p className='errorsMsg '>Client Name is Required .</p>}
                    </div>
                  </div>
                  <div className="form-group row">
                    <label htmlFor="email" className="col-sm-3 text-right control-label col-form-label">Email</label>
                    <div className="col-sm-9">
                      <input type="email" className="form-control" name="email" id="email" placeholder="Email Id"
                        {...register("email", {
                          required: "Email is Required",
                          pattern: {
                            value: /^[^@ ]+@[^@ ]+\.[^@ .]{2,}$/,
                            message: "Invalid Email"
                          }
                        })}
<<<<<<< Updated upstream
=======
                        onKeyPress={(e)=>{
                          if (e.key === ' ') {
                            e.preventDefault();
                          }
                        }}
>>>>>>> Stashed changes
                      />
                    </div>
                    <div>
                      {errors.email && <p className="errorsMsg">{errors.email.message}</p>}
                    </div>
                  </div>
<<<<<<< Updated upstream
                  <div className="form-group row">
                    <label htmlFor="phone" className="col-sm-3 text-right control-label col-form-label">Phone:</label>
                    <div className="col-sm-9">
                      <input type="tel" className="form-control" name="phone" id="phone" placeholder="Phone Number"
                        {...register("phone", {
                          required: "Enter Mobile Number",
                          minLength: {
                            value: 10,
=======
                  <div className="form-row">
                    <div className="form-group col-md-6">
                      <label htmlFor="password" className="col-sm-4 text-left control-label col-form-label">Password</label>
                      <input type="password" className="form-control" name="password" id="password" placeholder="Enter Password"
                        {...register("password", {
                          required: "Password is Required",
                          minLength: {
                            value: 8,
                            message: "Password must be at least 8 characters long"
                          },
                          maxLength: {
                            value: 16,
                            message: "Password must be at most 16 characters long"
                          },
                          pattern: {
                            value: /^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])(?=.*\W)(?!.* ).{8,16}$/,
                            message: "Password Must Contain At least One Uppercase letter, One Lowercase letter, One number, And One Special Character."
                          },
                          onChange: async (e) => {
                            e.target.value = e.target.value.trim(); // Trim whitespace
                            await trigger("password"); // Trigger validation
                          },
                        })}
                      />
                      {errors.password && <p className="errorsMsg">{errors.password.message}</p>}
                    </div>
                    <div className="form-group col-md-6">
                      <label htmlFor="phone" className="col-sm-4 text-left control-label col-form-label">Phone</label>
                      <input type="tel" className="form-control" name="phone" id="phone" placeholder="Enter Phone Number"
                        {...register("phone", {
                          required: "Mobile Number is Required",
                          pattern: {
                            value: /^[6-9][0-9]{9}$/,
>>>>>>> Stashed changes
                            message: 'Enter valid Mobile Number',
                          }
                        })}
                      />
                    </div>
                    <div>
                      {errors.phone && (<p className='errorsMsg'>{errors.phone.message}</p>)}
                    </div>
                  </div>
<<<<<<< Updated upstream
                  <div className="form-group row">
                    <label htmlFor="company" className="col-sm-3 text-right control-label col-form-label">Company Name</label>
                    <div className="col-sm-9">
                      <input type="text" className="form-control" name="company" id="company" placeholder="Company Name"
                        {...register("company", {
                          required: true,
                        })}
                      />
                    </div>
                    <div>
                      {errors.company && <p className='errorsMsg '>Company Name is Required .</p>}
=======
                  <div className="form-row">
                    <div className="form-group col-md-6">
                      <label htmlFor="company" className="col-sm-4 text-left control-label col-form-label">Company Name</label>
                      <input type="text" className="form-control" name="company" id="company" placeholder="Enter Company Name"
                        {...register("companyName", {
                          required: "Company Name is Required",
                        })}
                        onChange={(e)=>handleInputChange(e,"companyName",false)}
                        onKeyPress={preventNonAlphabets}
                      />
                      {errors.companyName && <p className='errorsMsg '>{errors.companyName.message}</p>}
                    </div>
                    <div className="form-group col-md-6">
                      <label htmlFor="service" className="col-sm-4 text-left control-label col-form-label">Service Name</label>
                      <input type="text" className="form-control" name="service" id="service" placeholder="Enter Service Name"
                        {...register("service", {
                          required: "Service Name is Required",
                          onChange: async (e) => {
                            const trimmedValue = e.target.value.trimStart(); // Trim whitespace
                            e.target.value = trimmedValue.replace(/ {2,}/g, ' ');
                            await trigger("service"); // Trigger validation
                          },
                        })}
                        onKeyPress={(e)=>{
                          if (e.key === ' ') {
                            e.preventDefault();
                          }
                          if(!/[a-z]/.test(e.key)){
                            e.preventDefault(e)
                          }
                        }}
                      />
                      {errors.service && <p className='errorsMsg '>{errors.service.message}</p>}
>>>>>>> Stashed changes
                    </div>
                  </div>
                  <div className="form-group row">
                    <label htmlFor="pan" className="col-sm-3 text-right control-label col-form-label">Pan</label>
                    <div className="col-sm-9">
                      <input type="text" className="form-control" name="pan" id="pan" placeholder="Pan Card Number"
                        {...register("pan", {
<<<<<<< Updated upstream
                          required: "Enter Pan Number.",
                          maxLength: {
                            value: 10,
                            message: "Please enter valid Pan number."
                          }
=======
                          required: "Pan Number is Required.",
                          maxLength:{
                            value:10,
                            message:"Pan Number must not exceed 10 characters"
                          },
                          pattern: {
                            value: /^[A-Z]{5}[0-9]{4}[A-Z]{1}$/,
                            message: "Invalid PAN format. It should be in the format: ABCDE1234F"
                          },
                          onChange: async (e) => {
                            e.target.value = e.target.value.toUpperCase().trim(); // Trim whitespace
                            await trigger("pan"); // Trigger validation
                          },
>>>>>>> Stashed changes
                        })}
                      />
                    </div>
                    <div>
                      {errors.pan && (
                        <p className="errorsMsg">{errors.pan.message}</p>
                      )}
                    </div>
<<<<<<< Updated upstream
                  </div>
                  <div className="form-group row">
                    <label htmlFor="gstnumber" className="col-sm-3 text-right control-label col-form-label">GST-Number</label>
                    <div className="col-sm-9">
                      <input type="text" className="form-control" name="gstnumber" id="gstnumber" placeholder="GST..."
                        {...register("gstnumber", {
                          required: "Enter GST Number",
                          minLength: {
                            value: 12,
                            message: 'Enter valid GST Number',
                          }
                        })}
                      />
                    </div>
                    <div>
                      {errors.gstnumber && (<p className='errorsMsg'>{errors.gstnumber.message}</p>)}
=======
                    <div className="form-group col-md-6">
                      <label htmlFor="gstnumber" className="col-sm-4 text-left control-label col-form-label">GST-Number</label>
                      <input type="text" className="form-control" name="gstnumber" id="gstnumber" placeholder="Enter GST Number"
                        {...register("gstNumber", {
                          required: "GST Number is Required",
                          maxLength:{
                            value:15,
                            message:"GST-Numbe must not exceed 15 characters"
                          },
                          pattern: {
                            value: /^[0-9]{2}[A-Z]{5}[0-9]{4}[A-Z][0-9]{1}[Z][A-Z0-9]$/,
                            message: "Invalid GST Number format. It should be in the format: 12ABCDE1234F1Z1"
                          },
                          onChange: async (e) => {
                            e.target.value = e.target.value.toUpperCase().trim(); // Trim whitespace
                            await trigger("gstNumber"); // Trigger validation
                          },
                        })}
                      />
                      {errors.gstNumber && (<p className='errorsMsg'>{errors.gstNumber.message}</p>)}
>>>>>>> Stashed changes
                    </div>
                  </div>
                  <div className=' form-group row'>
                    <label htmlFor="gender" className="col-sm-3 text-right control-label col-form-label">Gender</label>
                    <input type="radio" name="gender" id="genderMale" value="male" style={{ marginLeft: "12px" }}
                      {...register("gender", {
                        required: "Please select your gender"
                      })}
                    />
                    <label htmlFor='genderMale' className="text-right col-form-label ml-2">Male</label><br />
                    <input type="radio" name="gender" id="genderFemale" value="female" style={{ marginLeft: "10px" }}
                      {...register("gender")}
                    />
                    <label htmlFor='genderFemale' className="text-right  col-form-label ml-2" required>Female</label>
                    <input type="radio" name="gender" id="genderOthers" value="others" style={{ marginLeft: "10px" }}
                      {...register("gender")}
                    />
                    <label htmlFor='genderOthers' className="text-right  col-form-label ml-2" required>Others</label>
                    {errors.gender && <p className="errorsMsg mt-2" style={{ marginLeft: "40px" }}>{errors.gender.message}</p>}
                  </div>

                  <div className="form-group row">
                    <label className="col-sm-3 text-right control-label col-form-label">Stamp & Sign</label>
                    <div className="col-md-5">
                      <div className="custom-file">
<<<<<<< Updated upstream
                        <input type="file" className="custom-file-input" name='stamp' id="stamp"
                          onChange={(e)=>(e.target.files[0])}
                        {
                          ...register("stamp",{
                            required:"Upload a Stamp",
                          })
                        } />
                        <label className="custom-file-label" htmlFor="stamp">Choose file...</label>
                       {errors.stamp &&(<p className='errorsMsg'>{errors.stamp.message}</p>)}
=======
                        <input type="file" className="custom-file-input" name='stamp' id="stamp" accept=".jpg,.jpeg,.png"
                          {...register("stampAndSign", {
                            required: "Upload a Stamp",
                            validate: {
                              correctFormat: (value) => {
                                const validFormats = ['image/jpeg', 'image/png'];
                                return value.length === 0 || validFormats.includes(value[0].type) || "Invalid file type. Please upload a JPG or PNG.";
                              },
                              correctSize: (value) => {
                                return value.length === 0 || value[0].size <= 2 * 1024 * 1024 || "File size must be less than 2MB.";
                              },
                            },
                          })}
                        />
                        <label className="custom-file-label" htmlFor="stamp">Choose file...</label>
                        {errors.stampAndSign && (<p className='errorsMsg'>{errors.stampAndSign.message}</p>)}
>>>>>>> Stashed changes
                      </div>
                    </div>
                  </div>

                  <h5 className="card-title" style={{ marginLeft: "80px" }}>Bank Details</h5>
                  <div className="form-group row">
                    <label htmlFor="bankaccount" className="col-sm-3 text-right control-label col-form-label">Bank Account</label>
                    <div className="col-sm-9">
                      <input type="text" className="form-control" name="bankAccount" id="bankAccount" placeholder="Bank Account"
                        {...register("bankAccount", {
                          required: "Enter Account Number",
                          minLength: {
<<<<<<< Updated upstream
                            value: 12,
                            message: 'Enter valid Account Number',
                          }
                        })}
                      />
                    </div>
                    <div>
                      {errors.bankAccount && (<p className='errorsMsg'>{errors.bankAccount.message}</p>)}
                    </div>
                  </div>
                  <div className="form-group row">
                    <label htmlFor="bankname" className="col-sm-3 text-right control-label col-form-label">Bank Name</label>
                    <div className="col-sm-9">
                      <input type="text" className="form-control" name="bankName" id="bankName" placeholder="Bank Name"
                        {...register("bankName", {
                          required: true,
                        })}
                      />
                    </div>
                    <div>
                      {errors.bankName && <p className='errorsMsg '>Bank Name is Required .</p>}
                    </div>
                  </div>
                  <div className="form-group row">
                    <label htmlFor="Branch" className="col-sm-3 text-right control-label col-form-label">Branch</label>
                    <div className="col-sm-9">
                      <input type="text" className="form-control" name="bankBranch" id="bankBranch" placeholder="Branch Name"
                        {...register("bankBranch", {
                          required: true,
                        })}
                      />
                    </div>
                    <div>
                      {errors.bankBranch && <p className='errorsMsg '>Branch Name is Required .</p>}
                    </div>
                  </div>
                  <div className="form-group row">
                    <label htmlFor="ifsc" className="col-sm-3 text-right control-label col-form-label"> IFSC Code</label>
                    <div className="col-sm-9">
                      <input type="text" className="form-control" name="ifsc" id="ifsc" placeholder="IFSC CODE"
                        {...register("ifsc", {
                          required: "Enter IFSC Code",
                          minLength: {
                            value: 12,
                            message: 'Enter valid IFSC Code',
                          }
                        })}
                      />
                    </div>
                    <div>
                      {errors.ifsc && (<p className='errorsMsg'>{errors.ifsc.message}</p>)}
                    </div>
                  </div>
                  <div className="form-group row">
                    <label htmlFor="lname" className="col-sm-3 text-right control-label col-form-label">Address</label>
                    <div className="col-sm-9">
                      < textarea rows="3" cols="5" className="form-control" name="address" id="address" placeholder="Enter Address"
                        {...register("address", {
                          required: true,
=======
                            value: 9,
                            message: 'Bank Account Number must be at least 9 characters long',
                          },
                          maxLength: {
                            value: 18,
                            message: 'Bank Account Number must be at most 18 characters long'
                          },
                          onChange: async (e) => {
                            e.target.value = e.target.value.trim(); // Trim whitespace
                            await trigger("bankAccount"); // Trigger validation
                          },
                        })}
                        onKeyPress={preventNonNumericCharacters}
                      />
                      {errors.bankAccount && (<p className='errorsMsg'>{errors.bankAccount.message}</p>)}
                    </div>
                    <div className="form-group col-md-6">
                      <label htmlFor="bankname" className="col-sm-4 text-left control-label col-form-label">Bank Name</label>
                      <input type="text" className="form-control" name="bankName" id="bankName" placeholder="Enter Bank Name"
                        {...register("bankName", {
                          required: "Bank Name is Required",
                        })}
                        onChange={(e)=>handleInputChange(e,"bankName",false)}
                        onKeyPress={preventNonAlphabets}
                      />
                      {errors.bankName && <p className='errorsMsg '>{errors.bankName.message}</p>}
                    </div>
                  </div>
                  <div className='form-row'>
                    <div className="form-group col-md-6">
                      <label htmlFor="Branch" className="col-sm-4 text-left control-label col-form-label">Branch</label>
                      <input type="text" className="form-control" name="bankBranch" id="bankBranch" placeholder="Enter Branch Name"
                        {...register("branch", {
                          required: "Branch Name is Required",
                        })}
                        onChange={(e)=>handleInputChange(e,"branch",false)}
                        onKeyPress={preventNonAlphabets}
                      />
                      {errors.branch && <p className='errorsMsg '>{errors.branch.message}</p>}
                    </div>
                    <div className="form-group col-md-6">
                      <label htmlFor="ifsc" className="col-sm-4 text-left control-label col-form-label"> IFSC Code</label>
                      <input type="text" className="form-control" name="ifsc" id="ifsc" placeholder="Enter IFSC CODE"
                        {...register("ifscCode", {
                          required: "IFSC Code is Required",
                          maxLength: {
                            value: 11,
                            message: 'IFSC Code must be 11 characters long',
                          },
                          pattern: {
                            value: /^[A-Z]{4}[0]{1}[A-Z0-9]{6}$/,
                            message: 'Invalid IFSC Code format. It should be in the format: AAAA0BBBBBB',
                          },
                          onChange: async (e) => {
                            e.target.value = e.target.value.trim(); // trim validations
                            await trigger("ifscCode");  // trigger validation
                          }
                        })}
                      />
                      {errors.ifscCode && (<p className='errorsMsg'>{errors.ifscCode.message}</p>)}
                    </div>
                  </div>
                  <div className='form-row'>
                    <div className="form-group col-md-6">
                      <label htmlFor="state" className="col-sm-4 text-left control-label col-form-label">State</label>
                      <input type="text" className="form-control" name="state" id="state" placeholder="Enter State"
                        {...register("state", {
                          required: "State Name is Required",
                        })}
                        onChange={(e)=>handleInputChange(e,"state",false)}
                        onKeyPress={preventNonAlphabets}
                      />
                      {errors.state && <p className='errorsMsg '>{errors.state.message}</p>}
                    </div>
                    <div className="form-group col-md-6">
                      <label htmlFor="lname" className="col-sm-4 text-left control-label col-form-label">Address</label>
                      < textarea rows="3" cols="5" className="form-control" name="address" id="address" placeholder="Enter Address"
                        {...register("address", {
                          required: "Address is Required",
                          maxLength: {
                            value: 250,
                            message: 'Address must be at most 250 characters long'
                          },
>>>>>>> Stashed changes
                        })}
                        onChange={(e)=>handleInputChange(e,"address",true)}
                      />
                    </div>
                    <div>
                      {errors.address && <p className='errorsMsg '>Enter Address Required</p>}
                    </div>
                  </div>
                  <div className="form-group row">
                    <label htmlFor="state" className="col-sm-3 text-right control-label col-form-label">State</label>
                    <div className="col-sm-9">
                      <input type="text" className="form-control" name="state" id="state" placeholder="State...."
                        {...register("state", {
                          required: true,
                        })}
                      />
                    </div>
                    <div>
                      {errors.state && <p className='errorsMsg '>State Name is Required .</p>}
                    </div>
                  </div>
                  <div className="border-top">
                    <div className="card-body">
                      <button type="submit" className="btn btn-primary" style={{ marginLeft: "250px" }}>Submit</button>
                    </div>
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
export default AdminRegistration;
{/**
try {
      // Declare formData before the try block
      const formData = new FormData();
      Object.entries(data).forEach(([key, value]) => {
        if (key === 'file') {
          // For the 'file' field, append file name and file data
          formData.append('fileName', value.fileName);
          formData.append('fileData',value);
        } else {
          // For other fields, append key-value pairs
          formData.append(key, value);
        }
      });
     */}
