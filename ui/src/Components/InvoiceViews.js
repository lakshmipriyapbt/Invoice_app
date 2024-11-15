import React, { useState, useEffect } from 'react'
import TopNav from '../Pages/TopNav'
import SideNav from '../Pages/SideNav'
import Footer from '../Pages/Footer'
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom'
import { Eye, Send, SendFill, XSquareFill } from 'react-bootstrap-icons'
import DataTable from 'react-data-table-component';
import { Slide, toast } from 'react-toastify';
import { useDispatch, useSelector } from 'react-redux';
import { fetchInvoices } from '../redux/invoiceSlice'; // Import fetchInvoices
import { selectInvoices } from '../redux/store'; // Select invoices from the store
import {InvoiceDeleteApiById} from '../Axos'


const InvoiceViews = () => {
    const [voice, setVoice] = useState([]);
    const [search, setSearch] = useState('');
    const [filteredData, setFilteredData] = useState('');
    const dispatch = useDispatch();
    const Navigate = useNavigate();
    // Access invoices state from Redux store
    const { invoices, loading, error } = useSelector((state) => state.invoices);

    // Fetch invoices on component mount
    useEffect(() => {
        dispatch(fetchInvoices());
    }, [dispatch]);

    const onUpdate = (id) => {
        Navigate('/invoiceSlip', { state: { id } });
    };
    useEffect(() => {
        // Filter the products based on the search query
        const result = invoices.filter((data) =>
            data.client_name.toLowerCase().includes(search.toLowerCase())
        );
        setFilteredData(result);
    }, [search,invoices]);
    const onDelete = async (invoice_id) => {
        try {
            // Make a DELETE request to the API with the given ID
            InvoiceDeleteApiById(invoice_id)
                .then((response) => {
                    dispatch(fetchInvoices());  // Refetch invoices after delete
                    toast.error(response.data.data, {  //Notification status
                        position: 'top-right',
                        transition: Slide,
                        hideProgressBar: true,
                        theme: "colored",
                        autoClose: 1000, // Close the toast after 1 seconds
                    });
                    console.log(response);
                    console.log(response.data.data);
                })
        } catch (error) {
            // Log any errors that occur
            console.error(error.response);
            if (error.response && error.response.data) {
                console.error('Server Error Message:', error.response.data);
            }
        }
    }
    const paginationComponentOptions = {
        RowsPerPage: '5',
        noRowsPerPage: true,
    }

    const columns = [
        {
            name: "Invoice-Id",
            maxWidth: "150px",
            selector: (row) => row.invoice_id,
        },
        {
            name: "Invoice Number",

            selector: (row) => row.invoice_no,
        },
        {
            name: "Invoice Date",

            selector: (row) => row.invoice_date,
        },
        {
            name: "Customer",
            width: "150px",
            selector: (row) => row.client_name,
        },
        {
            name: "Action",
            maxWidth: "300px",
            cell: (row) => <div>
                <button className="btn btn-sm mr-2" style={{ backgroundColor: "transparent" }} ><SendFill size={22} color='darkorange' /></button>
                <button className="btn btn-sm mr-2" style={{ backgroundColor: "transparent" }} onClick={() => onUpdate(row.invoice_id)}><Eye size={22} color='#2255a4' /></button>
                <button className="btn btn-sm " style={{ backgroundColor: "transparent" }} onClick={() => onDelete(row.invoice_id)}><XSquareFill size={22} color='#da542e' /></button>
            </div>

        }
    ]
    useEffect(() => {
        const result = voice.filter((data) => {
            return data.client_name.toLowerCase().match(search.toLowerCase())

        });
        setFilteredData(result);
    }, [search])
    
    if (loading) {
        return <div>Loading...</div>;
      }
    
      if (error) {
        return <div>Error: {error}</div>;
      }
    return (
        <div id="main-wrapper" data-sidebartype="mini-sidebar">
            <TopNav />
            <SideNav />
            <div className="page-breadcrumb" style={{ width: "78%", marginLeft: "280px", marginTop: "28px" }}>
                <div className="row">
                    <div className="col-12 d-flex no-block align-items-center">
                        <h4 className="page-title" style={{ color: "blue" }}>Invoices</h4>
                        <div className="ml-auto text-right">
                            <nav aria-label="breadcrumb">
                                <ol className="breadcrumb">
                                    <li className="breadcrumb-item"><a href="#">Home</a></li>
                                    <li className="breadcrumb-item active" aria-current="page">Invoice List</li>
                                </ol>
                            </nav>
                        </div>
                    </div>
                </div>
            </div>
            <div className='container_fluid'>
                <div className='row'>
                    <div className='col-md-9' style={{ marginLeft: "300px" }} >
                        <div className="card" style={{ marginTop: "50px" }}>
                            <div className="card-body col-md-12">
                                <button type="button" className="btn btn-primary btn-lg" onClick={() => Navigate('/invoiceRegistration')} style={{ marginBottom: "15px" }}>Create Invoice</button>
                                <input
                                    className="form-control col-md-3"
                                    style={{ border: "1px soild black", borderRadius: "8px", float: "right", marginBottom: "10px" }}
                                    type="text"
                                    placeholder="Search..."
                                    value={search}
                                    onChange={(e) => setSearch(e.target.value)}
                                />
                                <div className="table-responsive">
                                    <DataTable
                                        columns={columns}
                                        data={filteredData}
                                        subHeaderAlign='center'
                                        pagination
                                        paginationComponentOptions={paginationComponentOptions}
                                    />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <Footer />
        </div>
    )
}
export default InvoiceViews
