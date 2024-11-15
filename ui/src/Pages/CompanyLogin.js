import React, { useState, useEffect } from 'react'
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
//import{ FontAwesomeIcon }from "@fortawesome/react-fontawesome";
import { Eye, EyeSlash } from 'react-bootstrap-icons';
//import { showSuccessNotification, showErrorNotification } from './Notifications';
import { Slide, toast } from 'react-toastify';
//import TopNav from './TopNav';
import Otp from './Otp';
import ModalOTP from './modalotp';
/*import PasswordInput from '../Components/passwordinput';*/
import { jwtDecode } from 'jwt-decode';
import { CompanyloginApi } from '../Axos';
import Loader from '../Loader';


const CompanyLogin = ({ setLoggedIn }) => {
  const [user, setUser] = useState('')
  const [load, setLoad] = useState(false)
  const { register, handleSubmit, formState: { errors }, trigger } = useForm({
    defaultValues: {
      email: "",
      password: ""
    }
  })
  const navigate = useNavigate();
  const [passwordShown, setPasswordShown] = useState(false);

  const togglePasswordVisibility = () => {
    setPasswordShown(prevState => !prevState);
  };

//   const onSubmit = async(data) => {
//       try{
//         setLoad(true);
//         console.log('Sending login data:', data); // Debugging - log the data sent
//         const response = await CompanyloginApi(data)
//         console.log('API response:', response); // Debugging - log the response
//         if (response.status === 200) {
//           toast.success("Login successful!" ,{
//             position: 'top-right',
//             transition: Slide,
//             hideProgressBar: true,
//             theme: "colored",
//             autoClose: 2000, // Close the toast after 1 seconds
//           });
//           if (response.data) {
//             setUser(response.data); // Only set user if the response has data
//           }
//         //   setUser(response.data)
//         //   navigate('/otp',{state:{email:data.email}});
//         setTimeout(() => {
//             navigate('/otp', { state: { email: data.email } });
//           }, 2000); // Delay navigation for a smooth transition (matches toast autoClose time)
//         } else {
//             toast.error(response.data.data || "An error occurred during login.", {
//                 position: 'top-right',
//                 hideProgressBar: true,
//                 transition: Slide,
//               });
//         }
//       }
//        catch(error) {
//         console.error('Error occurred:', error); // Debugging - log the error
//         // Specific error handling based on status code
//     if (error.response) {
//         if (error.response.status === 400) {
//           // Handle Bad Request (400) errors
//           const errorMessage = error.response.data || "Bad Request! Please check your input.";
//           toast.error(errorMessage, {
//             position: 'top-right',
//             transition: Slide,
//             hideProgressBar: true,
//             theme: "colored",
//             autoClose: 2000,
//           });
//         } else if (error.response.status === 401) {
//           // Handle Unauthorized (401) errors
//           toast.error("Unauthorized! Invalid credentials.", {
//             position: 'top-right',
//             transition: Slide,
//             hideProgressBar: true,
//             theme: "colored",
//             autoClose: 2000,
//           });
//         } else {
//           // Generic error handling for other status codes
//           toast.error(error.response.data || "An unexpected error occurred.", {
//             position: 'bottom-left',
//             hideProgressBar: true,
//             transition: Slide,
//           });
//         }
//       } else {
//         // Handle network errors or if response is not available
//         toast.error(error.message || "Something went wrong. Please try again later.", {
//           position: 'bottom-left',
//           hideProgressBar: true,
//           transition: Slide,
//         });
//       }
//     } finally {
//       // Ensure to stop the loading state after the process (success or error)
//       setLoad(false);
//     }
//   };
const onSubmit = async (data) => {
    try {
      // Show loading state
      setLoad(true);
      console.log('Sending login data:', data); // Debugging - log the data sent
  
      // Call the API
      const response = await CompanyloginApi(data);
      console.log('API response:', response); // Debugging - log the response
  
      // Check if the response contains data
      if (response && response.data) {
        // Show success message and handle navigation
        toast.success("Login successful!", {
          position: 'top-right',
          transition: Slide,
          hideProgressBar: true,
          theme: "colored",
          autoClose: 2000, // Close the toast after 2 seconds
        });
  
        setUser(response.data); // Set user data from response
  
        // Delay navigation for a smooth transition (matches toast autoClose time)
        setTimeout(() => {
          navigate('/otp', { state: { email: data.email } });
        }, 2000);
  
      } else {
        // Show error if no data found in response
        handleError("An error occurred during login.");
      }
    } catch (error) {
      // Log error for debugging purposes
      console.error('Error occurred:', error);
  
      // If error is related to response from server
      if (error.response) {
        handleServerError(error.response);
      } else {
        // Handle network errors or other issues
        handleError(error.message || "Something went wrong. Please try again later.");
      }
    } finally {
      // Ensure loading state is stopped regardless of success or failure
      setLoad(false);
    }
  };
  
  // Function to handle server-side errors (e.g., invalid response or missing data)
  const handleServerError = (response) => {
    const { data, status } = response;
  
    // Extract error message from response data (if any)
    const errorMessage = data?.data || "An unexpected error occurred.";
  
    // Handle different server response status (not using status codes directly here)
    switch (status) {
      case 400:
        toast.error(errorMessage || "Bad Request! Please check your input.", {
          position: 'top-right',
          transition: Slide,
          hideProgressBar: true,
          theme: "colored",
          autoClose: 2000,
        });
        break;
      case 401:
        toast.error(errorMessage || "Unauthorized! Invalid credentials.", {
          position: 'top-right',
          transition: Slide,
          hideProgressBar: true,
          theme: "colored",
          autoClose: 2000,
        });
        break;
      default:
        toast.error(errorMessage, {
          position: 'bottom-left',
          hideProgressBar: true,
          transition: Slide,
        });
        break;
    }
  };
  
  // Function to handle general errors (network errors, etc.)
  const handleError = (message) => {
    toast.error(message, {
      position: 'bottom-left',
      hideProgressBar: true,
      transition: Slide,
    });
  };
   
return (
    <div className="main-wrapper">

      {load ? (
        <div className="preloader">
          <div className="lds-ripple">
            <div className="lds-pos" />
            {/* <div className="lds-pos" /> */}
          </div>
        </div>
      ) : ''}

      <div className="auth-wrapper d-flex justify-content-center align-items-center" style={{ backgroundColor: "#11375B" }}>
        <div className="auth-box border-top border-secondary" style={{ backgroundColor: "#fefef" }} >
          <div id="loginform">
            <div className="text-center p-t-20 p-b-20">
              <span className="db"><img src="assets/images/pathbreaker_logo.png" style={{ height: "80px", width: "300px", marginBottom: "18px" }} alt="logo" /></span>
            </div>
            {/* Form */}
            <form className="form-horizontal m-t-20" id="loginform" onSubmit={handleSubmit(onSubmit)} >
              <div className="row p-b-30">
                <div className="col-12">
                  <div className="input-group-prepend">
                    <label style={{ color: "orange" }}>Email</label>
                  </div>
                  <div className="input-group ">
                    <input className="form-control" name="email" type='text' id="email"  placeholder="Enter Email"
                      {...register("email", {
                        required: "Email is Required",
                        pattern: {
                          value: /^[a-z]([a-z0-9._-]*[a-z0-9])?@[a-z]([a-z0-9.-]*[a-z0-9])?\.(com|in|net|gov|org|edu)$/,
                          message: "Invalid Email"
                        },
                        onChange: async (e) => {
                          e.target.value = e.target.value.trim(); // Trim whitespace
                          await trigger("email"); // Trigger validation
                        },
                      })}
                    />
                  </div>
                  {errors.email && ((<p className="errorsMsg">{errors.email.message}</p>))}
                  <div className="input-group-prepend mt-3">
                    <label style={{ color: "orange" }}>Password</label>
                  </div>
                  <div className="input-group">
                    <input className="form-control" name="password" id="password" placeholder="Enter Password"
                      type={passwordShown ? "text" : "password"}
                      {...register("password", {
                        required: "Password is Required",
                        pattern: {
                          value: /^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])(?=.*\W)(?!.* ).{8,16}$/,
                          message: "Invalid password"
                        },
                        onChange: async (e) => {
                          e.target.value = e.target.value.trim(); // Trim whitespace
                          await trigger("password"); // Trigger validation
                        },
                      })}
                    />
                  </div>
                  {errors.password && ((<p className="errorsMsg">{errors.password.message}</p>))}
                  <span
                    onClick={togglePasswordVisibility}
                    style={{ cursor: 'pointer', marginLeft: '2px', marginBottom: '10px', color: "#000000" }}
                    aria-label={passwordShown ? "Hide password" : "Show password"}
                  >
                    {passwordShown ? <Eye size={16} /> : <EyeSlash size={16} />}
                  </span>

                  {/* <button className="btn btn-info mt-2 mb-2" id="to-recover" type="button">Forgot password?</button>
                  replaced the forgot password button with anchor element */}
                  <a href="/forgot-password" className="btn btn-link mt-1 mb-3 " style={{ color: "orange", textDecoration: "underline" }}>
                    Forgot password?
                  </a>
                </div>
              </div>
              <div className="row border-top border-secondary">
                <div className="col-12">
                  <div className="form-group">
                    <div className="p-t-20">
                      <button className="btn btn-success mt-3" style={{ marginLeft: "40%" }} >Login</button>

                    </div>
                  </div>
                </div>
              </div>
            </form>

            {/* <TopNav handleLogOut={handleLogOut}/> */}
          </div>

        </div>

      </div>

    </div>

  )
}

export default CompanyLogin;