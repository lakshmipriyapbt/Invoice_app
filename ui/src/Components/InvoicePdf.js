// import React, { useEffect, useRef, useState } from 'react'
// //import SideNav from '../Pages/SideNav'
// import html2canvas from "html2canvas";
// import jsPDF from "jspdf";
// import axios from 'axios';
// import { useLocation, useNavigate } from 'react-router-dom';
// import { CalendarFill } from 'react-bootstrap-icons';
// import { Slide, toast } from 'react-toastify'
// import { InvoiceGenerateApi, InvoiceGetApiById } from '../Axios';
// //import {TrashFill } from 'react-bootstrap-icons'

// const InvoicePdf = ({ showPreview, setShowPreview }) => {

//   const [invoiceData, setInvoiceData] = useState([]);
//   const location = useLocation()
//   const navigate = useNavigate();

//   useEffect(() => {
//     const fetchData = async () => {
//       try {
//         // Log location.state to verify the value
//         console.log(location.state); // Check if invoiceId exists in location.state

//         if (location && location.state && location.state.invoiceId) {
//           const response = await InvoiceGenerateApi(location.state.invoiceId);
//           console.log(response.data); // Log API response
//           setInvoiceData(response.data.data); // Set invoice data
//         } else {
//           console.error('Invoice ID not found in location state');
//         }
//       } catch (error) {
//         console.error('Error fetching data:', error);
//       }
//     };

//     fetchData();
//   }, [location]);


//   const pdfRef = useRef();

//   const downloadPdf = () => {

//     toast.success('Download Successfully', {  //Notification status
//       position: 'top-right',
//       transition: Slide,
//       hideProgressBar: true,
//       theme: "colored",
//       progress: 2,
//       autoClose: 1000, // Close the toast after 1 seconds
//     });
//     navigate('/Invoices')
//     const input = pdfRef.current;
//     const img = new Image();
//     html2canvas(input).then((canvas) => {
//       const imgData = canvas.toDataURL('image/png');
//       const pdf = new jsPDF('p', 'mm', 'a4', true);
//       const pdfWidth = pdf.internal.pageSize.getWidth();
//       const pdfHeight = pdf.internal.pageSize.getHeight();
//       img.src = imgData;
//       img.onload = function () {
//         const imgWidth = pdfWidth - 1; // Adjust the margin or padding as needed
//         const imgHeight = (img.height * imgWidth) / 900;
//         const imgX = 0; // Left margin
//         const imgY = 0; // Center vertically
//         pdf.addImage(img, 'PNG', imgX, imgY, imgWidth, imgHeight);
//         pdf.save('invoice.pdf');
//       };
//     });
//   }

//   if (!invoiceData) {
//     return (
//       <div className="preloader">
//         <div className="lds-ripple">
//           <div className="lds-pos" />
//           <div className="lds-pos" />
//           <div><h4>Loading.....</h4></div>
//         </div>
//       </div>
//     )
//   }
//   return (
//     <div className="container-fluid" style={{ width: "900px" }}>
//       {/* ============================================================== */}
//       {/* Start Page Content */}
//       {/* ============================================================== */}
//       <div className="row">
//         <div className="col-md-12">
//           <div className="card card-body printableArea bg-white" ref={pdfRef} >
//             <img src="assets/images/pathbreaker_logo.png" style={{ height: "60px", width: "155px" }} alt="logo" />
//             <hr />
//             <div className="row">
//               <div className="col-md-6">
//                 <div className="text-left">
//                   <address>
//                     <h6 style={{ fontSize: "smaller" }}>Billed To,</h6>
//                     <h4 className="font-small">{invoiceData.customername}</h4>
//                     <h6 className="m-l-30">{invoiceData.mail_id},</h6>
//                     <h6 className="m-l-30">Contact No: {invoiceData.mobile_number},</h6>
//                     <h6 className="m-l-30">GST: {invoiceData.cos_gst_number},</h6>
//                     <h6 className="m-l-30">{invoiceData.customer_address},{invoiceData.state}</h6>
//                   </address>
//                 </div>
//               </div>
//               <div className=' col-md-6 text-right'>
//                 <h5 className='text-right'><b style={{ fontSize: "smaller" }}>INVOICE -</b><span>{invoiceData.invoiceId}</span></h5>
//                 <p className="text-right mr-1">Invoice Date :&nbsp;<CalendarFill />&nbsp;<b className="m-l-30">{invoiceData.invoiceDate}</b></p>
//                 <p className="text-right mr-1">Due Date :&nbsp;<CalendarFill />&nbsp;<b className="m-l-30 ">{invoiceData.expiration_date}</b></p>
//               </div>

