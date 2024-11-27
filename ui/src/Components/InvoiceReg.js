import React, { useState, useEffect } from 'react';
import { useForm, Controller } from 'react-hook-form';
import { useNavigate, useLocation, Link } from 'react-router-dom';
import axios from 'axios';
import { toast } from 'react-toastify';
import moment from 'moment';
import TopNav from '../Pages/TopNav';
import SideNav from '../Pages/SideNav';
import Footer from "../Pages/Footer";
import { InvoicePutApiById, InvoiceGetApiById, CustomerGetApi, InvoicePostApi } from '../Axios';
import InvoicePreview from './InvoicePreview';
import { Slide } from 'react-toastify';
import Select from 'react-select'
import { useDispatch, useSelector } from 'react-redux';
import { fetchCustomers } from '../redux/CustomerSlice';  // Import the fetchCustomers action
import { fetchAllProducts } from '../redux/ProductSlice'; // Import the fetchAllProducts action
import { selectProducts,selectCustomers } from '../redux/Store'; // Selectors for loading states




const InvoiceReg = () => {
  const { register, handleSubmit, control, setValue, reset, formState: { errors } } = useForm();
  // Select data from Redux store
  const customers = useSelector(selectCustomers) || []; // Ensure it's an array
  const products = useSelector(selectProducts);
  const [invoiceData, setInvoiceData] = useState(null);
  const [productsInfo, setProductsInfo] = useState([{ productName: '', hsnNo: '', purchaseDate: '', quantity: '', productCost: '' }]);
  const [showPreview, setShowPreview] = useState(false);
  const [invoiceId, setInvoiceId] = useState(null); // to handle edit case
  const [load, setLoad] = useState(false); // to manage loading state for API calls
  const [customer, setCustomer] = useState(customers); // List of customers for the dropdown
  const [formattedProducts, setFormattedProducts] = useState(products);
  const navigate = useNavigate();
  const location = useLocation();
  const dispatch = useDispatch();


  console.log("customer", customer);
  console.log("formattedProducts", formattedProducts)

  useEffect(() => {
    dispatch(fetchCustomers());
    dispatch(fetchAllProducts());
  }, [dispatch]);

  useEffect(() => {
    const productOptions = Array.isArray(products) ? products.map((product) => ({
      value: product.productId,
      label: product.productName,
      hsnNo: product.hsnNo,
      productCost: product.cost,
    })) : [];
    setFormattedProducts(productOptions);
    console.log("this is from product options ", productOptions);
  }, [products]);

  console.log("this is from product options ", formattedProducts);


  const handleCustomerChange = (selectedOption) => {
    setInvoiceData(selectedOption)
    console.log("selectedOption", selectedOption);
    setValue('vendorCode', selectedOption.value);
  };

  // Function to auto-generate invoice number
  const generateInvoiceNumber = () => {
    const currentDate = moment().format('YYYYMMDD');
    const randomSuffix = Math.floor(Math.random() * 10000);
    return `${currentDate}-${randomSuffix}`;
  };

  useEffect(() => {
    // Check if customers is an array before using map
    const customerOptions = Array.isArray(customers) ? customers.map((cust) => ({
      value: cust.customerId,
      label: cust.customerName,
    })) : [];

    setCustomer(customerOptions);
    console.log(customerOptions);
  }, [customers]);

  console.log("this is from customers options ", customer);

  const handleProductChange = (selectedValue, index) => {
    // Find the selected product
    const selectedProduct = formattedProducts.find(
      (product) => product.value === selectedValue
    );
  
    if (selectedProduct) {
      // Update local state
      const updatedProductsInfo = [...productsInfo];
      updatedProductsInfo[index] = {
        ...updatedProductsInfo[index],
        productId: selectedProduct.value,
        hsnNo: selectedProduct.hsnNo,
        productCost: selectedProduct.productCost,
      };
      setProductsInfo(updatedProductsInfo);
  
      // Update React Hook Form values
      setValue(`productsInfo[${index}].productId`, selectedProduct.value);
      setValue(`productsInfo[${index}].hsnNo`, selectedProduct.hsnNo);
      setValue(`productsInfo[${index}].productCost`, selectedProduct.productCost);
  
      console.log("Updated Products Info: ", updatedProductsInfo); // Debugging log
    }
  };
  
  

  // Function to set default invoice date
  const getDefaultInvoiceDate = () => {
    return moment().format('YYYY-MM-DD');
  };


  // Fetch invoice details on load if invoiceId exists
  const onSubmit = async (data) => {
    console.log("InvoiceRegdata", data)
    setLoad(true); // Show loading spinner or indicator
    try {
      // Construct the request payload in the correct format
      const invoiceDataToSend = {
        customerName: data.customerName.label,
        purchaseOrder: data.purchaseOrder,
        vendorCode: data.vendorCode,
        invoiceDate: data.invoiceDate,
        invoiceNumber: data.invoiceNumber,
        orderRequests: data.productsInfo.map(product => ({
          productId: product.productId,
          hsnNo: product.hsnNo,
          purchaseDate: product.purchaseDate,
          quantity: product.quantity,
        })),
        status: "Active", // You can set the status based on your business logic
      };
      console.log("invoiceDataToSend", invoiceDataToSend)

      if (invoiceId) {
        // If invoiceId exists, send a PUT request to update the existing invoice
        const response = await InvoicePutApiById(invoiceId, invoiceDataToSend);
        toast.success('Invoice updated successfully', { position: 'top-right', autoClose: 1000 });
      } else {
        // If invoiceId does not exist, send a POST request to create a new invoice
        const response = await InvoicePostApi(invoiceDataToSend);
        toast.success('Invoice created successfully', { position: 'top-right', autoClose: 1000 });
        navigate("/Invoices")
      }

      // Update the local invoice data with the response
      setInvoiceData({
        ...data,
        product_details: productsInfo, // Make sure product details are included
      });

      setShowPreview(true); // Show the preview on successful submission
    } catch (error) {
      toast.error('Failed to save invoice', { position: 'top-right', autoClose: 1000 });
    } finally {
      setLoad(false); // Hide the loading indicator
    }
  };

  useEffect(() => {
    const fetchInvoiceData = async () => {
      if (location.state && location.state.invoiceId) {
        setInvoiceId(location.state.invoiceId);
        try {
          const response = await InvoiceGetApiById(location.state.invoiceId);
          const invoiceDetails = response.data;
          reset(invoiceDetails);
          setProductsInfo(invoiceDetails.product_details || []);
        } catch (error) {
          toast.error('Error fetching invoice data', { position: 'top-right', autoClose: 1000 });
        }
      }
    };
    fetchInvoiceData();
  }, [location, reset]);

  // Automatically populate invoice number and date if they are not provided
  useEffect(() => {
    if (!invoiceId) {
      // Set default invoice number and date on new invoice creation
      setValue("invoiceNumber", generateInvoiceNumber());
      setValue("invoiceDate", getDefaultInvoiceDate());
    }
  }, [invoiceId, setValue]);

  const togglePreview = (e) => {
    e.preventDefault();
    setShowPreview(true);
  };

  // For managing the products dynamically
  const AddProductsInfo = () => {
    setProductsInfo([...productsInfo, { productId: '', hsnNo: '', purchaseDate: '', quantity: '', productCost: '' }]);
  };

  const handleDelete = (index) => {
    const updatedProducts = [...productsInfo];
    updatedProducts.splice(index, 1);
    setProductsInfo(updatedProducts);
  };
  


  return (
    <div id="main-wrapper" data-sidebartype="mini-sidebar">
      <TopNav />
      <SideNav />
      <div className="page-breadcrumb" style={{ width: "78%", marginLeft: "280px", marginTop: "28px" }}>
        <div className="row">
          <div className="col-12 d-flex no-block align-items-center">
            <h4 className="page-title" style={{ color: "blue" }}>Invoice Registration</h4>
            <div className="ml-auto text-right">
              <nav aria-label="breadcrumb">
                <ol className="breadcrumb">
                  <li className="breadcrumb-item"><Link to={'/'}>Home</Link></li>
                  <li className="breadcrumb-item"><Link to={'/Invoices'}>Invoice List</Link></li>
                  <li className="breadcrumb-item active" aria-current="page">Invoice Registration</li>
                </ol>
              </nav>
            </div>
          </div>
        </div>
      </div>

      <div className='container-fluid'>
        <div className='row'>
          <div className='col-md-9' style={{ marginLeft: "300px", paddingTop: "50px" }}>
            <div className="card">
              <form className="form-horizontal" onSubmit={handleSubmit(onSubmit)}>
                <div className="card-body">
                  <h4 className="card-title ml-1">Invoice Info</h4>

                  {/* Customer Name Dropdown */}
                  <div className="form-group row mt-5">
                    <label htmlFor="customer" className="col-sm-3 text-right control-label col-form-label">Customer Name</label>
                    <div className="col-sm-9">
                      <Controller
                        name="customerName"
                        id="customerName"
                        control={control}
                        rules={{ required: true }}
                        render={({ field }) => (
                          <Select
                            {...field} // Spread the controller's field props
                            options={customer} // Pass the formatted customer options
                            onChange={(selectedOption) => {
                              handleCustomerChange(selectedOption); // Handle the change event
                              field.onChange(selectedOption); // Ensure react-hook-form is updated
                            }}
                            getOptionLabel={(e) => e.label} // Customizing label if needed
                            getOptionValue={(e) => e.value} // Customizing value if needed

                          />
                        )}
                      />
                    </div>
                    {errors.customerName && <p className="errorMsg">{errors.customerName.message}</p>}
                  </div>

                  {/* Vendor Code */}
                  <div className="form-group row">
                    <label htmlFor="vendorCode" className="col-sm-3 text-right control-label col-form-label">Vendor Code</label>
                    <div className="col-sm-9">
                      <input
                        type="text"
                        className="form-control"
                        name="vendorCode"
                        id="vendorCode"
                        {...register("vendorCode")}
                        readOnly  // You can set this field to read-only, as it is automatically populated
                      />
                    </div>
                  </div>
                  {/* purchase order */}
                  <div className="form-group row">
                    <label htmlFor="purchaseOrder" className="col-sm-3 text-right control-label col-form-label">Purchase Order</label>
                    <div className="col-sm-9">
                      <input type="text" className="form-control" name="purchaseOrder" id="purchaseOrder" placeholder="Enter Purchase Order"
                        {...register("purchaseOrder", {
                          required: 'Enter Purchase Order'
                        })}
                      />
                    </div>
                    {errors.purchaseOrder && (<p className="errorsMsg">{errors.purchaseOrder.message}</p>)}
                  </div>
                  {/* Invoice Number */}
                  <div className="form-group row">
                    <label htmlFor="invoiceNumber" className="col-sm-3 text-right control-label col-form-label">Invoice Number</label>
                    <div className="col-sm-9">
                      <input type="text" className="form-control" id="invoiceNumber" name="invoiceNumber"
                        {...register("invoiceNumber", { required: "Invoice number is required" })} />
                    </div>
                    {errors.invoiceNumber && <p className="errorMsg">{errors.invoiceNumber.message}</p>}
                  </div>

                  {/* Invoice Date */}
                  <div className="form-group row">
                    <label htmlFor="invoiceDate" className="col-sm-3 text-right control-label col-form-label">Invoice Date</label>
                    <div className="col-sm-9">
                      <input type="date" className="form-control" name="invoiceDate" id="invoiceDate"
                        {...register("invoiceDate", { required: "Invoice date is required" })} />
                    </div>
                    {errors.invoiceDate && <p className="errorMsg">{errors.invoiceDate.message}</p>}
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
                          <div key={index} className="row">
                            <div className="form-group col-sm-2 ml-2 mt-2 mt-2">
                              <div className="row">
                                {errors.productId && (
                                  <p className="errorMsgs">*</p>)}
                                <label htmlFor="productId" className="text-right control-label col-form-label pb-2">Product Id</label>
                              </div>
                              <Controller
                                name={`productsInfo[${index}].productId`}
                                control={control}
                                render={({ value }) => (
                                  <Select
                                    options={formattedProducts} // List of products
                                    value={formattedProducts.find((e) => e.value === value)} // Current selected value
                                    onChange={(selectedOption) => handleProductChange(selectedOption.value, index)} // Pass productId
                                  />
                                )}
                              />

                            </div>
                            <div className="form-group row col-sm-2 ml-2">
                              <label htmlFor={`hsnNo-${index}`} className="text-right control-label col-form-label">HSN No</label>
                              <input
                                type="text"
                                className="form-control"
                                id={`hsnNo-${index}`}
                                name={`productsInfo[${index}].hsnNo`}
                                value={productsInfo[index]?.hsnNo || ''} // Derive value from state
                                {...register(`productsInfo[${index}].hsnNo`)}
                                readOnly // Optional: Make this field read-only if it shouldn't be edited
                              />
                            </div>
                            <div className="form-group row col-sm-2 ml-2">
                              {errors.productsInfo && errors.productsInfo[index] && errors.productsInfo[index].purchaseDate && (
                                <p className="errorMsgs">*</p>
                              )}
                              <label htmlFor="purchaseDate" className=" text-right control-label col-form-label">Purchase Date</label>
                              <input className="form-control" id="purchaseDate" name="purchaseDate" type="date" /**{`productsInfo[${index}][purchaseDate]`} */ {...register(`productsInfo[${index}][purchaseDate]`, { required: 'true' })} />
                            </div>
                            <div className="form-group row col-sm-2 ml-2">
                              {errors.productsInfo && errors.productsInfo[index] && errors.productsInfo[index].quantity && (
                                <p className="errorMsgs">*</p>
                              )}
                              <label htmlFor="quantity" className="text-right control-label col-form-label">Quantity</label>
                              <input className="form-control" id="quantity" name="quantity" type="number"
                                {...register(`productsInfo[${index}][quantity]`, { required: 'true' })}
                              />
                            </div>
                            <div className="form-group row col-sm-2 ml-2">
                              {errors.productsInfo && errors.productsInfo[index] && errors.productsInfo[index].product_cost && (
                                <p className="errorMsgs">*</p>
                              )}
                              <label htmlFor="cost_per_unit" className=" text-right control-label col-form-label">Cost</label>
                              <input className="form-control" type="text" id="productCost" name="productCost" readOnly {...register(`productsInfo[${index}][productCost]`, { required: 'true' })}
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
                {/* <div className="border-top">
                  <div className="card-body"> */}
                {/* <input type="hidden" {...register('invoiceData.customer_details')} value={JSON.stringify(customerList)} />                   */}
                {/* <button className="btn btn-primary" style={{ marginLeft: "450px" }} onClick={(e) => togglePreview(e)}>Preview</button>
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
                </div> */}
                <div className="border-top">
                  <div className="card-body">
                    <button type="submit" className="btn btn-primary" style={{ marginLeft: "450px" }} disabled={load}>{load ? 'submitting...' : 'submit'}</button>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default InvoiceReg;













