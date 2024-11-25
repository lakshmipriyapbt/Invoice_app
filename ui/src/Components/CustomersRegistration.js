import React, { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import TopNav from '../Pages/TopNav';
import SideNav from '../Pages/SideNav';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import Footer from '../Pages/Footer';
import { toast } from 'react-toastify';
import { CustomerGetApiById, CustomerPatchApiById, CustomerPostApi } from '../Axios';

const CustomersRegistration = () => {
  const [show, setShow] = useState("gst");
  const navigate = useNavigate();
  const location = useLocation();
  const [isUpdating, setIsUpdating] = useState(false);
  const [update, setUpdate] = useState([]);
  const { register, handleSubmit, reset, formState: { errors } } = useForm();

  const onSubmit = (data) => {
    if (location && location.state && location.state.customerId) {
      CustomerPatchApiById(location.state.customerId, data)
        .then((res) => {
          toast.success(res.data.data, {
            position: 'top-right',
            autoClose: 1000,
          });
          setUpdate(res.data.data);
          navigate('/Customers');
        })
        .catch((error) => {
          toast.error('Error updating customer');
          console.log('Error updating customer:', error);
        });
    } else {
      CustomerPostApi(data)
        .then((response) => {
          toast.success('Customer added successfully', {
            position: 'top-right',
            autoClose: 1000,
          });
          navigate('/Customers');
        })
        .catch((error) => {
          toast.error('Error adding customer');
          console.log('Error occurred:', error);
        });
    }
  };

  useEffect(() => {
    if (location && location.state && location.state.customerId) {
      CustomerGetApiById(location.state.customerId)
        .then((response) => {
          console.log('Customer data:', response.data);
          reset(response.data);
          setIsUpdating(true);
          setShow(response.data.gstType || "gst");
        })
        .catch((error) => {
          console.error('Error fetching data:', error);
          toast.error('Error fetching customer data.');
        });
    }
  }, [location.state?.customerId, reset]);

  const setGstType = (event) => {
    setShow(event.target.value);
  };

  return (
    <div id="main-wrapper" data-sidebartype="mini-sidebar">
      <TopNav />
      <SideNav />
      <div className="page-breadcrumb" style={{ width: "78%", marginLeft: "280px", marginTop: "10px" }}>
        <div className="row mt-3">
          <div className="col-12 d-flex no-block align-items-center">
            <h4 className="page-title" style={{ color: "blue" }}>Customers Registration</h4>
            <div className="ml-auto text-right">
              <nav aria-label="breadcrumb">
                <ol className="breadcrumb">
                  <li className="breadcrumb-item"><a href='/main'>Home</a></li>
                  <li className="breadcrumb-item"><Link to={'/Usersviews'}>Customers</Link></li>
                  <li className="breadcrumb-item active" aria-current="page">Customers Registration</li>
                </ol>
              </nav>
            </div>
          </div>
        </div>
      </div>
      <div className='container-fliuid'>
        <div className='row'>
          <div className='col-md-9 ' style={{ marginLeft: "300px", marginTop: "50px" }}>
            <form className="form-horizontal" onSubmit={handleSubmit(onSubmit)}>
              <div className="card">
                <div className="card-body">
                <h4 className="card-title">Customer Info</h4>
                  {/* <div className="form-group row">
                    <label htmlFor='gstTypeGST' className="col-sm-3 text-right control-label col-form-label">Customer Type</label>
                    <div className=' form-group row' onChange={setGstType}>
                      <input type="radio" name="gstType" id="gstType" value="gst" checked={show === "gst"}
                        {...register("gstType", { required: "Please select your Type" })} />
                      <label htmlFor='gstTypeNonGST' className="text-right col-form-label ml-2">GST</label><br />
                      <input type="radio" name="gstType" id="gstType" value="nongst" checked={show === "nongst"}
                        {...register("gstType")} />
                      <label htmlFor='gstType' className="text-right col-form-label ml-2">Non GST</label>
                    </div>
                  </div> */}

                  {/* Customer Name */}
                  <div className='form row mt-4'>
                    <div className="form-group col-md-6">
                      <label htmlFor="customer" className="col-sm-4 text-left control-label col-form-label">Customer Name</label>
                      <input type="text" className="form-control" id="customerName" name="customerName" placeholder="Enter Customer Name"
                        {...register("customerName", { required: true })} />
                      {errors.customerName && <p className='errorsMsg '>Customer Name is Required.</p>}
                    </div>

                    {/* Email */}
                    <div className="form-group col-md-6">
                      <label htmlFor="email" className="col-sm-4 text-left control-label col-form-label">Email</label>
                      <input type="email" className="form-control" id="email" name="email" placeholder="Enter mail-id"
                        {...register("email", { required: "Email is Required", pattern: { value: /^[^@ ]+@[^@ ]+\.[^@ .]{2,}$/, message: "Invalid Email" } })} />
                      {errors.email && <p className="errorsMsg">{errors.email.message}</p>}
                    </div>
                  </div>
                  {/* Mobile Number */}
                  <div className='form row'>
                    <div className="form-group col-md-6">
                      <label htmlFor="mobileNumber" className="col-sm-4 text-left control-label col-form-label">Mobile Number</label>
                      <input type="text" className="form-control" id="mobileNumber" name="mobileNumber" placeholder="Mobile Number"
                        {...register("mobileNumber", { required: "Enter Mobile Number", minLength: { value: 10, message: 'Enter valid Mobile Number' } })} />
                      {errors.mobileNumber && <p className='errorsMsg'>{errors.mobileNumber.message}</p>}
                    </div>
                    {/* Address */}
                    <div className="form-group col-md-6">
                      <label htmlFor="address" className="col-sm-4 text-left control-label col-form-label">Address</label>
                      <textarea className="form-control" id="address" name="address"
                        {...register("address", { required: true })} />
                      {errors.address && <p className='errorsMsg '>Enter Address Required</p>}
                    </div>
                  </div>
                  {/* State */}
                  <div className="form-row">
                    <div className="form-group col-md-6">
                      <label htmlFor="state" className="col-sm-4 text-left control-label col-form-label">State</label>
                      <input type="text" className="form-control" id="state" name="state" placeholder="Enter State"
                        {...register("state", { required: "State Name is Required.", minLength: { value: 3, message: "Please enter valid State." } })} />
                      {errors.state && <p className="errorsMsg">{errors.state.message}</p>}
                    </div>
                    {/* City */}
                    <div className="form-group col-md-6">
                      <label htmlFor="city" className="col-sm-4 text-left control-label col-form-label">City</label>
                      <input type="text" className="form-control" name="city" id="city" placeholder="Enter City"
                        {...register("city", { required: "City name required.", minLength: { value: 3, message: "Please enter valid City." } })} />
                      {errors.city && <p className="errorsMsg">{errors.city.message}</p>}
                    </div>
                  </div>
                  {/* Pin Code */}
                  <div className="form-row">
                    <div className="form-group col-md-6">
                      <label htmlFor="pincode" className="col-sm-4 text-left control-label col-form-label">Pin Code</label>
                      <input type="text" className="form-control" id="pinCode" name="pinCode" placeholder="Enter Pin"
                        {...register("pinCode", { required: "Enter PinCode.", maxLength: { value: 6, message: "Please enter valid PinCode." } })} />
                      {errors.pinCode && <p className="errorsMsg">{errors.pinCode.message}</p>}
                    </div>

                    {/* GST Number (only for GST type) */}
                    {show === "gst" && (
                      <div className="form-group col-md-6">
                        <label htmlFor="gst" className="col-sm-4 text-left control-label col-form-label">Gst No</label>
                        <input type="text" className="form-control" id="gstNo" name="gstNo" placeholder="Enter Gst Number"
                          {...register("gstNo", { required: "Enter GST Number", minLength: { value: 12, message: 'Enter valid GST Number' } })} />
                        {errors.gstNo && <p className="errorsMsg">{errors.gstNo.message}</p>}
                      </div>
                    )}
                  </div>
                  {/* State Code */}
                  <div className="form-row">
                    <div className="form-group col-md-6">
                      <label htmlFor="stateCode" className="col-sm-4 text-left control-label col-form-label">State Code</label>
                      <input type="text" className="form-control" id="stateCode" name="stateCode" placeholder="Enter Pin"
                        {...register("stateCode", { required: "Enter stateCode.", maxLength: { value: 6, message: "Please enter valid stateCode." } })} />
                      {errors.stateCode && <p className="errorsMsg">{errors.stateCode.message}</p>}
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
                    {isUpdating ? "Update Customer" : "Add Customer"}
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div >
      <Footer />
    </div >
  );
};

export default CustomersRegistration;
