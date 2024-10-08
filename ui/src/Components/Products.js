import React, { useState ,useEffect} from "react";
import { useForm } from 'react-hook-form'
import { useLocation,useNavigate} from "react-router-dom";
import { Link } from "react-router-dom";
import axios from 'axios'
import TopNav from '../Pages/TopNav' 
import SideNav from '../Pages/SideNav'
import Footer from "../Pages/Footer"
import { Slide, toast } from 'react-toastify';

const Products = () => {
  const [existing,setExisting]=useState([])
  const {register, handleSubmit,reset,formState:{errors}}=useForm();
  const navigate=useNavigate();
  const location=useLocation();
  const onSubmit=(data)=>{
    if(location&&location.state&&location.state.id){
        axios.post(`http://122.175.43.71:8001/api/updateProduct/${location.state.id}`,data)
        .then((res)=>{
            toast.success('Updated Successfully ', {  //Notification status
                position: 'top-right',
                transition:Slide,
                hideProgressBar:true,
                theme:"colored",
                autoClose: 1000, // Close the toast after 1 seconds
              });
            console.log(res.data.data);
            setExisting(res.data.data);
            navigate('/productview')
        })
    }else{
    axios.post(
        'http://122.175.43.71:8001/api/addproduct',
        data,
        { headers: { 'Content-Type': 'application/json' }}
     )
    .then((response) => 
        {
            toast.success('Registered Successfully', {  //Notification status
                position: 'top-right',
                transition:Slide,
                hideProgressBar:true,
                theme:"colored",
                autoClose: 1000, // Close the toast after 1 seconds
              });
            console.log(response.data)
            console.log(data);
            navigate('/productview')
        })
    .catch(errors => {
        toast.error(errors, {  //Notification status
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
    if (location&&location.state && location.state.id) {
        axios.get(`http://122.175.43.71:8001/api/editproduct/${location.state.id}`)
          .then((response) => {
            console.log(response.data);
            // Rest of your code here
            reset(response.data.data)
          })
          .catch((error) => {
            console.error('Error fetching data:', error);
          });
      }
    },[])

return (
<div id="main-wrapper" data-sidebartype="mini-sidebar">
<TopNav/>
<SideNav/>
   <div className="page-breadcrumb" style={{width:"78%",marginLeft:"280px",marginTop:"30px"}}>
            <div className="row">
                <div className="col-12 d-flex no-block align-items-center">
                <h4 className="page-title" style = {{color:"blue"}}>Product Registration</h4>
                <div className="ml-auto text-right">
                    <nav aria-label="breadcrumb">
                    <ol className="breadcrumb">
                        <li className="breadcrumb-item"><Link to={'/'}>Home</Link></li>
                        <li className="breadcrumb-item"><Link to={'/productview'}>Products List</Link></li>
                        <li className="breadcrumb-item active" aria-current="page">Products Registration</li>
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
                   <h4 className="card-title">Product Info</h4>
                   <div className="form-group row mt-5">
                   <label htmlFor="product_name" className="col-sm-3 text-right control-label col-form-label">Product Name</label>
                   <div className="col-sm-9">
                       <input type="text" className="form-control" name="product_name" id="product_name" placeholder="Enter Product Name Here" 
                       {...register("product_name",{
                         
                        required:'Enter Product Name',
                       
                       })}
                       
                       />
                      
                   </div>
                   {errors.product_name &&( <p className="errorsMsg">
                        {errors.product_name.message}
                       </p>)}
                   </div>
                  
                   <div className="form-group row">
                   <label htmlFor="productcost" className="col-sm-3 text-right control-label col-form-label">Product Cost</label>
                   <div className="col-sm-9">
                       <input type="text" className="form-control" name="product_cost" id="product_cost" placeholder="Enter Price"
                        {...register("product_cost",{
                            required:'Enter Product Name'
                        
                           })}
                           />
                           
                   </div>
                   {errors.product_cost &&( <p className="errorsMsg">
                            {errors.product_cost.message}
                           </p>)}
                   </div>
                   <div className="form-group row">
                   <label htmlFor="hsn_no" className="col-sm-3 text-right control-label col-form-label">HSN No</label>
                   <div className="col-sm-9">
                       <input type="text" className="form-control" name="hsn_no" id="hsn_no" placeholder="Enter HSN-no"
                        {...register("hsn_no",{
                           
                            required:'Enter Hsn-no'
                           })}
                           />
                           
                   </div>
                   {errors.hsn_no &&( <p className="errorsMsg">
                            {errors.hsn_no.message}
                           </p>)}
                   </div>
                   <div className="form-group row">
                   <label htmlFor="cgst" className="col-sm-3 text-right control-label col-form-label">CGST</label>
                   <div className="col-sm-9">
                       <input type="text" className="form-control" name="cgst" id="cgst" placeholder="Enter Cgst "
                        {...register("cgst",{
                        
                            required:'Enter CGST'
                           })}
                           />
                          
                   </div>
                   {errors.cgst &&( <p className="errorsMsg">
                            {errors.cgst.message}
                           </p>)}
                   </div>
                   <div className="form-group row">
                   <label htmlFor="sgst" className="col-sm-3 text-right control-label col-form-label">SGST</label>
                   <div className="col-sm-9">
                       <input type="text" className="form-control" name="sgst" id="sgst" placeholder="Enter SGST"
                        {...register("sgst",{
                            required:'Enter SGST'
                           })}
                           />
                          
                   </div>
                   {errors.sgst &&( <p className="errorsMsg">
                            {errors.sgst.message}
                           </p>
                           )}
                   </div>
                   <div className="form-group row">
                   <label htmlFor="igst" className="col-sm-3 text-right control-label col-form-label">IGST</label>
                   <div className="col-sm-9">
                       <input type="text" className="form-control" name="igst" id="igst" placeholder="Enter IGST"
                        {...register("igst",{
                            required:'Enter IGST'
                           })}
                           />
                          
                   </div>
                   {errors.igst &&( <p className="errorsMsg">
                            {errors.igst.message}
                           </p>)}
                   </div>
               </div>
               <div className="border-top">
                   <div className="card-body">
                       <button type="submit" className="btn btn-primary" style={{marginLeft:"440px"}}>Submit</button>
                   </div>
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


export default Products
