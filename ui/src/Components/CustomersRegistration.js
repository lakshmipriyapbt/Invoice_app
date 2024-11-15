import React, { useState, useEffect } from 'react'
import { useForm } from 'react-hook-form'
import axios from 'axios'
import TopNav from '../Pages/TopNav'
import SideNav from '../Pages/SideNav'
import { Link, useNavigate, useLocation } from 'react-router-dom'
import Footer from '../Pages/Footer'
import { toast } from 'react-toastify';
import { CustomerPostApi, CustomerPatchApiById, CustomerGetApiById } from '../Axos';

const CustomersRegistration = () => {
  const [show, setShow] = useState("gst");
  const [update, setUpdate] = useState([])
  // const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const { register, handleSubmit, reset, trigger, formState: { errors } } = useForm();

  const onSubmit = async(data) => {
    if (location && location.state && location.state.id) {
      const res = await CustomerPatchApiById(location.state.id, data);
          toast.success(res.data.data, {  //Notification status
            position: 'top-right',
            autoClose: 1000, // Close the toast after 1 seconds
          });
          console.log(res.data.data);
          setUpdate(res.data.data);
    } else {
      const response = await CustomerPostApi(data);
          toast.success('Data Saved Successfully', {  //Notification status
            position: 'top-right',
            autoClose: 1000, // Close the toast after 1 seconds
          });
          console.log(response.data);
          console.log(data);
          navigate('/Customers')

        .catch((error) => {
          toast.error('Invalid Credentials', {  //Notification status
            position: 'top-right',
            autoClose: 1000, // Close the toast after 1 seconds
          });
          console.log('error occured');
        })
    }
  }
  useEffect(() => {
    const fetchCustomerData = async () => {
      try {
        if (location && location.state && location.state.id) {
          const response = await CustomerGetApiById(location.state.id);
          reset(response.data); // Populate form with customer data
          setUpdate(response.data); // Store fetched data in update state
          console.log(response.data);
        }
      } catch (error) {
        toast.error('Error fetching customer data', {  // Notification status
          position: 'top-right',
          autoClose: 1000,
        });
        console.error('Error fetching customer data:', error);
      }
    };
    fetchCustomerData();
  }, [location, reset]);

  const setGstType = async (event) => {
    setShow(event.target.value);
    console.log(event.target.value);
  }
  // custom validation function for customername
  const customernameValidation = (value) => {
    const regex = /^[A-Za-z\s]+$/;
    if (!regex.test(value)) {
      return "customername can only contain letters and spaces.";
    }
    if (value.length < 3) {
      return "customername must be at least 3 characters long.";
    }
    if (value.length > 60) {
      return "customername must not exceed 60 characters.";
    }
    return true;
  };

  // custom validation function for email
  const emailValidation = (value) => {
    if (/[A-Z]/.test(value)) {
      return "Email cannot contain uppercase letters";
    }
    return /^[a-z]([a-z0-9._-]*[a-z0-9])?@[a-z]([a-z0-9.-]*[a-z0-9])?\.(com|in|net|gov|org|edu)$/.test(value) || "Invalid Email format";
  };
  const preventWhitespace = (e) => {
    if (e.key === ' ') {
      e.preventDefault();
    }
  };
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
  const preventNumbers = (e) => {
    if (/[0-9]/.test(e.key)) {
      e.preventDefault();
    }
  }

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
                  <li className="breadcrumb-item"><Link to={'/'}>Home</Link></li>
                  <li className="breadcrumb-item"><Link to={'/Usersviews'}>Customers Details</Link></li>
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
            <div className="card">
              <form className="form-horizontal" onSubmit={handleSubmit(onSubmit)}>
                <div className="card-body">
                  <div className="form-group row">
                    <label htmlFor='gstTypeGST' className="col-sm-3 text-right control-label col-form-label">Customer Type</label>
                    <div className=' form-group row' onChange={setGstType}>
                      <input type="radio" name="gstType" id="gstType" value={"gst"} style={{ marginLeft: "150px" }} checked={show === "gst"}
                        {...register("gstType", {
                          required: "Please select your Type"
                        })}
                      />
                      <label htmlFor='gstTypeNonGST' className="text-right col-form-label ml-2">GST</label><br />
                      <input type="radio" name="gstType" id="gstType" value={"nongst"} checked={show === "nongst"} style={{ marginLeft: "300px" }}
                        {...register("gstType")}
                      />
                      <label htmlFor='gstType' className="text-right col-form-label ml-2" required>Non GST</label>
                    </div>
                  </div>


                  <div className="form-group row ">
                    <label htmlFor="customer" className="col-sm-3 text-right control-label col-form-label">Customer Name</label>
                    <div className="col-sm-9">
                      <input type="text" className="form-control" id="customer" name='customer' placeholder="Enter Customer Name "
                        {...register("customerName", {
                          required: "customer name is required",
                          validate: (value) => {
                            const trimmedValue = value.trim();
                            const customernameValidationResult = customernameValidation(trimmedValue); // Call the validation function
                            if (customernameValidationResult !== true) {
                              return customernameValidationResult; // Return error message if validation fails
                            }
                            // Check that the trimmed value has at least one character,and allows one space after the first character.
                            return /^(\S+ ?)$/.test(trimmedValue);
                          },
                          onChange: async (e) => {
                            const trimmedValue = e.target.value.trimStart(); // Trim whitespace
                            e.target.value = trimmedValue.replace(/ {2,}/g, ' ');
                            await trigger("customer"); // Trigger validation
                          },
                        })}
                      />
                    </div>
                    {errors.customer && <p className='errorsMsg ' id='errorMsg'>{errors.customer.message}</p>}
                  </div>
                  <div className="form-group row">
                    <label htmlFor="email" className="col-sm-3 text-right control-label col-form-label">Email</label>
                    <div className="col-sm-9">
                      <input type="email" className="form-control" id="mail_id" name="mail_id" placeholder="Enter mail-id"
                        {...register("email", {
                          required: "Email is Required",
                          validate: emailValidation, // Custom validation function
                          onChange: async (e) => {
                            e.target.value = e.target.value.trim(); // Trim whitespace
                            await trigger("mail_id"); // Trigger validation
                          },
                        })}
                        onKeyPress={preventWhitespace}
                      />
                    </div>
                    {errors.mail_id && <p className="errorsMsg" id='errorMsg'>{errors.mail_id.message}</p>}
                  </div>
                  <div className="form-group row">
                    <label htmlFor="mobilenumber" className="col-sm-3 text-right control-label col-form-label">Mobile Number</label>
                    <div className="col-sm-9">
                      <input type="text" className="form-control" id="mobilenumber" name="mobilenumber" placeholder="Mobile Number"
                        {...register("mobileNumber", {
                          required: "Enter Mobile Number",
                          pattern: {
                            value: /^[6-9][0-9]{9}$/,
                            message: 'Enter valid Mobile Number',
                          },
                          onChange: async (e) => {
                            e.target.value = e.target.value.trim(); // Trim whitespace
                            await trigger("phone"); // Trigger validation
                          },
                        })}
                        onKeyPress={(e) => {
                          preventNonNumericCharacters(e);
                          handlePhoneChange(e);
                        }}
                      />
                    </div>
                    {errors.mobilenumber && (<p className='errorsMsg' id='errorMsg'>{errors.mobilenumber.message}</p>)}
                  </div>

                  <div className="form-group row">
                    <label htmlFor="address" className="col-sm-3 text-right control-label col-form-label">Address</label>
                    <div className="col-sm-9">
                      <textarea className="form-control" id='customer_address' name='customer_address'
                        {...register("address", {
                          required: "Address is Required",
                          maxLength: {
                            value: 250,
                            message: 'Address must be at most 250 characters long'
                          },
                          onChange: async (e) => {
                            const trimmedValue = e.target.value.trimStart(); // trim whitespaces
                            e.target.value = trimmedValue.replace(/ {2,}/g, ' ');
                            await trigger("customer_address"); //trigger validations
                          },
                        })}
                      />
                    </div>
                    {errors.customer_address && <p className='errorsMsg ' id='errorMsg'>{errors.customer_address.message}</p>}
                  </div>
                  <div className="form-group row">
                    <label htmlFor="state" className="col-sm-3 text-right control-label col-form-label">State</label>
                    <div className="col-sm-9">
                      <input type="text" className="form-control" id="state" name="state" placeholder="Enter State"
                        {...register("state", {
                          required: "State Name is Required.",
                          minLength: {
                            value: 3,
                            message: "Please enter valid State."
                          },
                          onChange: async (e) => {
                            const trimmedValue = e.target.value.trimStart(); // trim whitespaces
                            e.target.value = trimmedValue.replace(/ {2,}/g, ' ');
                            await trigger("state");  // trigger validation
                          }
                        })}
                        onKeyPress={preventNumbers}
                      />
                    </div>
                    {errors.state && (
                      <p className="errorsMsg" id='errorMsg'>{errors.state.message}</p>
                    )}
                  </div>
                  <div className="form-group row">
                    <label htmlFor="city" className="col-sm-3 text-right control-label col-form-label">City</label>
                    <div className="col-sm-9">
                      <input type="text" className="form-control" name="city" id="city" placeholder="Enter City"
                        {...register("city", {
                          required: "City name required.",
                          minLength: {
                            value: 3,
                            message: "Please enter valid City."
                          },
                          onChange: async (e) => {
                            const trimmedValue = e.target.value.trimStart(); // trim whitespaces
                            e.target.value = trimmedValue.replace(/ {2,}/g, ' ');
                            await trigger("city");  // trigger validation
                          }
                        })}
                        onKeyPress={preventNumbers}

                      />
                    </div>
                    {errors.city && (
                      <p className="errorsMsg" id='errorMsg'>{errors.city.message}</p>
                    )}
                  </div>
                  <div className="form-group row">
                    <label htmlFor="pincode" className="col-sm-3 text-right control-label col-form-label">Pin Code</label>
                    <div className="col-sm-9">
                      <input type="text" className="form-control" id="pin_code" name="pin_code" placeholder="Enter Pin"
                        {...register("pinCode", {
                          required: "Enter PinCode.",
                          minLength: {
                            value: 6,
                            message: "Please enter valid PinCode."
                          },
                          maxLength: {
                            value: 6,
                            message: "Please enter valid PinCode."
                          },
                          onChange: async (e) => {
                            e.target.value = e.target.value.trim(); // Trim whitespace
                            await trigger("pinCode"); // Trigger validation
                          },
                        })}
                        onKeyPress={preventNonNumericCharacters}
                      />
                    </div>
                    {errors.pin_code && (
                      <p className="errorsMsg" id='errorMsg'>{errors.pin_code.message}</p>
                    )}
                  </div>
                  {show === "gst" && (
                    <div className="form-group row">
                      <label htmlFor="gst" className="col-sm-3 text-right control-label col-form-label">Gst No</label>
                      <div className="col-sm-7">
                        <input type="text" className="form-control" id="gst_number" name="gst_number" placeholder="Enter Gst Number"
                          {...register("gstNo", {
                            required: "Enter GST Number",
                            pattern: {
                              value: /^[0-9]{2}[A-Z]{5}[0-9]{4}[A-Z][0-9]{1}[Z][A-Z0-9]$/,
                              message: "Invalid GST Number format. It should be in the format: 12ABCDE1234FZ1"
                            },
                            onChange: async (e) => {
                              e.target.value = e.target.value.trim(); // Trim whitespace
                              await trigger("gst_number"); // Trigger validation
                            },
                          })}
                        />
                      </div>
                      {errors.gst_number && (<p className='errorsMsg' id='errorMsg'>{errors.gst_number.message}</p>)}
                    </div>
                  )
                  }

                  <div className="form-group row">
                    <label htmlFor="stateCode" className="col-sm-3 text-right control-label col-form-label">State Code</label>
                    <div className="col-sm-9">
                      <input type="text" className="form-control" id="state_code" name="state_code" placeholder="Enter Pin"
                        {...register("stateCode", {
                          required: "Enter stateCode.",
                          minLength: {
                            value: 2,
                            message: "Please enter valid state code"
                          },
                          maxLength: {
                            value: 2,
                            message: "please enter valid state code"
                          },
                          onChange: async (e) => {
                            e.target.value = e.target.value.trim(); // Trim whitespace
                            await trigger("state_code"); // Trigger validation
                          },
                        })}
                        onKeyPress={preventNonNumericCharacters}
                      />
                    </div>
                    {errors.state_code && (
                      <p className="errorsMsg" id='errorMsg'>{errors.state_code.message}</p>
                    )}
                  </div>
                </div>


                <div className="border-top">
                  <div className="card-body">
                    <button type="submit" className="btn btn-primary" style={{ marginLeft: "450px" }}>Submit</button>
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

export default CustomersRegistration
