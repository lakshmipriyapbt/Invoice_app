import React, { useState } from "react";
import { useNavigate } from "react-router";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import { jwtDecode } from "jwt-decode";
import { Modal, ModalBody, ModalHeader, ModalTitle } from "react-bootstrap";
import Loader from "../Loader"
import { Eye, EyeSlash } from "react-bootstrap-icons";
import { loginApi } from "../Axos";

const Login = () => {
    const { register, handleSubmit, formState: { errors } } = useForm({ defaultValues: { username: "", password: "" }, mode: "onChange" });
    //   const { setAuthUser } = useAuth();
    const navigate = useNavigate();
    const [passwordShown, setPasswordShown] = useState(false);
    const [loading, setLoading] = useState(false);
    const [showErrorModal, setShowErrorModal] = useState(false);
    const [errorMessage, setErrorMessage] = useState("");
    const togglePasswordVisibility = () => {
        setPasswordShown(!passwordShown);
    };

    const onSubmit = async (data) => {
        setLoading(true); // Set loading to true when the request starts
        try {
            const response = await loginApi(data)
            const token = response.data?.token;
            if (token) {
                try {
                    const decodedToken = jwtDecode(token);
                    const { sub: userId, roles: userRole, company, employeeId } = decodedToken;
                    //   setAuthUser({ userId, userRole, company, employeeId });

<<<<<<< Updated upstream

const Login = ({ setLoggedIn }) => {
  const [user, setUser] = useState('')
  const [load, setLoad] = useState(true)
  const { register, handleSubmit,getValues, formState: { errors },trigger } = useForm({
    defaultValues:{
      email:"",
      password: ""
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
  const emailValidation = (value) => {
    if (/[A-Z]/.test(value)) {
      return "Email cannot contain uppercase letters"; // Error message for uppercase letters
    }
    return /^[a-z]([a-z0-9._-]*[a-z0-9])?@[a-z]([a-z0-9.-]*[a-z0-9])?\.(com|in|net|gov|org|edu)$/.test(value) || "Invalid Email format";
  };
   
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

=======
                    toast.success("Login Successful");
                    console.log("Navigating to /main");
                    navigate("/main");
                } catch (decodeError) {
                    setErrorMessage("Failed to decode token. Ensure token is valid.");
                    setShowErrorModal(true);
                }
            } else {
                setErrorMessage("Unexpected response format. Token not found.");
                setShowErrorModal(true);
            }
        } catch (error) {
            if (error) {
                const errorMessage = error;
                setErrorMessage(errorMessage);
                setShowErrorModal(true);
            } else {
                setErrorMessage("Login failed. Please try again later.");
                setShowErrorModal(true);
            }
        } finally {
            setLoading(false); // Set loading to false after the request is completed
>>>>>>> Stashed changes
        }
    };
    const closeModal = () => {
        setShowErrorModal(false);
        setErrorMessage(""); // Clear error message when modal is closed
    };
    const handleEmailChange = (e) => {
        if (e.keyCode === 32) {
            e.preventDefault();
        }
<<<<<<< Updated upstream
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
                        validate: emailValidation, // Custom validation function
                        onChange: async (e) => {
                          e.target.value = e.target.value.trim(); // Trim whitespace
                          await trigger("email"); // Trigger validation
                        },
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
                          message: "Password Must Contain At least One Uppercase letter, One Lowercase letter, One number, And One Special Character."
                        },
                        onChange: async (e) => {
                          e.target.value = e.target.value.trim(); // Trim whitespace
                          await trigger("password"); // Trigger validation
                        },
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
                     
=======
    };
    const validatePassword = (value) => {
        const errors = [];
        if (!/(?=.*[0-9])/.test(value)) {
            errors.push("at least one digit");
        }
        if (!/(?=.*[a-z])/.test(value)) {
            errors.push("at least one lowercase letter");
        }
        if (!/(?=.*[A-Z])/.test(value)) {
            errors.push("at least one uppercase letter");
        }
        if (!/(?=.*\W)/.test(value)) {
            errors.push("at least one special character");
        }
        if (value.includes(" ")) {
            errors.push("no spaces");
        }
        if (errors.length > 0) {
            return `Password must contain ${errors.join(", ")}.`;
        }
        return true;
    };
    return (
        <div className="main-wrapper">
            {loading && <Loader/>}
            <div className="auth-wrapper d-flex justify-content-center align-items-center" style={{ backgroundColor: "#11375B" }}>
                <div className="auth-box border-top border-secondary" style={{ backgroundColor: "#fefef" }} >
                    <div id="loginform">
                        <div className="text-center p-t-20 p-b-20">
                            <span className="db"><img src="assets/images/pathbreaker_logo.png" style={{ height: "80px", width: "300px", marginBottom: "18px" }} alt="logo" /></span>
                        </div>
                        <form className="form-horizontal m-t-20" onSubmit={handleSubmit(onSubmit)}>
                            <div className="row p-b-30">
                                <div className="col-12">
                                    <div className="input-group-prepend">
                                        <label style={{ color: "orange" }}>Email Id</label>
                                    </div>
                                    <input className="form-control"
                                        type="email"
                                        placeholder="Email Id"
                                        autoComplete="off"
                                        onKeyDown={handleEmailChange}
                                        {...register("username", {
                                            required: "Email Id is Required.",
                                            pattern: {
                                                value: /^(?![0-9]+@)[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.(com|in|org|net|edu|gov)$/,
                                                message: "Invalid email Id format. Only .com, .in, .org, .net, .edu, .gov are allowed.",
                                            },
                                        })}
                                    />
                                    {errors.username && <p className="errorsMsg">{errors.username.message}</p>}
                                    <div className="input-group-prepend">
                                        <label style={{ color: "orange" }}>Password</label>
                                    </div>
                                    <div className="input-group">
                                        <input className="form-control" name="password" id="password" placeholder="Enter Password"
                                            onChange={handleEmailChange}
                                            type={passwordShown ? "text" : "password"}
                                            {...register("password", {
                                                required: "Enter Password",
                                                minLength: {
                                                    value: 8,
                                                    message: "Password must be at least 8 characters long"
                                                },
                                                validate: validatePassword,
                                            })}
                                        />
                                        <span
                                            onClick={togglePasswordVisibility}
                                            style={{ cursor: 'pointer', marginLeft: '10px', marginTop: '7px' }}
                                            aria-label={passwordShown ? "Hide password" : "Show password"}
                                        >
                                            {passwordShown ? <Eye size={20} /> : <EyeSlash size={20} />}
                                        </span>
                                    </div>
                                    {errors.password && ((<p className="errorsMsg">{errors.password.message}</p>))}
                                </div>
                            </div>
                            <div className="row border-secondary">
                                <div className="col-12">
                                    <div className="form-group">
                                        <div className="p-t-20">
                                            <button className="btn btn-success mt-3" style={{ marginLeft: "40%" }} >Login</button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </form>
>>>>>>> Stashed changes
                    </div>
                </div>
<<<<<<< Updated upstream
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
=======
            </div >
            {/* Error Modal */}
            < Modal
                show={showErrorModal}
                onHide={closeModal}
                centered
                style={{ zIndex: "1050" }}
                className="custom-modal"
            >
                <ModalHeader closeButton>
                    <ModalTitle className="text-center">Error</ModalTitle>
                </ModalHeader>
                <ModalBody className="text-center fs-bold">
                    {errorMessage}
                </ModalBody>
            </Modal >
        </div >
    );
};
export default Login;
>>>>>>> Stashed changes
