import React, { useState, useEffect, useRef } from 'react'
import SideNav from "../Pages/SideNav";
import TopNav from "../Pages/TopNav";
import axios from 'axios';
import { Controller, useForm } from 'react-hook-form';
import { Link } from 'react-router-dom';
import Footer from '../Pages/Footer';
import { Slide, toast } from 'react-toastify'



const AdminRegistration = () => {
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
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      toast.success('Register Successfully', {
        position: 'top-right',
        theme: "colored",
        autoClose: 1000,
        transition: Slide,
      });

      console.log(response.data);
      console.log(data);
    } catch (error) {
      console.error('Error:', error);
    }
  };
  return (
    <div id="main-wrapper" data-sidebartype="mini-sidebar">
      <TopNav />
      <SideNav />
      <div className="page-breadcrumb" style={{ width: "78%", marginLeft: "280px", marginTop: "20p" }}>
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
                  <h4 className="card-title" style={{ marginLeft: "80px" }}>Admin Info</h4>
                  <div className="form-group row mt-5">
                    <label htmlFor="fname" className="col-sm-3 text-right control-label col-form-label">User Name</label>
                    <div className="col-sm-9">
                      <input type="text" className="form-control" name="client" id="client" placeholder="Client Name"
                        {...register("client", {
                          required: true,
                        })}
                      />
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
                      />
                    </div>
                    <div>
                      {errors.email && <p className="errorsMsg">{errors.email.message}</p>}
                    </div>
                  </div>
                  <div className="form-group row">
                    <label htmlFor="phone" className="col-sm-3 text-right control-label col-form-label">Phone:</label>
                    <div className="col-sm-9">
                      <input type="tel" className="form-control" name="phone" id="phone" placeholder="Phone Number"
                        {...register("phone", {
                          required: "Enter Mobile Number",
                          minLength: {
                            value: 10,
                            message: 'Enter valid Mobile Number',
                          }
                        })}
                      />
                    </div>
                    <div>
                      {errors.phone && (<p className='errorsMsg'>{errors.phone.message}</p>)}
                    </div>
                  </div>
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
                    </div>
                  </div>
                  <div className="form-group row">
                    <label htmlFor="pan" className="col-sm-3 text-right control-label col-form-label">Pan</label>
                    <div className="col-sm-9">
                      <input type="text" className="form-control" name="pan" id="pan" placeholder="Pan Card Number"
                        {...register("pan", {
                          required: "Enter Pan Number.",
                          maxLength: {
                            value: 10,
                            message: "Please enter valid Pan number."
                          }
                        })}
                      />
                    </div>
                    <div>
                      {errors.pan && (
                        <p className="errorsMsg">{errors.pan.message}</p>
                      )}
                    </div>
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
                        <input type="file" className="custom-file-input" name='stamp' id="stamp"
                          onChange={(e)=>(e.target.files[0])}
                        {
                          ...register("stamp",{
                            required:"Upload a Stamp",
                          })
                        } />
                        <label className="custom-file-label" htmlFor="stamp">Choose file...</label>
                       {errors.stamp &&(<p className='errorsMsg'>{errors.stamp.message}</p>)}
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
                        })}
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
