import React, { useState, useEffect } from 'react';
import TopNav from '../Pages/TopNav';
import SideNav from '../Pages/SideNav';
import Footer from '../Pages/Footer';
import { useSelector, useDispatch } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { Eye, SendFill, XSquareFill } from 'react-bootstrap-icons';
import DataTable from 'react-data-table-component';
import { Slide, toast } from 'react-toastify';
import { InvoiceDeleteApiById } from '../Axios';
import { fetchInvoices } from '../Redux/invoiceSlice';

const InvoiceViews = () => {
    const [currentPage, setCurrentPage] = useState(1);
    const [rowsPerPage, setRowsPerPage] = useState(10);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    // Redux state
    const { invoices, loading, error } = useSelector(state => state.invoices);


    // Local state
    const [search, setSearch] = useState('');
    const [filteredData, setFilteredData] = useState([]);

    // Fetch invoices when the component mounts
    useEffect(() => {
        dispatch(fetchInvoices());
    }, [dispatch]);

    const onUpdate = (invoiceId) => {
        console.log('Navigating with invoiceId:', invoiceId);
        navigate('/invoiceSlip', { state: { invoiceId } });
    };

    useEffect(() => {
        const validInvoices = Array.isArray(invoices) ? invoices : [];
        const result = validInvoices.filter((invoice) =>
            invoice.customerName?.toLowerCase().includes(search.toLowerCase())
        );
        setFilteredData(result);
    }, [invoices, search]);

    const onDelete = async (invoiceId) => {
        try {
            await InvoiceDeleteApiById(invoiceId);
            toast.error('Invoice deleted successfully', {
                position: 'top-right',
                transition: Slide,
                hideProgressBar: true,
                theme: 'colored',
                autoClose: 1000,
            });
            dispatch(fetchInvoices());
        } catch (error) {
            console.error('Error deleting invoice:', error);
            toast.error('Failed to delete invoice', {
                position: 'top-right',
                transition: Slide,
                theme: 'colored',
            });
        }
    };
    const paginationComponentOptions = {
        RowsPerPage: '5',
        noRowsPerPage: true,
    }

    const columns = [
        {
            name: "S No",
            selector: (row, index) => (currentPage - 1) * rowsPerPage + index + 1,
            width: "70px",
        },
        {
            name: 'Invoice Number',
            selector: (row) => row.invoiceId,
        },
        {
            name: 'Invoice Date',
            selector: (row) => row.invoiceDate,
        },
        {
            name: 'Customer Name',
            selector: (row) => row.customerName,
        },
        {
            name: 'Action',
            maxWidth: "300px",
            cell: (row) => (
                <div>
                    <button className="btn btn-sm mr-2" style={{ backgroundColor: "transparent" }} >
                        <SendFill size={22} color='darkorange' />
                    </button>
                    <button className="btn btn-sm" style={{ backgroundColor: 'transparent' }} onClick={() => onUpdate(row.invoiceId)}>
                        <Eye size={22} color="#2255A4" />
                    </button>
                    <button className="btn btn-sm" style={{ backgroundColor: 'transparent' }} onClick={() => onDelete(row.invoiceId)}>
                        <XSquareFill size={22} color="#DA542E" />
                    </button>
                </div>
            ),
        },
    ];

    return (
        <div id="main-wrapper" data-sidebartype="mini-sidebar">
            <TopNav />
            <SideNav />
            <div className="page-breadcrumb" style={{ width: '78%', marginLeft: '280px', marginTop: '28px' }}>
                <div className="row">
                    <div className="col-12 d-flex no-block align-items-center">
                        <h4 className="page-title" style={{ color: 'blue' }}>Invoices</h4>
                        <div className="ml-auto text-right">
                            <nav aria-label="breadcrumb">
                                <ol className="breadcrumb">
                                    <li className="breadcrumb-item"><Link to="/">Home</Link></li>
                                    <li className="breadcrumb-item active" aria-current="page">Invoices</li>
                                </ol>
                            </nav>
                        </div>
                    </div>
                </div>
            </div>
            <div className="container_fluid">
                <div className="row">
                    <div className="col-md-9" style={{ marginLeft: '300px' }}>
                        <div className="card" style={{ marginTop: '50px' }}>
                            <div className="card-body col-md-12">
                                <button
                                    type="button"
                                    className="btn btn-primary btn-lg"
                                    onClick={() => navigate('/invoiceRegistration')}
                                    style={{ marginBottom: '15px' }}
                                >
                                    Create Invoice
                                </button>
                                <input
                                    className="form-control col-md-3"
                                    style={{ border: "2px soild black", borderRadius: "8px", float: "right", marginBottom: "10px" }}
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
                                        onChangePage={page => setCurrentPage(page)}
                                        onChangeRowsPerPage={perPage => setRowsPerPage(perPage)}
                                    />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <Footer />
        </div>
    );
};

export default InvoiceViews;




