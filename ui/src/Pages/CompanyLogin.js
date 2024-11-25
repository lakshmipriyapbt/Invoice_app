import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { Eye, EyeSlash } from 'react-bootstrap-icons';
import { Slide, toast } from 'react-toastify';
import { CompanyloginApi } from '../Axios';  // Ensure this API function is defined
import Loader from '../Loader';  // Ensure this component is defined

const CompanyLogin = ({ setLoggedIn }) => {
  const [user, setUser] = useState(null);
  const [load, setLoad] = useState(false);
  const { register, handleSubmit, formState: { errors }, trigger } = useForm();
  const navigate = useNavigate();
  const [passwordShown, setPasswordShown] = useState(false);

  // Toggle password visibility
  const togglePasswordVisibility = () => {
    setPasswordShown(prevState => !prevState);
  };

  // Show toast notifications for success or error messages
  const showToast = (message, type = 'success') => {
    toast[type](message, {
      position: 'top-right',
      transition: Slide,
      hideProgressBar: true,
      theme: 'colored',
      autoClose: 2000, // Show for 2 seconds
    });
  };

  // General error handler
  const handleError = (message) => {
    showToast(message, 'error');
  };

  // Handle successful login
  const handleSuccess = (data) => {
    setUser(data);
    console.log(data.companyEmail)
    showToast('Login successful!');
    setTimeout(() => {
      setLoad(false);
      navigate('/otp', { state: { companyEmail: data.companyEmail } });
    }, 1000);  // Delay navigation for smooth transition
  };

  // Handle form submission (login)
  const onSubmit = async (data) => {
    try {
      setLoad(true);  // Show loader while making the request
      const response = await CompanyloginApi(data); // Assuming this function makes the API call
      console.log(data);

      // If the response is successful, handle the success
      if (response && response.data) {
        handleSuccess({...response.data, companyEmail:data.companyEmail});
      } else {
        handleError('Login failed! Please try again.');
      }
    } catch (error) {
      setLoad(false);  // Hide loader on error

      // Handle network or server errors
      if (error.response) {
        const { status, data } = error.response;
        let errorMessage = data?.data || 'An unexpected error occurred.';
        
        // Handle specific server responses
        if (status === 400) {
          errorMessage = 'Bad Request! Please check your input.';
        } else if (status === 401) {
          errorMessage = 'Unauthorized! Invalid credentials.';
        }

        handleError(errorMessage);
      } else {
        handleError(error.message || 'Something went wrong. Please try again later.');
      }
    }
  };

  const companyEmailValidation = (value) => {
    if (/[A-Z]/.test(value)) {
      return "Email cannot contain uppercase letters";
    }
    return /^[a-z]([a-z0-9._-]*[a-z0-9])?@[a-z]([a-z0-9.-]*[a-z0-9])?\.(com|in|net|gov|org|edu)$/.test(value) || "Invalid Email format";
  };

  return (
    <div className="main-wrapper">
      {load && <Loader />} {/* Assuming Loader component handles the loader display */}

      <div className="auth-wrapper d-flex justify-content-center align-items-center" style={{ backgroundColor: '#11375B' }}>
        <div className="auth-box border-top border-secondary" style={{ backgroundColor: '#fefef' }}>
          <div className="text-center p-t-20 p-b-20">
            <span className="db">
              <img src="assets/images/pathbreaker_logo.png" style={{ height: '80px', width: '300px', marginBottom: '18px' }} alt="logo" />
            </span>
          </div>

          {/* Form */}
          <form className="form-horizontal m-t-20" onSubmit={handleSubmit(onSubmit)}>
            <div className="row p-b-30">
              <div className="col-12">
                <label style={{ color: 'orange' }}>Email</label>
                <div className="input-group">
                  <input
                    className="form-control"
                    name="email"
                    type="text"
                    id="email"
                    placeholder="Enter Email"
                    {...register('companyEmail', {
                      required: 'Email is required',
                      validate:companyEmailValidation,
                      onChange: async (e) => {
                        e.target.value = e.target.value.trim();
                        await trigger('companyEmail');
                      },
                    })}
                  />
                </div>
                {errors.companyEmail && <p className="errorsMsg">{errors.companyEmail.message}</p>}

                <label style={{ color: 'orange' }}>Password</label>
                <div className="input-group">
                  <input
                    className="form-control"
                    name="password"
                    id="password"
                    placeholder="Enter Password"
                    type={passwordShown ? 'text' : 'password'}
                    {...register('password', {
                      required: 'Password is required',
                      pattern: {
                        value: /^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])(?=.*\W)(?!.* ).{8,16}$/,
                        message: 'Password must contain at least 1 uppercase, 1 lowercase, 1 number, 1 special character and be 8-16 characters long.',
                      },
                      onChange: async (e) => {
                        e.target.value = e.target.value.trim();
                        await trigger('password');
                      },
                    })}
                  />
                </div>
                {errors.password && <p className="errorsMsg">{errors.password.message}</p>}
                
                {/* Toggle password visibility */}
                <span
                  onClick={togglePasswordVisibility}
                  style={{ cursor: 'pointer', marginLeft: '2px', marginBottom: '10px', color: '#000000' }}
                  aria-label={passwordShown ? 'Hide password' : 'Show password'}
                >
                  {passwordShown ? <Eye size={16} /> : <EyeSlash size={16} />}
                </span>

                <a href="/forgot-password" className="btn btn-link mt-1 mb-3" style={{ color: 'orange', textDecoration: 'underline' }}>
                  Forgot password?
                </a>
              </div>
            </div>

            <div className="row border-top border-secondary">
              <div className="col-12">
                <div className="form-group">
                  <div className="p-t-20">
                    <button className="btn btn-success mt-3" style={{ marginLeft: '40%' }} disabled={load}>
                      {load ? 'Logging in...' : 'Login'}
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default CompanyLogin;