//               <div className="col-md-12">
//                 <div className="table-responsive m-t-40" >
//                   <table className="table table-hover">
//                     <thead>
//                       <tr>
//                         <th className="text-center">#</th>
//                         <th className="text-left">Description</th>
//                         <th className="text-left">HSN-no</th>
//                         <th className="text-left">Quantity</th>
//                         <th className="text-left">GST (%)</th>
//                         <th className="text-left">Unit Cost (₹)</th>
//                         <th className="text-left">Total (₹)</th>
//                       </tr>

//                     </thead>
//                     <tbody>
//                       {invoiceData && Array.isArray(invoiceData.productdetails) ? (
//                         invoiceData.productdetails.map((item, index) => (
//                           <tr key={index}>
//                             <td className="text-center">{index + 1}</td>
//                             <td className="text-left">{item.productName}</td>
//                             <td className="text-left">{item.purchase_id}</td>
//                             <td className="text-left">{item.no_of_units_allowed}</td>
//                             <td className="text-left">{item.gst_rate}</td>
//                             <td className="text-left">{item.cost_per_unit}</td>
//                             <td className="text-left">{item.total_amount}</td>
//                           </tr>

//                         ))

//                       ) : (
//                         <tr>
//                           <td colSpan="6" className="font-bold text-center">......No product details available......</td>
//                         </tr>
//                       )}

//                     </tbody>
//                   </table>
//                 </div>
//               </div>
//               <div className="col-md-12">
//                 <table className=" table pull-right text-right">
//                   <tr className='col-md-12 ' style={{ paddingLeft: "5px" }}>
//                     <th className="col-md-11"  ><b>Sub - Total amount:</b></th>
//                     <td className="col-md-2">&nbsp;&nbsp;{invoiceData.subtotal}₹</td>
//                   </tr>
//                   <tr>
//                     <th><b>Sgst ({invoiceData.sgst}%):</b></th>
//                     <td>{invoiceData.sgst_amount}₹</td>
//                   </tr>
//                   <tr>
//                     <th><b>Cgst ({invoiceData.cgst}%):</b> </th>
//                     <td>{invoiceData.cgst_amount}₹</td>
//                   </tr>
//                   <tr>
//                     <th><b>Igst ({invoiceData.igst}%):</b></th>
//                     <td>{invoiceData.igst_amount}₹</td>
//                   </tr>
//                   <tr style={{ borderBottom: "1px solid #dee2e6" }}>
//                     <th ><b>Total :</b></th>
//                     <td>{invoiceData.total}₹</td>
//                   </tr>
//                   <tr>
//                     <p className='text-left ml-2'><b>In Words:</b> &nbsp;<em>{invoiceData.amount_in_words}</em>&nbsp;only/-</p>
//                   </tr>

//                 </table>
//                 <p style={{ fontStyle: "italic" }}>The Payment should be made favouring <b>{invoiceData.company_name}</b> or Direct deposit information given below.</p>
//                 <div className='table-responsive'>
//                   <table className='table'>
//                     <tr>
//                       <th colSpan="12" style={{ fontSize: "medium" }}>NEFT Information</th>
//                     </tr>
//                     <tr>
//                       <th>Bank Name</th>
//                       <td>{invoiceData.bank_name}</td>
//                       <th>Pan Number</th>
//                       <td>{invoiceData.pan_number}</td>
//                     </tr>
//                     <tr>
//                       <th>Account Type</th>
//                       <td>{invoiceData.bank_name}</td>
//                       <th>GST:</th>
//                       <td colSpan="3">{invoiceData.gst_number}</td>
//                     </tr>
//                     <tr>
//                       <th>Account Number</th>
//                       <td>{invoiceData.account_number}</td>
//                       <th rowSpan={2} colSpan={2}></th>

//                     </tr>
//                     <tr>
//                       <th>IFSC Code</th>
//                       <td>{invoiceData.ifsc_code}</td>

