import React ,{useState,useEffect}from 'react'
import SideNav from "../Pages/SideNav";
import TopNav from "../Pages/TopNav";
import axios from 'axios';
import { useForm,Controller } from 'react-hook-form';
import { Link,useLocation ,useNavigate} from 'react-router-dom';
import Footer from '../Pages/Footer';
import { Eye, EyeSlash } from 'react-bootstrap-icons';
import { Slide, toast } from 'react-toastify';
import Select from 'react-select';


const UserRegistration =(props) =>{
   const navigate=useNavigate();
   const[data,setData]=useState([])
    const {register, handleSubmit,reset,control,formState:{errors}}=useForm();
   const location=useLocation();
   const [passwordShown, setPasswordShown] = useState(false);
   const togglePasswordVisiblity = () => {
     setPasswordShown(!passwordShown);
   };
   const handlePasswordChange = (e) => {
       setPasswordShown(e.target.value);
     };
     const role=[
        {value:"Admin",label:"Admin",id:"Admin"},
        {value:"Employee",label:"Employee",id:"Employee"}
     ]
   const onSubmit=(data)=>{
    delete data.role.value;
    delete data.role.label;
    if(location&&location.state&&location.state.id){
        axios.post(`http://122.175.43.71:8001/api/updateuser/${location.state.id}`,data)
        .then((res)=>{
            toast.success('Updated Successfully', {  //Notification status
                position: 'top-right',
                transition:Slide,
                hideProgressBar:true,
                theme:"colored",
                autoClose: 1000, // Close the toast after 1 seconds
              });
            console.log(res.data.data);
            setData(res.data.data);
            navigate('/Usersviews')
        })
    }else{
    axios.post(
        'http://122.175.43.71:8001/api/adduser',
        data,
        { headers: { 'Content-Type': 'application/json' }}
     )
    .then((response) => 
        {
            toast.success("User Registered Sucessfully", {  //Notification status
                position: 'top-right',
                transition:Slide,
                hideProgressBar:true,
                theme:"colored",
                autoClose: 1000, // Close the toast after 1 seconds
              });
            console.log(response.data)
            console.log(data);
            navigate('/Usersviews')
        })
    .catch(error => {
        toast.error(error, {  //Notification status
            position: 'top-right',
            transition:Slide,
            hideProgressBar:true,
            theme:"colored",
            autoClose: 1000, // Close the toast after 1 seconds
          });
        console.log('error occured')});
   };
}
    useEffect(()=>{
    
        if (location&&location.state&&location.state.id) {
            axios.get(`http://122.175.43.71:8001/api/edituser/${location.state.id}`)
              .then((response) => {
                console.log(response.data.data);
               
                reset(response.data.data);
              })
              .catch((error) => {
                console.error('Error fetching data:', error);
              });
          }
        },[])
    return(
        <div id="main-wrapper" data-sidebartype="mini-sidebar">
          <SideNav/>
          <TopNav/>
          <div className="page-breadcrumb" style={{width:"78%",marginLeft:"280px",marginTop:"30px"}}>
            <div className="row">
                <div className="col-12 d-flex no-block align-items-center">
                <h4 className="page-title">Users Registration</h4>
                <div className="ml-auto text-right">
                    <nav aria-label="breadcrumb">
                    <ol className="breadcrumb">
                        <li className="breadcrumb-item"><Link to={'/'}>Home</Link></li>
                        <li className="breadcrumb-item"><Link to={'/Usersviews'}>Users List</Link></li>
                        <li className="breadcrumb-item active" aria-current="page">Users Registration</li>
                    </ol>
                    </nav>
                </div>
                </div>
            </div>
        </div>
            <div className='container-fliuid'>
                <div className='row'>
                    <div className='col-md-9 ' style={{marginLeft:"300px",paddingTop:"50px"}}>
                        <div className="card">
                            <form className="form-horizontal" onSubmit={handleSubmit(onSubmit)}>
                                <div className="card-body">
                                    <div className="form-group row ">
                                        <label htmlFor="fname" className="col-sm-3 text-right control-label col-form-label">User Name</label>
                                        <div className="col-sm-9">
                                            <input type="text" className="form-control" name ="username" id="username" placeholder=" Enter User Name" 
                                                {...register("username", {
                                                required: "User Name is Required.",  
                                                })}
                                            />
                                        </div>
                                        {errors.username && ( <p className='errorsMsg '>{errors.username.message}</p>)}

                                    </div>
                                    <div className="form-group row ">
                                        <label htmlFor="fname" className="col-sm-3 text-right control-label col-form-label">User Email</label>
                                        <div className="col-sm-9">
                                        <input type="email" className="form-control" name ="email"   id="email"  placeholder=" Enter User MailId"
                                        {...register("email",{
                                            required:"Enter EmailId",
                                            pattern:{
                                                value: /^[^@ ]+@[^@ ]+\.[^@ .]{2,}$/,
                                                message: "Invalid Email"
                                              }
                                            })}
                                          />
                                          
                                        </div>
                                        {errors.email && <p className="errorsMsg">{errors.email.message}</p>}
                                    </div>
                                    <div className="form-group row ">
                                        <label htmlFor="fname" className="col-sm-3 text-right control-label col-form-label">User Role</label>
                                        <div className="col-sm-9">
                                            <Controller
                                            className="form-control"
                                            name="role"
                                            defaultValue={'id'}
                                            control={control}
                                            rules={{required:true}}
                                            render={({field,id})=>(
                                                <Select {...field} options={role}
                                                value={role.find((c) => c.id=== id)}
                                                onChange={(selectedOption) => field.onChange(selectedOption.id)}
                                                />
                                            )}
                                            />
                                        {/* <input type= "text" className="form-control" name ="role"   id="role"  placeholder="Enter User Role"
                                        {...register("role", {
                                            required: true,
                                          })}
                                          /> */}
                                        </div>
                                        {errors.role && errors.role.type ==="required" &&( <p className='errorsMsg '>Select User Role.</p>)}
                                    </div>
                                    <div className="form-group row ">
                                        <label htmlFor="fname" className="col-sm-3 text-right control-label col-form-label">Password</label>
                                        <div className="col-sm-9">
                                        <input className="form-control" name ="password"   id="password"  placeholder="Enter Password" autoComplete='off'
                                           onChange={handlePasswordChange}
                                           type={passwordShown ? "text" : "password"}
                                       {...register("password",{
                                        required:"Enter Password",
                                        pattern:{
                                            value: /^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])(?=.*\W)(?!.* ).{8,16}$/,
                                            message: "Invalid Password"
                                          }
                                        })}
                                      />
                                       <i onClick={togglePasswordVisiblity}> {passwordShown ? (
                                            <Eye size={20}/>
                                        ) : (
                                            <EyeSlash size={20} />
                                        )}</i> 
                                    </div>
                                        {errors.password && <p className="errorsMsg">{errors.password.message}</p>}
                                    </div>
                                    <button type="submit"className="btn btn-primary" style={{marginLeft:"450px"}}>Submit</button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
            <Footer/>
        </div>

    )
}
export default UserRegistration;
