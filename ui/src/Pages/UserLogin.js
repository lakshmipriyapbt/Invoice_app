import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate, useParams } from "react-router-dom";
import { Bounce, toast } from "react-toastify";
import { Modal, ModalBody, ModalHeader, ModalTitle } from "react-bootstrap";
import { jwtDecode } from "jwt-decode";
import Loader from "../Loader";
import { Eye, EyeSlash } from "react-bootstrap-icons";
import { UserloginApi, ValidateUserOtp } from "../Axios";

const UserLogin = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    defaultValues: {
      useremail: "",
      password: "",
      otp: "",
    },
    mode: "onChange",
  });
  const token = sessionStorage.getItem("token");

  const validateEmail = (value) => {
    if (/[^a-zA-Z0-9@._-]{3,}/.test(value)) {
      return "Please enter a valid Email Id.";
    }
    return true;
  };

  // const { setAuthUser } = useAuth();
  const { company } = useParams();
  const navigate = useNavigate();
  const [passwordShown, setPasswordShown] = useState(false);
  const [otpSent, setOtpSent] = useState(false);
  const [loading, setLoading] = useState(false);
  const [showOtpField, setShowOtpField] = useState(false);
  const [showErrorModal, setShowErrorModal] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [otpTimeLimit, setOtpTimeLimit] = useState(56);
  const [otpExpired, setOtpExpired] = useState(false);

  const togglePasswordVisiblity = () => {
    setPasswordShown(!passwordShown);
  };

  useEffect(() => {
    localStorage.setItem("company", company);
  }, [company]);

  useEffect(() => {
    if (otpTimeLimit > 0) {
      const timer = setTimeout(() => {
        setOtpTimeLimit((prevTime) => prevTime - 1);
      }, 1000);
      return () => clearTimeout(timer);
    } else {
      setOtpExpired(true);
      setOtpSent(false);
    }
  }, [otpTimeLimit]);

  const sendOtp = (data) => {
    const payload = {
      useremail: data.useremail,
      password: data.password,
    };

    setLoading(true);
    UserloginApi(data)
      .then((response) => {
        const token = response.data?.token;
        if (token) {
          localStorage.setItem("token", token);
          const decodedToken = jwtDecode(token);
          const { sub: userId, roles: userRole, company, employeeId } = decodedToken;
          // setAuthUser({ userId, userRole, company, employeeId });
          toast.success("OTP Sent Successfully");
          setOtpSent(true);
          setOtpExpired(false);
          setOtpTimeLimit(56);
          setShowOtpField(true);
        } else {
          console.error('Token not found in response');
          setErrorMessage("Unexpected response format. Token not found.");
          setShowErrorModal(true);
        }
        setLoading(false);
      })
      .catch((error) => {
        setLoading(false);

        // Ensure we're accessing the error message properly
        const errorMessage = error.message || "Login failed. Please try again later.";
        console.error('sendOtp error:', errorMessage); // Log the error
        setErrorMessage(errorMessage);
        setShowErrorModal(true);
      });

  };

  const verifyOtpAndCompanyLogin = (data) => {
    const payload = {
      useremail: data.useremail,
      otp: data.otp,
      company: company,
    };
    setLoading(true);
    ValidateUserOtp(payload)
      .then((response) => {
        setLoading(false);
        toast.success("Login Successful", {
          position: "top-right",
          transition: Bounce,
          hideProgressBar: true,
          theme: "colored",
          autoClose: 2000,
        });
        setTimeout(() => {
          window.location.href = "/main";
        }, 2000);

      })
      .catch((error) => {
        setLoading(false);
        console.log("sendOtp", error)
        if (error.response && error.response.data && error.response.data.error) {
          const errorMessage = error.response.data.error.message;
          setErrorMessage(errorMessage);
          setShowErrorModal(true);
        } else {
          setErrorMessage("Login failed. Please try again later.");
          setShowErrorModal(true);
        }
        if (otpTimeLimit <= 0) {
          setOtpExpired(true);
          setOtpSent(true)
          setErrorMessage("OTP Expired. Please Login Again");
          setShowErrorModal(true);
        }
      });
  };

  const closeModal = () => {
    setShowErrorModal(false);
    setErrorMessage("");
  };

  const togglePasswordVisibility = () => {
    setPasswordShown(!passwordShown);
  };

  const handleEmailChange = (e) => {
    if (e.keyCode === 32) {
      e.preventDefault();
    }
  };

  const onSubmit = (data) => {
    if (otpSent && !otpExpired) {
      verifyOtpAndCompanyLogin(data);
    } else {
      sendOtp(data);
    }
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
    return true; // Return true if all conditions are satisfied
  };

  const toInputLowerCase = (e) => {
    const input = e.target;
    let value = input.value;
    // Remove leading spaces
    value = value.replace(/^\s+/g, '');

    // Initially disallow spaces if there are no non-space characters
    if (!/\S/.test(value)) {
      // If no non-space characters are present, prevent spaces
      value = value.replace(/\s+/g, '');
    } else {
      // Allow spaces if there are non-space characters
      value = value.toLowerCase();
      value = value.replace(/^\s+/g, ''); // Remove leading spaces
      const words = value.split(' ');
      const capitalizedWords = words.map(word => {
        return word.charAt(0).toLowerCase() + word.slice(1);
      });
      value = capitalizedWords.join(' ');
    }
    // Update input value
    input.value = value;
  };

  return (
    <div className="main-wrapper">
      {loading && <Loader />}
      <div className="auth-wrapper d-flex justify-content-center align-items-center" style={{ backgroundColor: "#11375B" }}>
        <div className="auth-box border-top border-secondary" style={{ backgroundColor: "#fefef" }} >
          <div id="loginform">
            <div className="text-center p-t-20 p-b-20">
              <span className="db"><img src="assets/images/pathbreaker_logo.png" style={{ height: "80px", width: "300px", marginBottom: "18px" }} alt="logo" /></span>
            </div>
            <div className="newLoginRightSecSelectLogin">
              <div className="loginBtn" style={{ textAlign: "center" }}><span>Continue with User login</span></div>
            </div>
            <form onSubmit={handleSubmit(onSubmit)}>
              <div className="row p-b-30">
                <div className="col-12">
                  <div className="input-group-prepend">
                    <label style={{ color: "orange" }}>Email Id</label>
                  </div>
                  <input class="form-control"
                    type="useremail"
                    name="email"
                    placeholder="Email Id"
                    autoComplete="off"
                    onInput={toInputLowerCase}
                    onKeyDown={handleEmailChange}
                    readOnly={otpSent}
                    {...register("useremail", {
                      required: "Email Id is Required.",
                      pattern: {
                        value: /^(?![0-9]+@)[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.(com|in|org|net|edu|gov)$/,
                        message: "Invalid Email Id Format",
                      },
                    })}
                  />
                  {errors.useremail && <p className="errorsMsg">{errors.useremail.message}</p>}
                </div>
              </div>
              {!otpSent && (
                <>
                  <div className="row p-b-30">
                    <div className="col-12">
                      <div className="input-group-prepend">
                        <label style={{ color: "orange" }}>Password</label>
                      </div>
                      <div className="input-group">
                        <input class="form-control"
                          name="password"
                          placeholder="Password"
                          onChange={handleEmailChange}
                          type={passwordShown ? "text" : "password"}
                          {...register("password", {
                            required: "Password is Required",
                            minLength: {
                              value: 6,
                              message: "Password must be at least 6 characters long",
                            },
                            validate: validatePassword,
                          })}
                        />
                        <div className="input-group-append">
                          <span className="input-group-text" onClick={togglePasswordVisiblity} style={{ cursor: 'pointer' }}>
                            {passwordShown ? <Eye size={20} /> : <EyeSlash size={20} />}
                          </span>
                        </div>                      </div>
                      {errors.password && <p className="errorsMsg">{errors.password.message}</p>}
                      <span toggle="#password-field" class="bi bi-eye-fill field-icon toggle-password"></span>
                      <small>
                        <a href="/userForgotPassword">Forgot Password?</a>
                      </small>
                    </div>
                  </div>
                </>
              )}
              {otpSent && !otpExpired && (
                <div className="row p-b-30">
                  <div className="col-12">
                    <div className="input-group-prepend">
                      <label style={{ color: "orange" }}>OTP</label>
                    </div>
                    <input class="form-control"
                      type="text"
                      name="otp"
                      id="otp"
                      placeholder="Enter Your OTP"
                      autoComplete="off"
                      {...register("otp", {
                        required: "OTP is Required.",
                        pattern: {
                          value: /^\d{6}$/,
                          message: "OTP must be 6 digits.",
                        },
                      })}
                    />
                    {errors.otp && <p className="errorsMsg">{errors.otp.message}</p>}
                  </div>
                </div>
              )}
              <div className="row border-secondary">
                <div className="col-12">
                  <div className="form-group">
                    <div className="p-t-20">
                      <button className="btn btn-success mt-3" style={{ marginLeft: "40%" }} >Sign in</button>
                    </div>
                  </div>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
      <Modal
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
      </Modal>
    </div >
  );
};

export default UserLogin;
