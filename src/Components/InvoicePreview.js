import React from 'react'
import { CalendarFill } from 'react-bootstrap-icons';
const InvoicePreview = ({ invoiceData, formValues }) => {

  return (
    <div className="modal fade" id="Modal3" tabIndex={-1} role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
      <div className="modal-dialog" role="document">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title" id="exampleModalLabel">Invoice-Application</h5>
            <button type="button" className="close" data-dismiss="modal" aria-label="Close">
              <span aria-hidden="true">×</span>
            </button>
          </div>
          <div className="modal-body">
            {/* Preview page */}
            <div className="row">
              <div className="col-md-12">
                <div className="card card-body printableArea bg-white">
                  <img src="assets/images/pathbreaker_logo.png" style={{ height: "60px", width: "155px" }} alt="logo" />
                  <hr />
                  <div className="row">
                    <div className="col-md-6">
                      <div className="text-left">
                        <address>
                          <h6 style={{ fontSize: "smaller" }}>Billed To,</h6>
                          <h4 className="font-small">Name:{invoiceData.value}</h4>
                          <h6 className="m-l-30">Mail-Id:{invoiceData.mail_id},</h6>
                          <h6 className="m-l-30">Contact No: {invoiceData.mobile_number},</h6>
                          <h6 className="m-l-30">GST: {invoiceData.gst_number},</h6>
                          <h6 className="m-l-30">Address:{invoiceData.customer_address},{invoiceData.state}</h6>
                        </address>
                      </div>
                    </div>
                    <div className=' col-md-6 text-right'>
                      <h5 className='text-right'><b style={{ fontSize: "smaller" }}>INVOICE -</b><span>{invoiceData.invoice_no}</span></h5>
                      <p className="text-right mr-1">Invoice Date :&nbsp;<CalendarFill />&nbsp;<b className="m-l-30">{invoiceData.invoice_date}</b></p>
                      {/* <p className="text-right mr-1">Due Date :&nbsp;<CalendarFill/>&nbsp;<b className="m-l-30 ">{invoiceData.expiration_date}</b></p> */}
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
                            {invoiceData && Array.isArray(invoiceData.product_details) ? (
                              invoiceData.product_details.map((item, index) => (
                                <tr key={index}>
                                  <td className="text-center">{index + 1}</td>
                                  <td className="text-left">{item.product_name}</td>
                                  <td className="text-left">{item.hsn_no}</td>
                                  <td className="text-left">{item.no_of_units}</td>
                                  <td className="text-left">{item.gst_rate}</td>
                                  <td className="text-left">{item.product_cost}</td>
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
                        <tr className='col-md-12 ' style={{ paddingLeft: "5px" }}>
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
                        <tr style={{ borderBottom: "1px solid #dee2e6" }}>
                          <th ><b>Total :</b></th>
                          <td>{invoiceData.total}₹</td>
                        </tr>
                        <tr>
                          <p className='text-left ml-2'><b>In Words:</b> &nbsp;<em>{invoiceData.amount_in_words}</em>&nbsp;only/-</p>
                        </tr>

                      </table>
                      <p style={{ fontStyle: "italic" }}>The Payment should be made favouring <b>{invoiceData.company_name}</b> or Direct deposit information given below.</p>
                      <div className='table-responsive'>
                        <table className='table'>
                          <tr>
                            <th colSpan="12" style={{ fontSize: "medium" }}>NEFT Information</th>
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
                        <h6 style={{ marginBottom: "60px" }}>For <b>{invoiceData.company_name} </b> </h6>
                        <address style={{ marginTop: "90px" }}>
                          <h6 style={{ fontStyle: "italic", fontSize: "medium" }}>Authorized Signature</h6>
                          <h3 className="text-danger">{invoiceData.company_name},</h3>
                          <h6 className="m-l-5">{invoiceData.address}.</h6>
                        </address>
                        <hr />
                        <h5 className='text-center'><b>{invoiceData.company_name}</b></h5>
                        <h6 className='text-center' ><b>ph no: </b>+9012345678, <b>email:</b> pathbreakertech@gmail.com</h6>
                      </div>

                    </div>
                  </div>
                </div>
                {/* <div className="text-right" style={{marginBottom:"30px"}}>{/**onClick={downloadPdf} 
        <button className="btn btn-danger" type="submit" > Submit</button>
      </div> */}
              </div>
            </div>
          </div>
          <div className="modal-footer">
            <button type="button" className="btn btn-secondary" data-dismiss="modal">Close</button>
          </div>
        </div>
      </div>
    </div>



  )
}

export default InvoicePreview