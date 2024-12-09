import React, { useState, useEffect, useRef, } from 'react';
import { useForm, Controller } from 'react-hook-form';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { CompanyImagePatchApi, companyUpdateByIdApi, companyViewByIdApi } from '../Axios';
import { Slide, toast } from 'react-toastify';
import TopNav from "../Pages/TopNav";
import SideNav from "../Pages/SideNav";
import Footer from '../Pages/Footer';
import { CameraFill, Eye, EyeSlash } from 'react-bootstrap-icons';
import { useAuth } from '../Context/AuthContext';
import { Button, Modal, ModalBody, ModalFooter, ModalHeader, ModalTitle } from 'react-bootstrap';

const CompanyProfile = () => {
    const { register, handleSubmit, formState: { errors }, control, trigger, setValue } = useForm();
    const [selectedFile, setSelectedFile] = useState(null);
    const [companyId, setCompanyId] = useState(null);
    const [isUpdating, setIsUpdating] = useState(false);
    const [errorMessage, setErrorMessage] = useState("");
    const [postImage, setPostImage] = useState(null);
    const fileInputRef = useRef(); // To reference the file input
    const [error, setError] = useState(null);
    const [successMessage, setSuccessMessage] = useState("");
    const [imgError, setImgError] = useState(null);
    const [passwordShown, setPasswordShown] = useState(false);
    const { user, logoFileName } = useAuth();
    const [showModal, setShowModal] = useState(false);
    console.log(user.companyId);
    const navigate = useNavigate();
    const location = useLocation();

    const togglePasswordVisiblity = () => {
        setPasswordShown(!passwordShown);
    };

    useEffect(() => {
        // Check if user.companyId exists before making the API call
        if (user.companyId) {
            const fetchCompanyDetails = async () => {
                try {
                    // Fetch the company details using the companyId
                    const response = await companyViewByIdApi(user.companyId);
                    console.log("Fetched company details for companyId:", user.companyId);

                    const companyData = response.data;
                    setIsUpdating(true);

                    // Prepopulate the form with the fetched data
                    setValue('userName', companyData.userName);
                    setValue('companyEmail', companyData.companyEmail);
                    setValue('phone', companyData.phone);
                    setValue('companyName', companyData.companyName);
                    setValue('serviceName', companyData.serviceName);
                    setValue('pan', companyData.pan);
                    setValue('gstNumber', companyData.gstNumber);
                    setValue('gender', companyData.gender);
                    setValue('accountNumber', companyData.accountNumber);
                    setValue('bankName', companyData.bankName);
                    setValue('branch', companyData.branch);
                    setValue('ifscCode', companyData.ifscCode);
                    setValue('address', companyData.address);
                    setValue('state', companyData.state);
                    setValue('password', companyData.password);
                    setSelectedFile(companyData.stampImage);
                } catch (error) {
                    toast.error('Failed to load company details.', {
                        position: 'top-right',
                        theme: "colored",
                        autoClose: 1000,
                        transition: Slide,
                    });
                }
            };

            fetchCompanyDetails();
        }
    }, [user.companyId, setValue]);

    const onSubmit = async (data) => {
        const formData = new FormData();
        formData.append("userName", data.userName);
        formData.append("companyEmail", data.companyEmail);
        formData.append("password", data.password);
        formData.append("phone", data.phone);
        formData.append("companyName", data.companyName);
        formData.append("serviceName", data.serviceName);
        formData.append("pan", data.pan);
        formData.append("gstNumber", data.gstNumber);
        formData.append("gender", data.gender);

        if (selectedFile) {
            console.log("Selected file :", selectedFile);  // For debugging, print the base64 string
            formData.append("stampImage", selectedFile);  // Append the base64 string, not the file object
        } else {
            console.log("No file selected");  // Handle case when no file is selected
        }

        formData.append("accountNumber", data.accountNumber);
        formData.append("bankName", data.bankName);
        formData.append("branch", data.branch);
        formData.append("ifscCode", data.ifscCode);
        formData.append("address", data.address);
        formData.append("state", data.state);

        try {
            if (user.companyId) {
                const response = await companyUpdateByIdApi(user.companyId, formData);
                console.log(user.companyId);

                toast.success('Company updated successfully', {
                    position: 'top-right',
                    theme: "colored",
                    autoClose: 1000,
                    transition: Slide,
                });

                console.log(response.data);  // Log the response data
                navigate('/main');  // Redirect to another page after successful update
            } else {
                // If there's no companyId, show an error
                toast.error('No company ID provided for update', {
                    position: 'top-right',
                    theme: "colored",
                    autoClose: 1000,
                    transition: Slide,
                });
            }
        } catch (error) {
            console.error('Error:', error);
            toast.error('An error occurred during the update', {
                position: 'top-right',
                theme: "colored",
                autoClose: 1000,
                transition: Slide,
            });
        }
    };

    const preventNonNumericCharacters = (e) => {
        if (!/[0-9]/.test(e.key)) {
            e.preventDefault();
        }
    };

    const handlePhoneChange = (e) => {
        const value = e.target.value;
        if (value.length === 0 && /^[0-5]$/.test(e.key)) {
            e.preventDefault();
        }
        if (value.length >= 10) {
            e.preventDefault();
        }
    };

    const preventNonAlphabets = (e) => {
        if (!/^[a-zA-Z\s]*$/.test(e.key)) {
            e.preventDefault();
        }
    };

    const emailValidation = (value) => {
        const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
        if (!emailPattern.test(value)) {
            return "Please enter a valid email address.";
        }
        return true;
    };

    const handleInputChange = async (e, triggerField, allowSpecialChars = false) => {
        let value = e.target.value;
        value = value.trimStart();
        value = value.replace(/ {2,}/g, ' ');
        if (value && value.length > 0) {
            value = value.charAt(0).toUpperCase() + value.slice(1);
        }
        value = value.replace(/(\s[a-z])/g, (match) => match.toUpperCase());
        if (allowSpecialChars) {
            value = value.replace(/[^a-zA-Z0-9\s\/\-,]/g, '');
        } else {
            value = value.replace(/[^a-zA-Z0-9\s]/g, '');
        }
        setValue(triggerField, value);
        await trigger(triggerField);
    };

    const handleFileChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            setSelectedFile(file);  // Store the file object directly
        }
    };

    const onChangePicture = (e) => {
        const file = e.target.files[0]; // Get the selected file
        // Check if no file is selected
        if (!file) {
            setImgError("No file selected.");
            return; // Stop processing if no file is selected
        }
        // Check file size (limit to 200KB)
        if (file.size > 200 * 1024) {
            setImgError("File size must be less than 200KB.");
            return; // Stop further processing if size exceeds limit
        }
        // Check file type (valid image types and PDF)
        const validTypes = ["image/png", "image/jpeg", "image/svg+xml"];
        if (!validTypes.includes(file.type)) {
            setImgError("Only .png, .jpg, .jpeg, .svg files are allowed.");
            return; // Stop further processing if the type is invalid
        }
        // If the file is valid, clear previous errors and update the state
        setImgError(''); // Clear error messages
        setPostImage(file); // Store the selected file
        console.log("File is valid and ready for upload:", file);
    };

    const handleCloseUploadImageModal = () => {
        setPostImage(null);
        setShowModal(false);
        setErrorMessage("");
    };

    const handleLogoSubmit = async (e) => {
        e.preventDefault(); // Prevent form default action
        if (!user.companyId) return;
        if (!postImage) {
            setErrorMessage("Logo is Required");
            return;
        }
        try {
            const formData = new FormData();
            formData.append("image", "string");
            formData.append("file", postImage);
            await CompanyImagePatchApi(user.companyId, formData);
            setPostImage(null);
            setSuccessMessage("Logo updated successfully.");
            toast.success("Company Logo Updated Successfully");
            setErrorMessage('');
            setImgError(''); // Clear image error if everything goes fine
            closeModal();
            setTimeout(() => {
                window.location.href = "/main";
            }, 2000);
        } catch (err) {
            console.error("Logo update error:", err);
            setSuccessMessage('');
            toast.error("Failed To Update Logo");
            setError(err);
        }
    };

    const openModal = () => setShowModal(true);
    const closeModal = () => setShowModal(false);

    return (
        <div id="main-wrapper" data-sidebartype="mini-sidebar">
            <TopNav />
            <SideNav />
            <div className="page-breadcrumb" style={{ width: "78%", marginLeft: "280px", marginTop: "20p" }}>
                <div className="row">
                    <div className="col-12 d-flex no-block align-items-center">
                        <h4 className="page-title" style={{ color: "blue" }}>Profile</h4>
                    </div>
                </div>
            </div>
            <div className='container-fliuid'>
                <div className="row">
                    <div className='col-md-9 ' style={{ marginLeft: "300px", marginTop: "40px" }}>
                        <div className="col-12">
                            <div className="card">
                                <div className="card-header">
                                    <h5 className="card-title" style={{ marginBottom: "0px" }}>Add Company Logo</h5>
                                </div>
                                <div className="card-body">
                                    <div className="row">
                                        <div className="col-12 col-md-6 mb-3">
                                            <div
                                                style={{
                                                    position: "relative",
                                                    fontSize: "50px",
                                                    cursor: "pointer",
                                                    marginRight: "80%",
                                                }}
                                                onClick={openModal}
                                            >
                                                <div
                                                    style={{
                                                        position: "relative",
                                                        justifyContent: "center",
                                                    }}
                                                >
                                                    <CameraFill />
                                                </div>
                                            </div>
                                            <span className="text-info align-start">Max-Size=200 KB </span>
                                        </div>
                                        <div className="col-12 col-md-6 mb-3">
                                            {logoFileName && (
                                                <img
                                                    className="align-middle"
                                                    src={`${logoFileName}`}
                                                    accept=".png, .jpg. ,svg ,.jpeg,"
                                                    alt="Company Logo"
                                                    style={{ height: "80px", width: "200px" }}
                                                />
                                            )}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className='container-fliuid'>
                <div className='row'>
                    <div className='col-md-9 ' style={{ marginLeft: "300px", marginTop: "40px" }}>
                        <form className="form-horizontal" onSubmit={handleSubmit(onSubmit)} encType='multipart/form-data'>
                            <div className="card">
                                <div className="card-body">
                                    <h3 className="card-title" style={{ marginLeft: "10px", marginTop: "10px" }}>Admin Info</h3>
                                    <div className='form row mt-4'>
                                        <div className="form-group col-md-6">
                                            <label htmlFor="fname" className="col-sm-4 text-left control-label col-form-label">User Name</label>
                                            <input type="text" className="form-control" name="userName" id="userName" placeholder="Enter User Name Name"
                                                {...register("userName", {
                                                    required: "User Name is Required",
                                                    minLength: {
                                                        value: 3,
                                                        message: "userName must be at least 3 characters long"
                                                    },
                                                    maxLength: {
                                                        value: 60,
                                                        message: "userName must not exceed 60 characters."
                                                    },
                                                })}
                                                onChange={(e) => handleInputChange(e, "userName")}
                                                onKeyPress={preventNonAlphabets}
                                            />
                                            {errors.userName && <p className='errorsMsg '>{errors.userName.message}</p>}
                                        </div>
                                        <div className="form-group col-md-6">
                                            <label htmlFor="companyEmail" className="col-sm-4 text-left control-label col-form-label">Email</label>
                                            <input type="email" className="form-control" name="companyEmail" id="companyEmail" placeholder="Enter Email Id"
                                                {...register("companyEmail", {
                                                    required: "Email is Required",
                                                    validate: emailValidation, // Custom validation function
                                                    onChange: async (e) => {
                                                        e.target.value = e.target.value.trim(); // Trim whitespace
                                                        await trigger("companyEmail"); // Trigger validation
                                                    },
                                                })}
                                                onKeyPress={(e) => {
                                                    if (e.key === ' ') {
                                                        e.preventDefault();
                                                    }
                                                }}
                                            />
                                            {errors.companyEmail && <p className="errorsMsg">{errors.companyEmail.message}</p>}
                                        </div>
                                    </div>
                                    <div className='form row'>
                                        <div className="form-group col-md-6" style={{ paddingRight: "40px" }}>
                                            <label htmlFor="password" className="col-sm-4 text-left control-label col-form-label">Password</label>
                                            <div className="input-group">
                                                <input
                                                    type={passwordShown ? "text" : "password"}
                                                    className="form-control"
                                                    name="password"
                                                    id="password"
                                                    placeholder="Enter Password"
                                                    {...register("password", {
                                                        required: "Password is Required",
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
                                                <div className="input-group-append">
                                                    <span className="input-group-text" onClick={togglePasswordVisiblity} style={{ cursor: 'pointer' }}>
                                                        {passwordShown ? <Eye size={20} /> : <EyeSlash size={20} />}
                                                    </span>
                                                </div>
                                            </div>
                                            {errors.password && <p className="errorsMsg">{errors.password.message}</p>}
                                        </div>
                                        <div className="form-group col-md-6">
                                            <label htmlFor="phone" className="col-sm-4 text-left control-label col-form-label">Phone</label>
                                            <input
                                                type="tel"
                                                className="form-control"
                                                name="phone"
                                                id="phone"
                                                placeholder="Enter Phone Number"
                                                {...register("phone", {
                                                    required: "Mobile Number is Required",
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
                                            {errors.phone && <p className='errorsMsg'>{errors.phone.message}</p>}
                                        </div>
                                    </div>
                                    <div className="form-row">
                                        <div className="form-group col-md-6">
                                            <label htmlFor="companyName" className="col-sm-4 text-left control-label col-form-label">Company Name</label>
                                            <input type="text" className="form-control" name="companyName" id="companyName" placeholder="Enter Company Name"
                                                {...register("companyName", {
                                                    required: "Company Name is Required",
                                                })}
                                                onChange={(e) => handleInputChange(e, "companyName", false)}
                                                onKeyPress={preventNonAlphabets}
                                            />
                                            {errors.companyName && <p className='errorsMsg '>{errors.companyName.message}</p>}
                                        </div>
                                        <div className="form-group col-md-6">
                                            <label htmlFor="serviceName" className="col-sm-4 text-left control-label col-form-label">Service Name</label>
                                            <input type="text" className="form-control" name="serviceName" id="serviceName" placeholder="Enter Service Name"
                                                {...register("serviceName", {
                                                    required: "Service Name is Required",
                                                    onChange: async (e) => {
                                                        const trimmedValue = e.target.value.trimStart(); // Trim whitespace
                                                        e.target.value = trimmedValue.replace(/ {2,}/g, ' ');
                                                        await trigger("serviceName"); // Trigger validation
                                                    },
                                                })}
                                                onKeyPress={(e) => {
                                                    if (e.key === ' ') {
                                                        e.preventDefault();
                                                    }
                                                    if (!/[a-z]/.test(e.key)) {
                                                        e.preventDefault(e)
                                                    }
                                                }}
                                            />
                                            {errors.serviceName && <p className='errorsMsg '>{errors.serviceName.message}</p>}
                                        </div>
                                    </div>
                                    <div className='form-row'>
                                        <div className="form-group col-md-6">
                                            <label htmlFor="pan" className="col-sm-4 text-left control-label col-form-label">Pan</label>
                                            <input type="text" className="form-control" name="pan" id="pan" placeholder="Enter Pan Card Number"
                                                {...register("pan", {
                                                    required: "Pan Number is Required.",
                                                    maxLength: {
                                                        value: 10,
                                                        message: "Pan Number must not exceed 10 characters"
                                                    },
                                                    pattern: {
                                                        value: /^[A-Z]{5}[0-9]{4}[A-Z]{1}$/,
                                                        message: "Invalid PAN format. It should be in the format: ABCDE1234F"
                                                    },
                                                    onChange: async (e) => {
                                                        e.target.value = e.target.value.trim(); // Trim whitespace
                                                        await trigger("pan"); // Trigger validation
                                                    },
                                                })}
                                            />
                                            {errors.pan && (
                                                <p className="errorsMsg">{errors.pan.message}</p>
                                            )}
                                        </div>
                                        <div className="form-group col-md-6">
                                            <label htmlFor="gstNumber" className="col-sm-4 text-left control-label col-form-label">GST-Number</label>
                                            <input type="text" className="form-control" name="gstNumber" id="gstNumber" placeholder="Enter GST Number"
                                                {...register("gstNumber", {
                                                    required: "GST Number is Required",
                                                    maxLength: {
                                                        value: 15,
                                                        message: "GST-Numbe must not exceed 15 characters"
                                                    },
                                                    pattern: {
                                                        value: /^[0-9]{2}[A-Z]{5}[0-9]{4}[A-Z][0-9]{1}[Z][A-Z0-9]$/,
                                                        message: "Invalid GST Number format. It should be in the format: 12ABCDE1234F1Z1"
                                                    },
                                                    onChange: async (e) => {
                                                        e.target.value = e.target.value.trim(); // Trim whitespace
                                                        await trigger("gstNumber"); // Trigger validation
                                                    },
                                                })}
                                            />
                                            {errors.gstNumber && (<p className='errorsMsg'>{errors.gstNumber.message}</p>)}
                                        </div>
                                    </div>
                                    <div className='form-row'>
                                        <div className=' form-group col-md-6'>
                                            <label htmlFor="gender" className="col-sm-4 text-left control-label col-form-label">Gender</label>
                                            <div>
                                                <input type="radio" name="gender" id="genderMale" value="male" style={{ marginLeft: "8px" }}
                                                    {...register("gender", {
                                                        required: "Please select your gender"
                                                    })}
                                                />
                                                <label htmlFor='genderMale' className="text-left col-form-label ml-2">Male</label>

                                                <input type="radio" name="gender" id="genderFemale" value="female" style={{ marginLeft: "10px" }}
                                                    {...register("gender")} />
                                                <label htmlFor='genderFemale' className="text-left  col-form-label ml-2" required>Female</label>

                                                <input type="radio" name="gender" id="genderOthers" value="others" style={{ marginLeft: "10px" }}
                                                    {...register("gender")} />
                                                <label htmlFor='genderOthers' className="text-left col-form-label ml-2" required>Others</label>
                                            </div>
                                            {errors.gender && <p className="errorsMsg">{errors.gender.message}</p>}
                                        </div>
                                        <div className="form-group col-md-6" style={{ paddingRight: "40px" }}>
                                            <label htmlFor="stampImage" className="col-sm-4 text-left control-label col-form-label">Stamp & Sign</label>
                                            <div className="custom-file">
                                                <Controller
                                                    name="stampImage"
                                                    control={control}
                                                    defaultValue={selectedFile || null} // Set the default value to the existing file
                                                    render={({ field }) => (
                                                        <div>
                                                            <input
                                                                type="file"
                                                                className="custom-file-input"
                                                                id="stampImage"
                                                                ref={fileInputRef} // Reference for clearing the input
                                                                onChange={(e) => {
                                                                    const file = e.target.files[0];
                                                                    if (file) {
                                                                        const fileName = file.name;
                                                                        setSelectedFile(fileName);
                                                                        field.onChange(fileName);
                                                                        console.log("Selected file:", fileName);
                                                                    } else {
                                                                        setSelectedFile(null); // Clear state if no file is selected
                                                                        field.onChange(null); // Pass null to the Controller's field
                                                                        console.log('No file selected');
                                                                    }
                                                                }}
                                                            />
                                                            <label className="custom-file-label" htmlFor="stampImage">
                                                                {selectedFile || "Choose file..."}
                                                            </label>
                                                        </div>
                                                    )}
                                                    rules={{
                                                        required: selectedFile ? false : "Please upload a stamp and signature", // Validation only if no file exists
                                                    }}
                                                />
                                                {errors.stampImage && <p className="errorsMsg">{errors.stampImage.message}</p>}
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="card">
                                <div className="card-body">
                                    <h3 className="card-title " style={{ marginLeft: "10px", marginTop: "15px" }}>Bank Details</h3>
                                    <div className='form-row mt-4'>
                                        <div className="form-group col-md-6">
                                            <label htmlFor="accountNumber" className="col-sm-4 text-left control-label col-form-label">Bank Account</label>
                                            <input type="text" className="form-control" name="accountNumber" id="accountNumber" placeholder="Enter Bank Account Number"
                                                {...register("accountNumber", {
                                                    required: "Account Number is Required",
                                                    minLength: {
                                                        value: 9,
                                                        message: 'Bank Account Number must be at least 9 characters long',
                                                    },
                                                    maxLength: {
                                                        value: 18,
                                                        message: 'Bank Account Number must be at most 18 characters long'
                                                    },
                                                    onChange: async (e) => {
                                                        e.target.value = e.target.value.trim(); // Trim whitespace
                                                        await trigger("accountNumber"); // Trigger validation
                                                    },
                                                })}
                                                onKeyPress={preventNonNumericCharacters}
                                            />
                                            {errors.accountNumber && (<p className='errorsMsg'>{errors.accountNumber.message}</p>)}
                                        </div>
                                        <div className="form-group col-md-6">
                                            <label htmlFor="bankname" className="col-sm-4 text-left control-label col-form-label">Bank Name</label>
                                            <input type="text" className="form-control" name="bankName" id="bankName" placeholder="Enter Bank Name"
                                                {...register("bankName", {
                                                    required: "Bank Name is Required",
                                                })}
                                                onChange={(e) => handleInputChange(e, "bankName", false)}
                                                onKeyPress={preventNonAlphabets}
                                            />
                                            {errors.bankName && <p className='errorsMsg '>{errors.bankName.message}</p>}
                                        </div>
                                    </div>
                                    <div className='form-row'>
                                        <div className="form-group col-md-6">
                                            <label htmlFor="Branch" className="col-sm-4 text-left control-label col-form-label">Branch</label>
                                            <input type="text" className="form-control" name="branch" id="branch" placeholder="Enter Branch Name"
                                                {...register("branch", {
                                                    required: "Branch Name is Required",
                                                })}
                                                onChange={(e) => handleInputChange(e, "branch", false)}
                                                onKeyPress={preventNonAlphabets}
                                            />
                                            {errors.branch && <p className='errorsMsg '>{errors.branch.message}</p>}
                                        </div>
                                        <div className="form-group col-md-6">
                                            <label htmlFor="ifsc" className="col-sm-4 text-left control-label col-form-label"> IFSC Code</label>
                                            <input type="text" className="form-control" name="ifscCode" id="ifscCode" placeholder="Enter IFSC CODE"
                                                {...register("ifscCode", {
                                                    required: "IFSC Code is Required",
                                                    minLength: {
                                                        value: 11,
                                                        message: 'IFSC Code must be 11 characters long',
                                                    },
                                                    maxLength: {
                                                        value: 11,
                                                        message: 'IFSC Code must be 11 characters long',
                                                    },
                                                    pattern: {
                                                        value: /^[A-Z]{4}0[A-Z0-9]{6}$/,
                                                        message: 'Invalid IFSC Code format. It should be in the format: AAAA0BBBBBB',
                                                    },
                                                    onChange: async (e) => {
                                                        e.target.value = e.target.value.trim(); // trim validations
                                                        await trigger("ifsc");  // trigger validation
                                                    }
                                                })}
                                            />
                                            {errors.ifscCode && (<p className='errorsMsg'>{errors.ifscCode.message}</p>)}
                                        </div>
                                    </div>
                                    <div className='form-row'>
                                        <div className="form-group col-md-6">
                                            <label htmlFor="state" className="col-sm-4 text-left control-label col-form-label">State</label>
                                            <input type="text" className="form-control" name="state" id="state" placeholder="Enter State"
                                                {...register("state", {
                                                    required: "State Name is Required",
                                                })}
                                                onChange={(e) => handleInputChange(e, "state", false)}
                                                onKeyPress={preventNonAlphabets}
                                            />
                                            {errors.state && <p className='errorsMsg '>{errors.state.message}</p>}
                                        </div>
                                        <div className="form-group col-md-6">
                                            <label htmlFor="lname" className="col-sm-4 text-left control-label col-form-label">Address</label>
                                            < textarea rows="3" cols="5" className="form-control" name="address" id="address" placeholder="Enter Address"
                                                {...register("address", {
                                                    required: "Address is Required",
                                                    maxLength: {
                                                        value: 250,
                                                        message: 'Address must be at most 250 characters long'
                                                    },
                                                })}
                                                onChange={(e) => handleInputChange(e, "address", true)}
                                            />
                                            {errors.address && <p className='errorsMsg '>{errors.address.message}</p>}
                                        </div>
                                    </div>
                                </div>
                            </div>
                            < Modal show={showModal} onHide={handleCloseUploadImageModal} style={{ zIndex: "1050" }
                            } centered >
                                <ModalHeader closeButton>
                                    <ModalTitle>Upload Logo</ModalTitle>
                                </ModalHeader>
                                <ModalBody>
                                    <input
                                        type="file"
                                        className="form-control"
                                        accept=".png, .jpg, .svg, .jpeg,"
                                        onChange={onChangePicture}
                                    />
                                    {errorMessage && <p className="text-danger pb-0" style={{ marginLeft: "2%" }}>{errorMessage}</p>}
                                </ModalBody>
                                <ModalFooter>
                                    <Button variant="secondary" onClick={handleCloseUploadImageModal}>
                                        Cancel
                                    </Button>
                                    <Button variant="primary" onClick={handleLogoSubmit}>
                                        Upload Logo
                                    </Button>
                                </ModalFooter>
                            </Modal >
                            <div className="border-top">
                                <div className="card-body">
                                    <button className="btn btn-primary bt-lg" style={{ marginLeft: "95%" }} type='submit'>Save</button>
                                </div>
                            </div>
                        </form>
                    </div>
                </div>
            </div >
            <Footer />
        </div >
    )
}
export default CompanyProfile;