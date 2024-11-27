import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { Eye, EyeSlash } from 'react-bootstrap-icons';
import { userForgotPassword } from '../Axios';

const UserForgotPassword = () => {
    const { register, handleSubmit, watch, getValues, formState: { errors, isSubmitting } } = useForm({ mode: "onChange" });
    const [step, setStep] = useState(1);
    const [email, setEmail] = useState('');
    const [passwordShown, setPasswordShown] = useState(false);
    const [newPasswordShown, setNewPasswordShown] = useState(false);
    const [confirmPasswordShown, setConfirmPasswordShown] = useState(false); const [otpShown, setOtpShown] = useState(false); // Separate state for OTP visibility
    const [loading, setLoading] = useState(false);
    const watchPassword = watch('password', '');
    const navigate = useNavigate();
    const company = localStorage.getItem("company");

    const onSubmit = async (data) => {
        setLoading(true);
        try {
            const formData = {
                useremail: data.useremail,
                newpassword: data.newpassword,
                confirmPassword: data.confirmPassword
            };
            const response = await userForgotPassword(formData);
            toast.success("Password Updated Successfully");
            console.log(response.data); // Handle API response as needed
            navigate(`/`);
        } catch (error) {
            handleApiErrors(error);
        } finally {
            setLoading(false);
        }
    };

    const handleApiErrors = (error) => {
        if (error.response && error.response.data && error.response.data.error && error.response.data.error.message) {
            const errorMessage = error.response.data.error.message;
            toast.error(errorMessage);
        } else {
            toast.error("Network Error !");
        }
        console.error(error.response);
    };

    const toggleNewPasswordVisibility = () => {
        setNewPasswordShown(!newPasswordShown);
        setConfirmPasswordShown(!confirmPasswordShown);
    };

    const handleEmailChange = (e) => {
        if (e.keyCode === 32) {
            e.preventDefault();
        }
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
        <div className="auth-wrapper d-flex justify-content-center align-items-center" style={{ backgroundColor: "#11375B" }}>
            <div className="auth-box border-top border-secondary" style={{ backgroundColor: "#fefef" }} >
                <div id="loginform">
                    <div className="text-center p-t-20 p-b-20">
                        <span className="db">Forgot Password</span>
                    </div>
                    <form onSubmit={handleSubmit(onSubmit)}>
                        <div className="row p-b-30">
                            <div className="col-12">
                                <div className="input-group-prepend">
                                    <label style={{ color: "orange" }}>Email Id</label>
                                </div>
                                <input
                                    className="form-control"
                                    name="useremail"
                                    id="useremail"
                                    placeholder="Enter your Company Email Id"
                                    autoComplete="off"
                                    onInput={toInputLowerCase}
                                    onKeyDown={handleEmailChange}
                                    {...register("useremail", {
                                        required: "Email Id is Required.",
                                        pattern: {
                                            value: /^(?![0-9]+@)[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.(com|in|org|net|edu|gov)$/,
                                            message: "Invalid Email Id Format",
                                        },
                                    })}
                                />
                            </div>
                            {errors.useremail && <p className="errorsMsg">{errors.useremail.message}</p>}
                        </div>
                        <div className="form-group mt-3">
                            <label style={{ color: "orange" }}>New Password</label>
                            <div className="input-group">
                                <input
                                    className="form-control"
                                    name="newpassword"
                                    id="newpassword"
                                    placeholder="Enter your new password"
                                    type={newPasswordShown ? "text" : "password"}
                                    {...register("newpassword", {
                                        required: "New Password is Required",
                                        minLength: {
                                            value: 6,
                                            message: "New Password must be at least 6 characters long",
                                        },
                                        pattern: {
                                            value: /^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])(?=.*\W)(?!.* ).{6,16}$/,
                                            message: "New Password must contain at least one number, one lowercase letter, one uppercase letter, and one special character.",
                                        },
                                    })}
                                />
                                <span className="input-group-text" onClick={toggleNewPasswordVisibility}>
                                    {newPasswordShown ? <Eye size={20} color="#4C489D" /> : <EyeSlash size={20} color="#4C489D" />}
                                </span>
                            </div>
                            {errors.newpassword && <p className="errorsMsg">{errors.newpassword.message}</p>}
                        </div>
                        <div className="form-group mt-3">
                            <label style={{ color: "orange" }}>Confirm Password</label>
                            <div className="input-group">
                                <input
                                    className="form-control"
                                    name="confirmPassword"
                                    id="confirmPassword"
                                    placeholder="Confirm your new password"
                                    type={confirmPasswordShown ? "text" : "password"}
                                    {...register("confirmPassword", {
                                        required: "Please confirm your password",
                                        validate: (value) => value === getValues("newpassword") || "The passwords do not match",
                                    })}
                                />
                                <span className="input-group-text" onClick={toggleNewPasswordVisibility}>
                                    {confirmPasswordShown ? <Eye size={20} color="#4C489D" /> : <EyeSlash size={20} color="#4C489D" />}
                                </span>
                            </div>
                            {errors.confirmPassword && <p className="errorsMsg">{errors.confirmPassword.message}</p>}
                        </div>

                        <div className="text-center mt-4 ">
                            <button className="btn btn-primary" type="submit" disabled={loading}>
                                {loading ? "Loading..." : "Submit"}
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    )
};

export default UserForgotPassword;