//                     </tr>
//                     <tr>
//                       <th >Bank Address</th>
//                       <td colSpan="3">{invoiceData.bank_branch},{invoiceData.state}</td>
//                     </tr>
//                   </table>
//                   <h6 style={{ marginBottom: "60px" }}>For <b>{invoiceData.company_name} </b> </h6>
//                   <address style={{ marginTop: "90px" }}>
//                     <h6 style={{ fontStyle: "italic", fontSize: "medium" }}>Authorized Signature</h6>
//                     <h3 className="text-danger">{invoiceData.company_name},</h3>
//                     <h6 className="m-l-5">{invoiceData.address}.</h6>
//                   </address>
//                   <hr />
//                   <h5 className='text-center'><b>{invoiceData.company_name}</b></h5>
//                   <h6 className='text-center' ><b>ph no: </b>+9012345678, <b>email:</b> pathbreakertech@gmail.com</h6>
//                 </div>

//               </div>
//             </div>
//           </div>
//           <div className="text-right" style={{ marginBottom: "30px" }}>
//             <button className="btn btn-danger" type="submit" onClick={downloadPdf}> Download </button>
//           </div>
//         </div>
//       </div>

//       {/* ============================================================== */}
//       {/* End PAge Content */}
//       {/* ============================================================== */}
//       {/* ============================================================== */}
//       {/* Right sidebar */}
//       {/* ============================================================== */}
//       {/* .right-sidebar */}
//       {/* ============================================================== */}
//       {/* End Right sidebar */}
//       {/* ============================================================== */}
//     </div>

//   )
// }

// export default InvoicePdf

import React, { useEffect, useRef, useState } from 'react';
import html2canvas from "html2canvas";
import jsPDF from "jspdf";
import { useLocation, useNavigate } from 'react-router-dom';
import { CalendarFill } from 'react-bootstrap-icons';
import { Slide, toast } from 'react-toastify';
import { InvoiceGenerateApi } from '../Axios';

