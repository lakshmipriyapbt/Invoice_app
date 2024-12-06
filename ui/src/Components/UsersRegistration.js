import React, { useState, useEffect } from 'react'
import SideNav from "../Pages/SideNav";
import TopNav from "../Pages/TopNav";
import { useForm, Controller } from 'react-hook-form';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import Footer from '../Pages/Footer';
import { Eye, EyeSlash } from 'react-bootstrap-icons';
import { Slide, toast } from 'react-toastify';
import Select from 'react-select';
import { UserGetApiById, UserPatchApiById, UserPostApi } from '../Axios';

const UserRegistration = (props) => {
    const navigate = useNavigate();
    const [data, setData] = useState([])
    const [isUpdating, setIsUpdating] = useState(false);
    const { register, handleSubmit, reset, setValue, trigger, control, formState: { errors } } = useForm();
    const location = useLocation();

    const [passwordShown, setPasswordShown] = useState(false);
    const togglePasswordVisiblity = () => {
        setPasswordShown(!passwordShown);
    };
     const handlePasswordChange = (e) => {
        const passwordValue = e.target.value;
        setPasswordShown(passwordValue); // Update the password visibility state

        // Update the form's password field and trigger validation
        setValue("password", passwordValue); 
        trigger("password"); // Trigger validation for password
    };
    const role = [
        { value: "Admin", label: "Admin", id: "Admin" },
        { value: "Employee", label: "Employee", id: "Employee" }
    ]

    const onSubmit = (data) => {
        delete data.role.value;
        delete data.role.label;
        if (location && location.state && location.state.userId) {
            UserPatchApiById(location.state.userId, data)
                .then((res) => {
                    toast.success('Updated Successfully', {
                        position: 'top-right',
                        transition: Slide,
                        hideProgressBar: true,
                        theme: "colored",
                        autoClose: 1000,
                    });
                    console.log(res.data);
                    setData(res.data);
                    navigate('/Usersviews')
                })
        } else {
            UserPostApi(data)
                .then((response) => {
                    toast.success("User Registered Sucessfully", {
                        position: 'top-right',
                        transition: Slide,
                        hideProgressBar: true,
                        theme: "colored",
                        autoClose: 1000,
                    });
                    console.log(response.data)
                    console.log(data);
                    navigate('/Usersviews')
                })
                .catch(error => {
                    toast.error(error, {  //Notification status
                        position: 'top-right',
                        transition: Slide,
                        hideProgressBar: true,
                        theme: "colored",
                        autoClose: 1000, // Close the toast after 1 seconds
                    });
                    console.log('error occured')
                });
        };
    }
    useEffect(() => {

        if (location && location.state && location.state.userId) {
            UserGetApiById(location.state.userId)
                .then((response) => {
                    console.log(response);
                    setIsUpdating(true);
                    reset(response);
                })
                .catch((error) => {
                    console.error('Error fetching data:', error);
                });
        }
    }, [])
    
    const validateField = (value, type) => {
        switch (type) {
            case 'email':
                const emailRegex = /^(?![0-9]+@)[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.(com|in|org|net|edu|gov)$/;
                if (/[A-Z]/.test(value)) return "Email cannot contain uppercase letters";
                return emailRegex.test(value) || "Invalid Email format";
    
            case 'userName':
                return value.length >= 3 && value.length <= 60 || "User name must be between 3 and 60 characters";
    
            case 'password':
                // Check for password length
                if (value.length < 8) {
                    return "Password must be at least 8 characters long";
                }
                const errors = [];

                if (!/(?=.*[0-9])/.test(value)) errors.push("at least one digit");
                if (!/(?=.*[a-z])/.test(value)) errors.push("at least one lowercase letter");
                if (!/(?=.*[A-Z])/.test(value)) errors.push("at least one uppercase letter");
                if (!/(?=.*\W)/.test(value)) errors.push("at least one special character");
                if (/\s/.test(value)) errors.push("no spaces allowed");
                // If there are any errors, return the corresponding message
                return errors.length === 0 || `Password must contain ${errors.join(", ")}.`;
    
            default:
                return true;
        }
    };
    
    const handleInputChange = (e, fieldName) => {
        let value = e.target.value.trimStart().replace(/ {2,}/g, ' ');
        if (fieldName !== "userEmail") {
            value = value.replace(/\b\w/g, (char) => char.toUpperCase());
        }
        setValue(fieldName, value);
        trigger(fieldName);
    };

    const preventInvalidInput = (e, type) => {
        const key = e.key;
        if (type === 'alpha' && /[^a-zA-Z\s]/.test(key)) e.preventDefault();
        if (type === 'whitespace' && key === ' ') e.preventDefault();
    };

    return (
        <div id="main-wrapper" data-sidebartype="mini-sidebar">
            <SideNav />
            <TopNav />
            <div className="page-breadcrumb" style={{ width: "78%", marginLeft: "280px", marginTop: "30px" }}>
                <div className="row">
                    <div className="col-12 d-flex no-block align-items-center">
                        <h4 className="page-title" style={{ color: "blue" }}>Users Registration</h4>
                        <div className="ml-auto text-right">
                            <nav aria-label="breadcrumb">
                                <ol className="breadcrumb">
                                    <li className="breadcrumb-item"><a href='/main'>Home</a></li>
                                    <li className="breadcrumb-item"><Link to={'/Usersviews'}>Users</Link></li>
                                    <li className="breadcrumb-item active" aria-current="page">Users Registration</li>
                                </ol>
                            </nav>
                        </div>
                    </div>
                </div>
            </div>
            <div className='container-fliuid'>
                <div className='row'>
                    <div className='col-md-9 ' style={{ marginLeft: "300px", paddingTop: "50px" }}>
                        <form className="form-horizontal" onSubmit={handleSubmit(onSubmit)}>
                            <div className="card">
                                <div className="card-body">
                                    <h4 className="card-title">User Info</h4>
                                    <div className='form row mt-4'>
                                        <div className="form-group col-md-6">
                                            <label htmlFor="fname" className="col-sm-4 text-left control-label col-form-label">User Name</label>
                                            <input type="text" className="form-control" name="userName" id="userName" placeholder=" Enter User Name"
                                                {...register("userName", {
                                                    required: "User Name is required",
                                                    validate: (value) => validateField(value, 'userName'),
                                                })}
                                                onChange={(e) => handleInputChange(e, "userName")}
                                                onKeyPress={(e) => preventInvalidInput(e, 'alpha')}
                                            />
                                            {errors.userName && (<p className='errorsMsg '>{errors.userName.message}</p>)}

                                        </div>
                                        <div className="form-group col-md-6">
                                            <label htmlFor="fname" className="col-sm-4 text-left control-label col-form-label">User Email</label>
                                            <input type="userEmail" className="form-control" name="userEmail" id="userEmail" placeholder=" Enter User MailId"
                                                {...register("userEmail", {
                                                    required: "Email is Required",
                                                    validate: (value) => validateField(value, 'email'),
                                                })}
                                                onChange={(e) => handleInputChange(e, "userEmail")}
                                                onKeyPress={(e) => preventInvalidInput(e, 'whitespace')}
                                            />
                                            {errors.userEmail && <p className="errorsMsg">{errors.userEmail.message}</p>}
                                        </div>
                                    </div>
                                    <div className='form row mt-4'>
                                        <div className="form-group col-md-6" style={{paddingRight:"40px"}}>
                                            <label htmlFor="fname" className="col-sm-4 text-left control-label col-form-label">User Role</label>
                                            <Controller
                                                name="role"
                                                defaultValue={role[0]?.id}
                                                control={control}
                                                rules={{ required: 'User role is required.' }}
                                                render={({ field }) => (
                                                    <Select
                                                        {...field}
                                                        options={role}
                                                        getOptionLabel={(option) => option.label}
                                                        getOptionValue={(option) => option.id}
                                                        onChange={(selectedOption) => field.onChange(selectedOption.id)}
                                                        placeholder="Select User Role"
                                                        value={role.find((c) => c.id === field.value)}
                                                    />
                                                )}
                                            />
                                            {errors.role && errors.role.type === "required" && (<p className='errorsMsg '>Select User Role.</p>)}
                                        </div>
                                        <div className="form-group col-md-6" style={{paddingRight:"40px"}}>
                                            <label htmlFor="fname" className="col-sm-4 text-left control-label col-form-label">Password</label>
                                            <div className="input-group">
                                                <input className="form-control" name="password" id="password" placeholder="Enter Password" autoComplete='off'
                                                    {...register("password", {
                                                        required: "Enter Password",
                                                        validate: (value) => validateField(value, 'password'),
                                                    })}
                                                    onChange={handlePasswordChange}
                                                    type={passwordShown ? "text" : "password"}
                                                    onKeyPress={(e) => preventInvalidInput(e, 'whitespace')}
                                                />
                                                <i onClick={togglePasswordVisiblity}> {passwordShown ? (
                                                    <Eye size={20} />
                                                ) : (
                                                    <EyeSlash size={20} />
                                                )}</i>
                                            </div>
                                            {errors.password && <p className="errorsMsg">{errors.password.message}</p>}
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="border-top">
                                <div className="card-body d-flex justify-content-end">
                                    <button
                                        className="btn btn-secondary btn-md mr-2"
                                        type="button"
                                        onClick={() => reset()} // Reset form fields to initial values
                                    >
                                        Reset
                                    </button>
                                    <button
                                        className={
                                            isUpdating
                                                ? "btn btn-danger bt-lg"
                                                : "btn btn-primary bt-lg"
                                        }
                                        type="submit"
                                    >
                                        {isUpdating ? "Update User" : "Add User"}
                                    </button>
                                </div>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
            <Footer />
        </div>

    )
}
export default UserRegistration;
