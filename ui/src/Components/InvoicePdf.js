import React, {useEffect, useRef, useState}from 'react'
//import SideNav from '../Pages/SideNav'
import html2canvas from "html2canvas";
import jsPDF from "jspdf";
import axios from 'axios';
import { useLocation ,useNavigate} from 'react-router-dom';
import { CalendarFill } from 'react-bootstrap-icons';
import { Slide, toast } from 'react-toastify'
//import {TrashFill } from 'react-bootstrap-icons'

const InvoicePdf = ({showPreview,setShowPreview}) => {
 
   const[invoiceData,setInvoiceData]=useState([]);
  const location=useLocation()
  const navigate=useNavigate();
  useEffect(()=>{
    const fetchData = async () => {
      try {
        if (location && location.state && location.state.id) {
          const response = await axios.get(`http://122.175.43.71:8001/api/invoiceslip/${location.state.id}`);
          console.log(response.data);
          setInvoiceData(response.data.data);
        }
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };
    fetchData();
    console.log(invoiceData);
  }, []);
    const pdfRef=useRef();
   
    const downloadPdf = () => {

      toast.success('Download Successfully', {  //Notification status
        position: 'top-right',
        transition:Slide,
        hideProgressBar:true,
        theme:"colored",
        progress:2,
        autoClose:1000, // Close the toast after 1 seconds
      });
      navigate('/Invoices')
      const input = pdfRef.current;
      const img = new Image();
      html2canvas(input).then((canvas) => {
        const imgData = canvas.toDataURL('image/png');
        const pdf = new jsPDF('p', 'mm', 'a4', true);
        const pdfWidth = pdf.internal.pageSize.getWidth();
        const pdfHeight = pdf.internal.pageSize.getHeight();
        img.src = imgData;
        img.onload = function () {
          const imgWidth = pdfWidth-1; // Adjust the margin or padding as needed
          const imgHeight = (img.height * imgWidth) /900;
          const imgX = 0; // Left margin
          const imgY = 0; // Center vertically
          pdf.addImage(img, 'PNG', imgX, imgY, imgWidth, imgHeight);
          pdf.save('invoice.pdf');
        };
      });
    }
 
  if(!invoiceData){
    return(
      <div className="preloader">
          <div className="lds-ripple">
          <div className="lds-pos" />
          <div className="lds-pos" />
          <div><h4>Loading.....</h4></div>
          </div>
      </div>
    )
  }
  return (
   <div className="container-fluid" style={{width:"900px"}}>
  {/* ============================================================== */}
  {/* Start Page Content */}
  {/* ============================================================== */}
  <div className="row">
    <div className="col-md-12">
      <div className="card card-body printableArea bg-white" ref={pdfRef} >
    <img src="assets/images/pathbreaker_logo.png" style={{height:"60px",width:"155px"}} alt="logo" />
        <hr />
        <div className="row">
          <div className="col-md-6">
            <div className="text-left">
              <address>
              <h6 style={{fontSize:"smaller"}}>Billed To,</h6>
                <h4 className="font-small">{invoiceData.customer}</h4>
                <h6 className="m-l-30">{invoiceData.mail_id},</h6>
                <h6 className="m-l-30">Contact No: {invoiceData.mobile_number},</h6>
                <h6 className="m-l-30">GST: {invoiceData.cos_gst_number},</h6>
                <h6 className="m-l-30">{invoiceData.customer_address},{invoiceData.state}</h6>
              </address>
            </div>
          </div>
          <div className=' col-md-6 text-right'>
        <h5 className='text-right'><b style={{fontSize:"smaller"}}>INVOICE -</b><span>{invoiceData.invoice_no}</span></h5>
        <p className="text-right mr-1">Invoice Date :&nbsp;<CalendarFill/>&nbsp;<b className="m-l-30">{invoiceData.invoice_date}</b></p>
        <p className="text-right mr-1">Due Date :&nbsp;<CalendarFill/>&nbsp;<b className="m-l-30 ">{invoiceData.expiration_date}</b></p>
        </div>

          <div className="col-md-12">
            <div className="table-responsive m-t-40" >
              <table className="table table-hover">
                <thead>
                  <tr>
                    <th className="text-center">#</th>
                    <th className="text-left">Description</th>
                   <th className="text-left">HSN-no</th>
                    <th className="text-left">Quantity</th>
                    <th className="text-left">GST (%)</th>
                    <th className="text-left">Unit Cost (₹)</th>
                    <th className="text-left">Total (₹)</th>
                  </tr>
                  
                </thead>
                <tbody>
                {invoiceData && Array.isArray(invoiceData.productdetails) ? (
                  invoiceData.productdetails.map((item, index) => (
                    <tr key={index}>
                      <td className="text-center">{index + 1}</td>
                      <td className="text-left">{item.product_name}</td>
                      <td className="text-left">{item.purchase_id}</td>
                      <td className="text-left">{item.no_of_units_allowed}</td>
                      <td className="text-left">{item.gst_rate}</td>
                      <td className="text-left">{item.cost_per_unit}</td>
                      <td className="text-left">{item.total_amount}</td>
                    </tr>
                  
                  ))
                  
                ) : (
                  <tr>
                    <td colSpan="6" className="font-bold text-center">......No product details available......</td>
                  </tr>
                )}
             
                </tbody>
              </table>
            </div>
          </div>
          <div className="col-md-12">
            <table className=" table pull-right text-right">
               <tr  className='col-md-12 'style={{paddingLeft:"5px"}}>
              <th className="col-md-11"  ><b>Sub - Total amount:</b></th>
              <td className="col-md-2">&nbsp;&nbsp;{invoiceData.subtotal}₹</td>
              </tr>
              <tr>
              <th><b>Sgst ({invoiceData.sgst}%):</b></th>
              <td>{invoiceData.sgst_amount}₹</td>
              </tr>
             <tr>
              <th><b>Cgst ({invoiceData.cgst}%):</b> </th>
              <td>{invoiceData.cgst_amount}₹</td>
             </tr>
             <tr>
              <th><b>Igst ({invoiceData.igst}%):</b></th>
              <td>{invoiceData.igst_amount}₹</td>
             </tr>
              <tr style={{borderBottom:"1px solid #dee2e6"}}>
                <th ><b>Total :</b></th>
                <td>{invoiceData.total}₹</td>
              </tr>
            <tr>
            <p className='text-left ml-2'><b>In Words:</b> &nbsp;<em>{invoiceData.amount_in_words}</em>&nbsp;only/-</p>
            </tr>
            
            </table>
            <p style={{fontStyle:"italic"}}>The Payment should be made favouring <b>{invoiceData.company_name}</b> or Direct deposit information given below.</p>
           <div className='table-responsive'>
        <table className='table'>  
            <tr>
            <th colSpan="12" style={{fontSize:"medium"}}>NEFT Information</th>
            </tr>
            <tr>
            <th>Bank Name</th>
            <td>{invoiceData.bank_name}</td>
            <th>Pan Number</th>
            <td>{invoiceData.pan_number}</td>
            </tr>
            <tr>
            <th>Account Type</th>
            <td>{invoiceData.bank_name}</td>
            <th>GST:</th>
            <td colSpan="3">{invoiceData.gst_number}</td>
            </tr>
            <tr>
            <th>Account Number</th>
            <td>{invoiceData.account_number}</td>
            <th rowSpan={2} colSpan={2}></th>
            
            </tr>
            <tr>
            <th>IFSC Code</th>
            <td>{invoiceData.ifsc_code}</td>
            
            </tr>
            <tr>
            <th >Bank Address</th>
            <td colSpan="3">{invoiceData.bank_branch},{invoiceData.state}</td>
            </tr>
        </table>
        <h6 style={{marginBottom:"60px"}}>For <b>{invoiceData.company_name} </b> </h6>
        <address style={{marginTop:"90px"}}>
            <h6 style={{fontStyle:"italic",fontSize:"medium"}}>Authorized Signature</h6>
             <h3 className="text-danger">{invoiceData.company_name},</h3>
             <h6 className="m-l-5">{invoiceData.address}.</h6>
           </address>
           <hr/>
           <h5 className='text-center'><b>{invoiceData.company_name}</b></h5>
         <h6 className='text-center' ><b>ph no: </b>+9012345678, <b>email:</b> pathbreakertech@gmail.com</h6>
        </div>
        
          </div>
        </div>
      </div>
      <div className="text-right" style={{marginBottom:"30px"}}>
        <button className="btn btn-danger" type="submit" onClick={downloadPdf}> Download </button>
      </div>
    </div>
  </div>
  
  {/* ============================================================== */}
  {/* End PAge Content */}
  {/* ============================================================== */}
  {/* ============================================================== */}
  {/* Right sidebar */}
  {/* ============================================================== */}
  {/* .right-sidebar */}
  {/* ============================================================== */}
  {/* End Right sidebar */}
  {/* ============================================================== */}
</div>
  
  )
}

export default InvoicePdf
