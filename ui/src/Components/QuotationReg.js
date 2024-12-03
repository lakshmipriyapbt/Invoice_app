import React, { useState, useEffect } from "react";
import { useForm, Controller, useFieldArray } from 'react-hook-form'
import { useLocation, useNavigate, Link } from "react-router-dom";
import TopNav from '../Pages/TopNav'
import SideNav from '../Pages/SideNav'
import Footer from "../Pages/Footer"
//import { XSquareFill } from "react-bootstrap-icons/dist";
import Select from 'react-select';
import DatePicker from "react-datepicker";
import 'react-datepicker/dist/react-datepicker.module.css'
//import { Calendar4 } from "react-bootstrap-icons/dist";
import moment from "moment/moment";
import { Slide, toast } from 'react-toastify';
import InvoicePdf from "./InvoicePdf";
import InvoicePreview from "./InvoicePreview";
import e from "cors";
import { HandbagFill } from "react-bootstrap-icons";
import { CustomerGetApi, InvoicePostApi, ProductsGetApi } from "../Axios";
//import { CalendarFill } from 'react-bootstrap-icons';


const QuotationReg = () => {
  const { register, handleSubmit, control, getValues, reset, setValue, formState: { errors } } = useForm();
  const [invoiceData, setInvoiceData] = useState(null)
  const [productsInfo, setProductsInfo] = useState([
    {
      productId: "",
      hsnNo: "",
      purchaseDate: "",
      no_of_units: "",
      cost_per_unit: ""
    }
  ]);
  const [showPreview, setShowPreview] = useState(false);
  const [seriesNumber, setSeriesNumber] = useState(0)
  const [productList, setProductList] = useState([]);
  const [customerList, setCustomerList] = useState([])
  const [customerData, setCustomerData] = useState('')
  const [formValues, setFormValues] = useState('')

  const navigate = useNavigate();
  //Creating Date
  let day = new Date();
  const date = `${day.getDate()}/${day.getMonth() + 1}/${day.getFullYear()}`;

  const togglePreview = (e) => {
    e.preventDefault()
    setShowPreview(true)
    const formValues = getValues();
    console.log(formValues)
    // let selectedCustomer=customerList.find(cust => cust.value === handleCustomerSelect.value)
    // setInvoiceData({...formValues,selectedCustomer})
  };
  // const handleCustomerSelect = (selectedCustomer) => {
  //   console.log("$$$$$$", selectedCustomer)
  //   // setValue("customer",selectedCustomer.value);
  //   // Find the selected customer details
  //   // const selectedCustomerData = customerList.find(cust => cust.value === selectedCustomer.value);
  //   // if (selectedCustomerData) {
  //   setInvoiceData(selectedCustomer);
  //   // }
  // };

  //  const handlePreview=(invoiceData)=>{
  //   setPreviewData(invoiceData);
  //   togglePreview();
  //   console.log(previewData);
  //  }

  //Adding Products info
  const AddProductsInfo = () => {
    const formData = getValues();
    const newItem = { hsn_no: "", purchase_date: "", no_of_units: "", product_cost: "" };
    setProductsInfo((oldValue) => {
      const newArray = []
      for (let i = 0; i < oldValue.length; i++) {
        newArray.push(oldValue[i])
      }
      newArray.push(newItem)
      return newArray
    })
    // formData.productsInfo.push({ hsn_no: "", purchase_date: "", no_of_units: "", product_cost: "" });
    // reset(formData);
    // setProductsInfo([...formData.productsInfo]);

  }

  //Adding function to delete the Prodcut Details
  const handleDelete = (index) => {
    const updatedProducts = [...productsInfo];
    updatedProducts.splice(index, 1);
    setProductsInfo(updatedProducts);
  }

  //Auto generating Invoice Number//
  const generateSeriesNumber = () => {
    const nextNumber = productsInfo.length + 1;
    // Set the updated series number in the state
    setSeriesNumber(nextNumber);
    //  console.log(nextNumber);
    return `INV/${day.getFullYear().toString().substring(2, 4)}/${nextNumber}`;
  };

  //  const location = useLocation();
  //submitting the Data
  const onSubmit = (x) => {
    //e.preventDefault();
    // const serializedData = JSON.stringify(x);
    // console.log(x)

    x.customer = x.customer.name
    x.invoice_number = generateSeriesNumber();
    // const [selectedCustomer,setSelectedCustomer]=useState(null)
    const selectedCustomer = customerList.find(cust => cust.value === x.customerData);
    if (selectedCustomer) {
      setCustomerData(selectedCustomer);
    }
    console.log(x);
    //setInvoiceData(serializedData);
    const y = x.productsInfo.map(item => {
      let obj = { ...item }
      obj.purchase_date = moment(moment(day, 'DD-MM_YYYY')).format('YYYY-MM-DD');
      console.log(obj);
      return (obj);
    })
    x.product_details = y;
    delete x.y;
    delete x.productsInfo
    //const invoiceData={x,selectedCustomer}
    delete x.invoiceData
    setInvoiceData(invoiceData);
    //console.log(invoiceData);
    //if statement for preview and submit button
    // if(!showPreview){
    //   setShowPreview(false);
    //   console.log(showPreview);
    // }else{
    InvoicePostApi(x)
      .then((response) => {
        toast.success('Register Successfully', {  //Notification status
          position: 'top-right',
          transition: Slide,
          hideProgressBar: true,
          theme: "colored",
          autoClose: 1000, // Close the toast after 1 seconds
        });
        // console.log(invoiceData);
        setShowPreview(true)
        console.log(response.data)

        //  navigate('/Invoices')
      })
      .catch(errors => {
        toast.error('Invalid Credentials', {  //Notification status
          position: 'top-right',
          autoClose: 1000, // Close the toast after 1 seconds
        });
        console.log(errors)
      });
  }

  const handleCustomerSelect = (selectedCustomer) => {
    console.log("$$$$$$", selectedCustomer)

    // setValue("customer",selectedCustomer.value);
    // Find the selected customer details
    // const selectedCustomerData = customerList.find(cust => cust.value === selectedCustomer.value);
    // if (selectedCustomerData) {
    setInvoiceData(selectedCustomer);
    // }
  };

  // useEffect(() => {
  //   CustomerGetApi()
  //     .then((response) => {
  //        console.log(response.data.data)
  //        setCustomerData(response.data.data);
  //       const Cus = response.data.data.map(list => {
  //         let object = {
  //           label: list.customerName,
  //           value: list.customerName,
  //           name: list.customerName,
  //           mobile_number: list.mobileNumber,
  //           customer_address: list.address,
  //           gst_number: list.gstNo,
  //           mail_id: list.email,
  //           state: list.state,
  //           pin_code: list.pinCode,
  //           customer_id: list.customerId
  //         }
  //         return object;
  //       })
  //       setCustomerList(Cus);
  //       console.log(Cus);
  //     })
  //     .catch(error => {
  //       setCustomerList(error);
  //     })
  // }, [])

  // useEffect(() => {
  //   ProductsGetApi()
  //     .then((response) => {
  //       console.log(response.data.data)
  //       const Details = response.data.data.map(list => {
  //         let obj = { label: list.productName, value: list.productName, hsnNo: list.hsnNo, productCost: list.productCost }
  //         return (obj);
  //       })
  //       setProductList(Details);
  //     })
  //     .catch(error => {
  //       setProductList(error);
  //     })
  // }, [])

  // { if(showPreview) (
  //   // Render preview content here
  //   <div>
  //     {/* Display the preview of the data */}

  //     <button onClick={togglePreview}>Edit</button>
  //     <button onClick={onSubmit}>Submit</button>
  //   </div>
  // ) 

  //   }
  return (
    <div id="main-wrapper" data-sidebartype="mini-sidebar">
      <TopNav />
      <SideNav />
      <div className="page-breadcrumb" style={{ width: "78%", marginLeft: "280px", marginTop: "28px" }}>
        <div className="row">
          <div className="col-12 d-flex no-block align-items-center">
            <h4 className="page-title" style={{ color: "blue" }}>Quotation Registration</h4>
            <div className="ml-auto text-right">
              <nav aria-label="breadcrumb">
                <ol className="breadcrumb">
                  <li className="breadcrumb-item"><Link to={'/main'}>Home</Link></li>
                  <li className="breadcrumb-item"><Link to={'/Invoices'}>Quotation</Link></li>
                  <li className="breadcrumb-item active" aria-current="page">Quotation Registration</li>
                </ol>
              </nav>
            </div>
          </div>
        </div>
      </div>
      <div className='container-fliuid'>
        <div className='row'>
          <div className='col-md-9 ' style={{ marginLeft: "300px", paddingTop: "50px" }}>
            <div className="card">
              <form className="form-horizontal" onSubmit={handleSubmit(onSubmit)}>{/**onSubmit={togglePreview} */}
                <div className="card-body">
                  <h4 className="card-title ml-1">Quotation Info</h4>
                  <div className="form-group row mt-5">
                    <label htmlFor="customer" className="col-sm-3 text-right control-label col-form-label">Customer Name</label>
                    <div className="col-sm-9">
                      <Controller
                        name="customer"
                        id="customer"
                        control={control}
                        rules={{ required: true }}
                        render={({ field }) => (
                          <Select {...field} options={customerList} onChange={(data) => { handleCustomerSelect(data) }} />
                        )}
                      />
                    </div>
                    {errors.customer && (
                      <p className="errorsMsg">Select Customer Name</p>)}
                  </div>
                  <div className="form-group row">
                    <label htmlFor="purchase_order" className="col-sm-3 text-right control-label col-form-label">Purchase Order</label>
                    <div className="col-sm-9">
                      <input type="text" className="form-control" name="purchase_order" id="purchase_order" placeholder="Enter Purchase Order"
                        {...register("purchase_order", {
                          required: 'Enter Purchase Order'
                        })}
                      />
                    </div>
                    {errors.purchase_order && (<p className="errorsMsg">{errors.purchase_order.message}</p>)}
                  </div>
                  <div className="form-group row">
                    <label htmlFor="vendor_code" className="col-sm-3 text-right control-label col-form-label">Vendor Code:</label>
                    <div className="col-sm-9">
                      <input type="text" className="form-control" name="vendor_code" id="vendor_code" placeholder="Enter Vendor Code"
                        {...register("vendor_code", {
                          required: " Enter vendor_code"
                        })}
                      />
                    </div>
                    {errors.vendor_code && (<p className="errorsMsg">{errors.vendor_code.message}</p>)}
                  </div>
                  <div className="form-group row">
                    <label htmlFor="invoice_date" className="col-sm-3 text-right control-label col-form-label">Invoice Date</label>
                    <div className="col-sm-9">
                      <input type="date" className="form-control" name="invoice_date" id="invoice_date" placeholder="Enter Invoice Date "
                        {...register("invoice_date", {
                          required: 'Enter date'
                        })}
                      />
                    </div>
                    {errors.invoice_date && (<p className="errorsMsg">{errors.invoice_date.message}</p>)}
                  </div>
                  <div className="form-group row">
                    <label htmlFor="invoice_number" className="col-sm-3 text-right control-label col-form-label">Invoice Number</label>
                    <div className="col-sm-9">
                      <input type="text" className="form-control" name="invoice_number" id="invoice_number" onChange={(e) => setSeriesNumber(e.target.value)} placeholder="Enter Invoice Number"
                      />
                    </div>
                  </div>
                  <div className="row">
                    <h5 className="card-title ml-3">Product Details</h5>
                    <button type="button"
                      onClick={AddProductsInfo}
                      className="btn btn-secondary" style={{ marginLeft: "80%" }} >Add More </button>
                  </div>
                  <div className="form-group row">
                    <div className="col-sm-12" style={{ marginLeft: "5%" }} >
                      {productsInfo && productsInfo.length > 0 &&
                        productsInfo.map((item, index) => (
                          <div key={item.id} className="row">
                            <div className="form-group col-sm-2 ml-2 mt-2 mt-2">
                              <div className="row">
                                {errors.productId && (
                                  <p className="errorMsgs">*</p>)}
                                <label htmlFor="productId" className="text-right control-label col-form-label pb-2">Product Name</label>
                              </div>
                              <Controller
                                control={control}
                                defaultValue={""}   
                                name="productId"
                                rules={{ required: true }}
                                render={({ onChange, value, name, ref }) => (
                                  <Select
                                    // inputRef={ref}
                                    classNamePrefix="addl-class"
                                    options={productList}
                                    // value={productList.find((e) => e.value === value)}
                                    onChange={(val) => {
                                      setValue(`productsInfo[${index}][productId]`, val.value);
                                      setValue(`productsInfo[${index}][product_cost]`, val.product_cost);
                                      setValue(`productsInfo[${index}][hsn_no]`, val.hsn_no)
                                    }}
                                  />
                                )}
                              />

                              {/* 
                              <Controller
                                name="productId"
                                /**{`productsInfo[${index}][productId]`} 
                                {...register(`productsInfo[${index}][productId]`)}
                                id="productId"
                                control={control}
                                render={({ field }) => (
                                  <Select
                                    {...field}
                                    options={productList}
                                    value={productList.find((e) => e.field === field)}
                                    onChange={(val) => {
                                      setValue(`productsInfo[${index}][productId]`, val.value);
                                      setValue(`productsInfo[${index}][product_cost]`, val.product_cost);
                                      setValue(`productsInfo[${index}][hsn_no]`, val.hsn_no)
                                    }}
                                  />
                                )}
                              /> */}
                              {/* <select id={`product_name_${index}`} options={productList} name={`product_name_${index}`} onChange={(e) => console.log(e)} {...register(`test.${index}.product_name`)}/>                             */}
                            </div>
                            <div className="form-group row col-sm-2 ml-2">
                              {errors.productsInfo && errors.productsInfo[index] && errors.productsInfo[index].hsn_no && (
                                <p className="errorMsgs">*</p>
                              )}
                              <label htmlFor="cost_per_unit" className=" text-right control-label col-form-label">HSN No</label>
                              <input className="form-control" type="text" id="hsn_no" name="hsn_no" {...register(`productsInfo[${index}][hsn_no]`, { required: "true" })}  /**{`productsInfo[${index}][hsn_no]`} */
                              />
                            </div>
                            <div className="form-group row col-sm-2 ml-2">
                              {errors.productsInfo && errors.productsInfo[index] && errors.productsInfo[index].purchase_date && (
                                <p className="errorMsgs">*</p>
                              )}
                              <label htmlFor="purchase_date" className=" text-right control-label col-form-label">Purchase Date</label>
                              <input className="form-control" id="purchase_date" name="purchase_date" type="date" /**{`productsInfo[${index}][purchase_date]`} */ {...register(`productsInfo[${index}][purchase_date]`, { required: 'true' })} />
                            </div>
                            <div className="form-group row col-sm-2 ml-2">
                              {errors.productsInfo && errors.productsInfo[index] && errors.productsInfo[index].no_of_units && (
                                <p className="errorMsgs">*</p>
                              )}
                              <label htmlFor="no_of_units" className="text-right control-label col-form-label">Quantity</label>
                              <input className="form-control" id="no_of_units" name="no_of_units" type="number" /**{`productsInfo[${index}[no_of_units]`} */ {...register(`productsInfo[${index}][no_of_units]`, { required: 'true' })}
                              />
                            </div>
                            {/* {errors.no_of_units && (<p className="errorsMsg">{errors.no_of_units.message}</p>)} */}

                            <div className="form-group row col-sm-2 ml-2">
                              {errors.productsInfo && errors.productsInfo[index] && errors.productsInfo[index].product_cost && (
                                <p className="errorMsgs">*</p>
                              )}
                              <label htmlFor="cost_per_unit" className=" text-right control-label col-form-label">Cost</label>
                              <input className="form-control" type="text" id="product_cost" name="product_cost"  {...register(`productsInfo[${index}][product_cost]`, { required: 'true' })}
                              />{/** {`productsInfo[${index}][cost_per_unit]`}*/}
                            </div>
                            {/* {errors.cost_per_unit && (<p className="errorsMsg">{errors.cost_per_unit.message}</p>)} */}
                            <div className="card-body mt-4">
                              <button className="btn btn-danger"
                                onClick={() => handleDelete(index)}
                              >Delete</button>
                            </div>
                          </div>
                        ))}
                    </div>
                  </div>
                </div>
                <div className="border-top">
                  <div className="card-body">
                    {/* <input type="hidden" {...register('invoiceData.customer_details')} value={JSON.stringify(customerList)} />                   */}
                    <button className="btn btn-primary" style={{ marginLeft: "450px" }} onClick={(e) => togglePreview(e)}>Preview</button>
                    {showPreview && (
                      <div>
                        {invoiceData && (
                          <InvoicePreview invoiceData={invoiceData} />
                        )}
                        <button onClick={() => setShowPreview(false)}>Edit</button>
                        <button type="submit">Submit</button>
                      </div>
                    )
                    }
                  </div>
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
export default QuotationReg;
 