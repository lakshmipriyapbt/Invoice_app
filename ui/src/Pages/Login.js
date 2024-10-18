
import React, { useState, useEffect } from 'react'
import axios from 'axios';
import { useNavigate, } from 'react-router-dom';
import { useForm } from 'react-hook-form';
//import{ FontAwesomeIcon }from "@fortawesome/react-fontawesome";
import { Eye, EyeSlash } from 'react-bootstrap-icons';
//import { showSuccessNotification, showErrorNotification } from './Notifications';
import { Slide, toast } from 'react-toastify';
//import TopNav from './TopNav';
import Otp from './Otp';
import ModalOTP from './modalotp';
/*import PasswordInput from '../Components/passwordinput';*/



const Login = ({ setLoggedIn }) => {
  const [user, setUser] = useState('')
  const [load, setLoad] = useState(true)
  const { register, handleSubmit,getValues, formState: { errors } } = useForm({
    defaultValues:{
      email:""
    }
  })
  const navigate = useNavigate();
  const [passwordShown, setPasswordShown] = useState(false);
  // const togglePasswordVisiblity = () => {
  //   setPasswordShown(!passwordShown);
  // };
  const togglePasswordVisibility = () => {
    setPasswordShown(prevState => !prevState);
  };

  // const handlePasswordChange = (e) => {
  //   setPasswordShown(e.target.value);
  // };
   
  const onSubmit = (data) => {
    
    axios.post("http://122.175.43.71:8001/api/sendotp", data)
      .then((response) => {
        if (response.status === 200) {
          toast.success(response.data.data, {
            position: 'top-right',
            transition: Slide,
            hideProgressBar: true,
            theme: "colored",
            autoClose: 1000, // Close the toast after 3 seconds
           
          });
          setUser(response.data)
          setUser(true);
          console.log(response.data);
          navigate('/otp',{state:{email:data.email}});
        } else {
          toast.error(response.data.data, {
            position: 'middle-right',
            hideProgressBar: true,
            transition: Slide,
          });
          navigate('/')
          throw new Error('Invalid credentials');

        }
      })
      .catch((error) => {
        setLoad(false);

        if (error.response && error.response.status === 400) {
          // Handle the 400 Bad Request error
          // Access error details from error.response.data or error.response.status
          const errorMessage = error.response.data; // Assuming the server sends an error message
          toast.error(`${errorMessage}!`, {
            position: 'top-right',
            transition: Slide,
            hideProgressBar: true,
            theme: "colored",
            autoClose: 1000,
          });
        } else {
          // Handle other errors, e.g., server errors
          toast.error(error.message, {
            position: 'bottom-left',
            hideProgressBar: true,
            transition: Slide,
          });
        }
      });
  }
  
  const emailValue = getValues("email");
  //const [isAuthenticated, setIsAuthenticated] = useState(false);

  // useEffect(() => {
  //   // Check if the user is authenticated (e.g., by checking the presence of a token)
  //   const token = sessionStorage.getItem('token');
  //   setIsAuthenticated(!!token);
  // }, []);

  // const handleLogin = (token) => {
  //   // Set authentication status and save the token
  //   setIsAuthenticated(true);
  //   sessionStorage.setItem('token', token);
  // };

  // const handleLogOut = () => {
  //   // Clear authentication status and remove the token
  //   setIsAuthenticated(false);
  //   sessionStorage.removeItem('token');
  //   navigate('/')
  // };

  // useEffect(() => {
  //   const loggedInUser = localStorage.getItem("user");
  //   if (loggedInUser) {
  //     const foundUser = JSON.stringify(loggedInUser);
  //     setUser(foundUser);
  //   }
  // }, []);


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
                    <input className="form-control" name="email" type='text' id="email" defaultValue={emailValue} placeholder="Enter Email"
                      {...register("email", {
                        required: "Email is Required",
                        pattern: {
                          value: /^[a-z]([a-z0-9._-]*[a-z0-9])?@[a-z]([a-z0-9.-]*[a-z0-9])?\.(com|in|net|gov|org|edu)$/,
                          message: "Invalid Email"
                        }
                      })}
                    />
                  </div>
                  {errors.email && ((<p className="errorsMsg">{errors.email.message}</p>))}
                  <div className="input-group-prepend">
                    <label style={{ color: "orange" }}>Password</label>
                  </div>
                  <div className="input-group mb-3">
                    <input className="form-control" name="password" id="password" placeholder="Enter Password"
                      // onChange={handlePasswordChange}
                      type={passwordShown ? "text" : "password"}
                      {...register("password", {
                        required: "Enter Password",
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
                          message: "Password must contain at least one uppercase letter, one lowercase letter, one number, and one special character."
                        }
                      })}
                    />
                    <span
                      onClick={togglePasswordVisibility}
                      style={{ cursor: 'pointer', marginLeft: '10px',marginTop:'7px' }}
                      aria-label={passwordShown ? "Hide password" : "Show password"}
                    >
                      {passwordShown ? <Eye size={20} /> : <EyeSlash size={20} />}
                    </span>
                  </div>
                  {errors.password && ((<p className="errorsMsg">{errors.password.message}</p>))}
                  <button className="btn btn-info mt-1 mb-2" id="to-recover" type="button">Forgot password?</button>
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

export default Login;
