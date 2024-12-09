import React, { useState, useEffect } from 'react'
import SideNav from "../Pages/SideNav";
import TopNav from "../Pages/TopNav";
import { useForm, Controller } from 'react-hook-form';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import Footer from '../Pages/Footer';
import { Eye, EyeSlash } from 'react-bootstrap-icons';
import { Slide, toast } from 'react-toastify';
import Select from 'react-select';
import { UserGetApiById, UserPatchApiById } from '../Axios';
import { useAuth } from '../Context/AuthContext';

const UserProfile = (props) => {
    const navigate = useNavigate();
    const [data, setData] = useState([])
    const [isUpdating, setIsUpdating] = useState(false);
    const { register, handleSubmit, reset, control, formState: { errors } } = useForm();
    const location = useLocation();
    const { user } = useAuth();

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
        if (user.companyId) {
            UserPatchApiById(user.companyId, data)
                .then((res) => {
                    toast.success('Updated Successfully', {
                        position: 'top-right',
                        transition: Slide,
                        hideProgressBar: true,
                        theme: "colored",
                        autoClose: 1000,
                    });
                    console.log(res.data);
                    setData(res.data);  // Update the state with the response data
                    navigate('/Usersviews');  // Redirect after update
                })
                .catch((error) => {
                    toast.error('Error updating user', {
                        position: 'top-right',
                        transition: Slide,
                        hideProgressBar: true,
                        theme: "colored",
                        autoClose: 1000,
                    });
                    console.error('Error occurred during user update:', error);
                });
        } else {
            // Handle the case where userId is not present, maybe show an error
            toast.error('User ID is missing. Cannot update user.', {
                position: 'top-right',
                transition: Slide,
                hideProgressBar: true,
                theme: "colored",
                autoClose: 1000,
            });
        }
    };

    useEffect(() => {
        const fetchUserData = async () => {
            if (!user.companyId) return;
            try {
                const response = await UserGetApiById(user.companyId);
                console.log(response);
                setIsUpdating(true);
                reset(response);
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };

        fetchUserData();
    }, [user.userId]);

    return (
        <div id="main-wrapper" data-sidebartype="mini-sidebar">
            <SideNav />
            <TopNav />
            <div className="page-breadcrumb" style={{ width: "78%", marginLeft: "280px", marginTop: "30px" }}>
                <div className="row">
                    <div className="col-12 d-flex no-block align-items-center">
                        <h4 className="page-title" style={{ color: "blue" }}>Profile</h4>
                    </div>
                </div>
            </div>
            <div className='container-fliuid'>
                <div className='row'>
                    <div className='col-md-9 ' style={{ marginLeft: "300px", paddingTop: "50px" }}>
                        <div className="card">
                            <form className="form-horizontal" onSubmit={handleSubmit(onSubmit)}>
                                <div className="card-body">
                                    <div className="form-group row ">
                                        <label htmlFor="fname" className="col-sm-3 text-right control-label col-form-label">User Name</label>
                                        <div className="col-sm-9">
                                            <input type="text" className="form-control" name="username" id="username" placeholder=" Enter User Name"
                                                {...register("username", {
                                                    required: "User Name is Required.",
                                                })}
                                            />
                                        </div>
                                        {errors.username && (<p className='errorsMsg '>{errors.username.message}</p>)}

                                    </div>
                                    <div className="form-group row ">
                                        <label htmlFor="fname" className="col-sm-3 text-right control-label col-form-label">User Email</label>
                                        <div className="col-sm-9">
                                            <input type="useremail" className="form-control" name="useremail" id="useremail" placeholder=" Enter User MailId"
                                                {...register("useremail", {
                                                    required: "Enter userEmail",
                                                    pattern: {
                                                        value: /^[^@ ]+@[^@ ]+\.[^@ .]{2,}$/,
                                                        message: "Invalid Email"
                                                    }
                                                })}
                                            />

                                        </div>
                                        {errors.useremail && <p className="errorsMsg">{errors.useremail.message}</p>}
                                    </div>
                                    <div className="form-group row ">
                                        <label htmlFor="fname" className="col-sm-3 text-right control-label col-form-label">User Role</label>
                                        <div className="col-sm-9" style={{ paddingRight: "60px" }}>
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
                                        </div>
                                        {errors.role && errors.role.type === "required" && (<p className='errorsMsg '>Select User Role.</p>)}
                                    </div>
                                    <div className="form-group row ">
                                        <label htmlFor="fname" className="col-sm-3 text-right control-label col-form-label">Password</label>
                                        <div className="col-sm-9">
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
                                    <button className="btn btn-primary bt-lg" style={{ marginLeft: "450px" }} type='Submit'>Save</button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
            <Footer />
        </div>
    )
}
export default UserProfile;
