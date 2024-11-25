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

  // Fetch the invoice data
  useEffect(() => {
    const fetchData = async () => {
      try {
        if (location && location.state && location.state.invoiceId) {
          const response = await InvoiceGenerateApi(location.state.invoiceId);
          setInvoiceData(response.data.data);
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
        const imgWidth = pdfWidth - 1;
        const imgHeight = (img.height * imgWidth) / 900;
        const imgX = 0;
        const imgY = 0;
        pdf.addImage(img, 'PNG', imgX, imgY, imgWidth, imgHeight);
        pdf.save('invoice.pdf');
      };
    });
  };

  return (
    <div className="container-fluid" style={{ width: "900px" }}>
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
                    <h6 className="m-l-30">{invoiceData.email}</h6>
                    <h6 className="m-l-30">Contact No: {invoiceData.phone}</h6>
                    <h6 className="m-l-30">GST: {invoiceData.gstNumber}</h6>
                    <h6 className="m-l-30">{invoiceData.address}</h6>
                  </address>
                </div>
              </div>
              <div className="col-md-6 text-right">
                <h5><b style={{ fontSize: "smaller" }}>INVOICE -</b><span>{invoiceData.invoiceNumber}</span></h5>
                <p>Invoice Date : <CalendarFill /> <b>{invoiceData.invoiceDate}</b></p>
                <p>Due Date : <CalendarFill /> <b>{invoiceData.dueDate}</b></p>
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
                        <th className="text-left">Total Amount(₹)</th>
                      </tr>
                    </thead>
                    <tbody>
                      {invoiceData.orderDetails && invoiceData.orderDetails.map((item, index) => (
                        <tr key={index}>
                          <td className="text-center">{index + 1}</td>
                          <td className="text-left">{item.hsnNo}</td>
                          <td className="text-left">{item.quantity}</td>
                          <td className="text-left">{item.gst}</td>
                          <td className="text-left">{item.cost}</td>
                          <td className="text-left">{item.totalCost}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>

              {/* Total Amount Section */}
              <div className="col-md-12">
                <table className="table pull-right text-right">
                  <tr>
                    <th><b>GST ({invoiceData.gst || 0}%):</b></th>
                    <td>₹{((invoiceData.totalAmount || 0) * (invoiceData.gst || 0)) / 100}</td>
                  </tr>
                  <tr>
                    <th><b>Grand Total :</b></th>
                    <td>₹{invoiceData.totalAmount}</td>
                  </tr>
                </table>
                <div className="table-responsive">
                  <table className="table">
                    <tr>
                      <th colSpan="12" style={{ fontSize: "medium" }}>Bank Details</th>
                    </tr>
                    <tr>
                      <th>Bank Name</th>
                      <td>{invoiceData.bankName}</td>
                      <th>Pan Number</th>
                      <td>{invoiceData.pan}</td>
                    </tr>
                    <tr>
                      <th>Account Number</th>
                      <td>{invoiceData.bankAccount}</td>
                      <th>GST Number</th>
                      <td>{invoiceData.gstNumber}</td>
                    </tr>
                    <tr>
                      <th>IFSC Code</th>
                      <td>{invoiceData.ifscCode}</td>
                      <td></td>
                      <td></td>
                    </tr>
                  </table>
                </div>
              </div>
            </div>
          </div>
          <div className="text-right" style={{ marginBottom: "30px" }}>
            <button className="btn btn-danger" onClick={downloadPdf}>Download</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default InvoicePdf;