const InvoicePdf = ({ showPreview, setShowPreview }) => {
  const [invoiceData, setInvoiceData] = useState({});
  const location = useLocation();
  const navigate = useNavigate();
  const pdfRef = useRef();

  // Fetch the invoice data when the component is mounted or invoiceId is updated
  useEffect(() => {
    const fetchData = async () => {
      try {
        if (location && location.state && location.state.invoiceId) {
          const response = await InvoiceGenerateApi(location.state.invoiceId);
          setInvoiceData(response.data.data); // Update the state with the fetched data
        } else {
          console.error('Invoice ID not found in location state');
        }
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, [location]);

  const downloadPdf = () => {
    toast.success('Download Successfully', {
      position: 'top-right',
      transition: Slide,
      hideProgressBar: true,
      theme: "colored",
      progress: 2,
      autoClose: 1000,
    });

    navigate('/Invoices');
    const input = pdfRef.current;
    html2canvas(input).then((canvas) => {
      const imgData = canvas.toDataURL('image/png');
      const pdf = new jsPDF('p', 'mm', 'a4', true);
      const pdfWidth = pdf.internal.pageSize.getWidth();
      const pdfHeight = pdf.internal.pageSize.getHeight();

      const img = new Image();
      img.src = imgData;
      img.onload = function () {
        const imgWidth = pdfWidth - 1; // Adjust the margin or padding as needed
        const imgHeight = (img.height * imgWidth) / 900;
        const imgX = 0; // Left margin
        const imgY = 0; // Center vertically
        pdf.addImage(img, 'PNG', imgX, imgY, imgWidth, imgHeight);
        pdf.save('invoice.pdf');
      };
    });
  };

  // Check if the invoice data is available, if not show a loading spinner
  if (!invoiceData.invoiceNumber) {
    return (
      <div className="preloader">
        <div className="lds-ripple">
          <div className="lds-pos" />
          <div className="lds-pos" />
          <div><h4>Loading.....</h4></div>
        </div>
      </div>
    );
  }

  return (
    <div className="container-fluid" style={{ width: "900px" }}>
      {/* ============================================================== */}
      {/* Start Page Content */}
      {/* ============================================================== */}
      <div className="row">
        <div className="col-md-12">
          <div className="card card-body printableArea bg-white" ref={pdfRef}>
            <img src="assets/images/pathbreaker_logo.png" style={{ height: "60px", width: "155px" }} alt="logo" />
            <hr />
            <div className="row">
              {/* Billing Information */}
              <div className="col-md-6">
                <div className="text-left">
                  <address>
                    <h6 style={{ fontSize: "smaller" }}>Billed To,</h6>
                    <h4 className="font-small">{invoiceData.customerName}</h4>
                    <h6 className="m-l-30">{invoiceData.customerEmail}</h6>
                    <h6 className="m-l-30">Contact No: {invoiceData.contact}</h6>
                    <h6 className="m-l-30">GST: {invoiceData.gstNo}</h6>
                    <h6 className="m-l-30">{invoiceData.address}</h6>
                  </address>
                </div>
              </div>
              <div className='col-md-6 text-right'>
                <h5 className='text-right'><b style={{ fontSize: "smaller" }}>INVOICE -</b><span>{invoiceData.invoiceNumber}</span></h5>
                <p className="text-right mr-1">Invoice Date :&nbsp;<CalendarFill />&nbsp;<b className="m-l-30">{invoiceData.invoiceDate}</b></p>
                <p className="text-right mr-1">Due Date :&nbsp;<CalendarFill />&nbsp;<b className="m-l-30">{invoiceData.dueDate}</b></p>
              </div>

              {/* Invoice Table */}
              <div className="col-md-12">
                <div className="table-responsive m-t-40">
                  <table className="table table-hover">
                    <thead>
                      <tr>
                        <th className="text-center">#</th>
                        <th className="text-left">HSN-no</th>
                        <th className="text-left">Quantity</th>
                        <th className="text-left">GST (%)</th>
                        <th className="text-left">Unit Cost (₹)</th>
                        <th className="text-left">Total (₹)</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <td className="text-center">1</td>
                        <td className="text-left">{invoiceData.hsnNo}</td>
                        <td className="text-left">{invoiceData.quantity}</td>
                        <td className="text-left">{invoiceData.gst}</td>
                        <td className="text-left">{invoiceData.unitCost}</td>
                        <td className="text-left">{invoiceData.totalCost}</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>

              {/* Total Amount Section */}
              <div className="col-md-12">
                <table className=" table pull-right text-right">
                  {/* <tr className='col-md-12 ' style={{ paddingLeft: "5px" }}>
                    <th className="col-md-11"><b>Sub - Total amount:</b></th>
                    <td className="col-md-2">{invoiceData.totalCost}₹</td>
                  </tr> */}
                  <tr>
                    <th><b>GST ({invoiceData.gst}%):</b></th>
                    <td>{(invoiceData.totalCost * invoiceData.gst) / 100}₹</td>
                  </tr>
                  <tr style={{ borderBottom: "1px solid #dee2e6" }}>
                    <th><b>Total :</b></th>
                    <td>{invoiceData.totalAmount}₹</td>
                  </tr>
                  {/* <tr>
                    <p className='text-left ml-2'><b>In Words:</b> &nbsp;<em>{invoiceData.totalAmount} only/-</em></p>
                  </tr> */}
                </table>
                <div className='table-responsive'>
                  <table className='table'>
                    <tr>
                      <th colSpan="12" style={{ fontSize: "medium" }}>Bank Details</th>
                    </tr>
                    <tr>
                      <th>Bank Name</th>
                      <td>{invoiceData.bankName}</td>
                      <th>Pan Number</th>
                      <td>{invoiceData.panNo}</td>
                    </tr>
                    <tr>
                      <th>Account Number</th>
                      <td>{invoiceData.accountNo}</td>
                      <th>GST Number</th>
                      <td>{invoiceData.gstNo}</td>
                    </tr>
                    <tr>
                      <th>IFSC Code</th>
                      <td>{invoiceData.ifscCodeBranch}</td>
                      <th></th>
                      <th></th>
                    </tr>
                  </table>
                </div>

                {/* Footer Section */}
                {/* <h6 style={{ marginBottom: "60px" }}>For <b>{invoiceData.companyName}</b> </h6> */}
              </div>
            </div>
          </div>
          <div className="text-right" style={{ marginBottom: "30px" }}>
            <button className="btn btn-danger" type="submit" onClick={downloadPdf}>Download</button>
          </div>
        </div>
      </div>
      {/* ============================================================== */}
      {/* End Page Content */}
      {/* ============================================================== */}
    </div>
  );
};

export default InvoicePdf;

