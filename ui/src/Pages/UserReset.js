import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { EyeSlash, Eye } from "react-bootstrap-icons";
import { Modal } from "react-bootstrap";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { userResetPassword } from "../Axios";

const UserReset = ({ companyName, onClose, show }) => {
    const { register, handleSubmit, formState: { errors }, getValues, reset } = useForm({ mode: "onChange" });
    const [oldPasswordShown, setOldPasswordShown] = useState(false);
    const [newPasswordShown, setNewPasswordShown] = useState(false);
    const [confirmPasswordShown, setConfirmPasswordShown] = useState(false);
    const [loading, setLoading] = useState(false);
    const [id, setEmployeeId] = useState(null);
    const [error, setError] = useState(null);
    const navigate = useNavigate();

    const toggleOldPasswordVisibility = () => {
        setOldPasswordShown(!oldPasswordShown);
    };

    const toggleNewPasswordVisibility = () => {
        setNewPasswordShown(!newPasswordShown);
        setConfirmPasswordShown(!confirmPasswordShown);
    };

    const onSubmit = async (data) => {
        const formData = {
            useremail: data.useremail,
            newpassword: data.newpassword,
            confirmPassword: data.confirmPassword,
        };

        try {
            setLoading(true);
            const response = await userResetPassword(formData);
            console.log('Password Reset Successful:', response.data);
            setLoading(false);
            onClose(); // Close modal or handle success state
            toast.success("Password Reset Successful");
            navigate("/");
        } catch (error) {
            handleApiErrors(error);
            setLoading(false);
        }
    };

    const handleApiErrors = (error) => {
        if (error.response && error.response.data && error.response.data.error && error.response.data.error.message) {
            const errorMessage = error.response.data.error.message;
            toast.error(errorMessage);
        } else {
            toast.error("Network Error!");
        }
        console.error(error.response);
    };

    const handleClose = () => {
        // Reset form fields
        reset();
        setLoading(false);
        setOldPasswordShown(false);
        setNewPasswordShown(false);
        setConfirmPasswordShown(false);
        setError(null);
        onClose(); // Call the original onClose function
    };

    const handleReset = () => {
        reset(); // Clear all input fields
        setOldPasswordShown(false);
        setNewPasswordShown(false);
        setConfirmPasswordShown(false);
        setError(null);
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

        <Modal
            show={show}
            onHide={handleClose}
            centered
            style={{ zIndex: "1050" }}
            backdrop="static"
            keyboard={false}
        >
            <Modal.Header closeButton>
                <Modal.Title>Reset Password</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <div>
                    <form onSubmit={handleSubmit(onSubmit)}>
                        {/* <div className="form-group mt-3">
                            <label className="form-label">Old Password</label>
                            <div className="input-group">
                                <input
                                    className="form-control"
                                    name="password"
                                    id="password"
                                    placeholder="Enter your old password"
                                    type={oldPasswordShown ? "text" : "password"}
                                    {...register("password", {
                                        required: "Old Password is Required",
                                        minLength: {
                                            value: 6,
                                            message: "Old Password must be at least 6 characters long",
                                        },
                                        pattern: {
                                            value: /^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])(?=.*\W)(?!.* ).{6,16}$/,
                                            message: "Old Password must contain at least one number, one lowercase letter, one uppercase letter, and one special character.",
                                        },
                                    })}
                                />
                                <span className="input-group-text" onClick={toggleOldPasswordVisibility}>
                                    {oldPasswordShown ? <EyeSlash size={20} color="#4C489D" /> : <Eye size={20} color="#4C489D" />}
                                </span>
                            </div>
                            {errors.password && (
                                <p className="errorMsg" style={{ marginLeft: "55px", marginBottom: "0" }}>
                                    {errors.password.message}
                                </p>
                            )}
                        </div> */}
                        <div className="form-group mt-3">
                            <label className="form-label">Email Id</label>
                            <div className="input-group">
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
                            <label className="form-label">New Password</label>
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
                            <label className="form-label">Confirm Password</label>
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
                            {/* <button className="btn btn-secondary me-2" type="button" onClick={handleReset}>
                                Reset
                            </button> */}
                            <button className="btn btn-primary" type="submit" disabled={loading}>
                                {loading ? "Loading..." : "Submit"}
                            </button>
                        </div>
                    </form>
                </div>
            </Modal.Body>
        </Modal>
    );
};

export default UserReset;
