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
    const { register, handleSubmit, reset, control, formState: { errors } } = useForm();
    const location = useLocation();

    const [passwordShown, setPasswordShown] = useState(false);
    const togglePasswordVisiblity = () => {
        setPasswordShown(!passwordShown);
    };
    const handlePasswordChange = (e) => {
        setPasswordShown(e.target.value);
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
                                            <input type="text" className="form-control" name="username" id="username" placeholder=" Enter User Name"
                                                {...register("username", {
                                                    required: "User Name is Required.",
                                                })}
                                            />
                                            {errors.username && (<p className='errorsMsg '>{errors.username.message}</p>)}

                                        </div>
                                        <div className="form-group col-md-6">
                                            <label htmlFor="fname" className="col-sm-4 text-left control-label col-form-label">User Email</label>
                                            <input type="useremail" className="form-control" name="useremail" id="useremail" placeholder=" Enter User MailId"
                                                {...register("useremail", {
                                                    required: "Enter userEmail",
                                                    pattern: {
                                                        value: /^[^@ ]+@[^@ ]+\.[^@ .]{2,}$/,
                                                        message: "Invalid Email"
                                                    }
                                                })}
                                            />
                                            {errors.useremail && <p className="errorsMsg">{errors.useremail.message}</p>}
                                        </div>
                                    </div>
                                    <div className='form row mt-4'>
                                        <div className="form-group col-md-6">
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
                                        <div className="form-group col-md-6">
                                            <label htmlFor="fname" className="col-sm-4 text-left control-label col-form-label">Password</label>
                                            <div className="input-group">
                                                <input className="form-control" name="password" id="password" placeholder="Enter Password" autoComplete='off'
                                                    onChange={handlePasswordChange}
                                                    type={passwordShown ? "text" : "password"}
                                                    {...register("password", {
                                                        required: "Enter Password",
                                                        pattern: {
                                                            value: /^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])(?=.*\W)(?!.* ).{8,16}$/,
                                                            message: "Invalid Password"
                                                        }
                                                    })}
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
                            <button
                                className={
                                    isUpdating
                                        ? "btn btn-danger bt-lg"
                                        : "btn btn-primary bt-lg"
                                }
                                style={{ marginLeft: "90%" }}
                                type="submit"
                            >
                                {isUpdating ? "Update User" : "Add User"}
                            </button>
                        </form>
                    </div>
                </div>
            </div>
            <Footer />
        </div>

    )
}
export default UserRegistration;
