import React, { useState, useEffect } from 'react';
import SideNav from '../Pages/SideNav';
import TopNav from '../Pages/TopNav';
import Footer from '../Pages/Footer';
import { PencilSquare, XSquareFill } from 'react-bootstrap-icons';
import { useNavigate, Link } from 'react-router-dom';
import DataTable from 'react-data-table-component';
import { Slide, toast } from 'react-toastify';
import { CustomerDeleteApiById, CustomerGetApi } from '../Axios';

const Customers = () => {
    const navigate = useNavigate();
    const [users, setUsers] = useState([]);
    const [customer, setCustomer] = useState([]);
    const [search, setSearch] = useState("");
    const [APIData, setAPIData] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [rowsPerPage, setRowsPerPage] = useState(10);
    const [filteredData, setFilteredData] = useState([]);

    const getCustomer = () => {
        CustomerGetApi()
            .then((res) => {
                console.log(res);
                setCustomer(res.data.data);
                setFilteredData(res.data.data);
            })
    }
    useEffect(() => {
        getCustomer();
    }, []);

    const updateData = (customerId) => {
        navigate('/CustomersRegistration', { state: { customerId } });
    };

    const onDelete = async (customerId) => {
        try {
            CustomerDeleteApiById(customerId)
                .then((response) => {
                    getCustomer();
                    toast.error(response.data, {
                        position: 'top-right',
                        transition: Slide,
                        hideProgressBar: true,
                        theme: "colored",
                        autoClose: 1000,
                    });
                    console.log(response);
                    console.log(response.data);
                })
        } catch (error) {
            console.error(error.response);
            if (error.response && error.response.data) {
                console.error('Server Error Message:', error.response.data);
            }
        }
    }

    useEffect(() => {
        const result = users.filter((data) => {
            return data.customerName && data.customerName.toLowerCase().includes(search.toLowerCase());
        });
        setFilteredData(result);
    }, [search, users]);

    const columns = [
        {
            name: "S No",
            selector: (row, index) => (currentPage - 1) * rowsPerPage + index + 1,
            width: "70px",
        },
        {
            name: "Customer Id",
            selector: (row) => row.customerId,
        },
        {
            name: "Customer Name",
            selector: (row) => row.customerName,
        },
        {
            name: "State",
            selector: (row) => row.state,
        },
        {
            name: "Contact",
            selector: (row) => row.mobileNumber,
        },
        {
            name: "Mail-Id",
            selector: (row) => row.email,
        },
        {
            name: "Action",
            cell: (row) => (
                <div>
                    <button className="btn btn-sm mr-2" style={{ backgroundColor: "transparent" }} onClick={() => updateData(row.customerId)}>
                        <PencilSquare size={22} color='#2255a4' />
                    </button>
                    <button className="btn btn-sm " style={{ backgroundColor: "transparent" }} onClick={() => onDelete(row.customerId)}>
                        <XSquareFill size={22} color='#da542e' />
                    </button>
                </div>
            ),
        }
    ];

    return (
        <div id="main-wrapper" data-sidebartype="mini-sidebar">
            <TopNav />
            <SideNav />
            <div className="page-breadcrumb" style={{ width: "78%", marginLeft: "280px", marginTop: "25px" }}>
                <div className="row">
                    <div className="col-12 d-flex no-block align-items-center">
                        <h4 className="page-title" style={{ color: "blue" }}>Customers Details</h4>
                        <div className="ml-auto text-right">
                            <nav aria-label="breadcrumb">
                                <ol className="breadcrumb">
                                    <li className="breadcrumb-item"><a href='/main'>Home</a></li>
                                    <li className="breadcrumb-item active" aria-current="page">Customers</li>
                                </ol>
                            </nav>
                        </div>
                    </div>
                </div>
            </div>
            <div className='container-fluid' style={{ marginTop: "50px" }}>
                <div className='row'>
                    <div className='col-md-9' style={{ marginLeft: "300px" }}>
                        <div className="card">
                            <div className="card-body col-md-12">
                                <button type="button" className="btn btn-primary btn-lg" onClick={() => navigate('/CustomersRegistration')} style={{ marginBottom: "15px" }}>Add Customer</button>
                                <input
                                    className="form-control col-md-3"
                                    style={{ border: "2px solid black", borderRadius: "8px", float: "right", marginBottom: "10px" }}
                                    type="text"
                                    placeholder="Search..."
                                    value={search}
                                    onChange={(e) => setSearch(e.target.value)}
                                />
                                <div className="table-responsive">
                                    <DataTable
                                        columns={columns}
                                        data={filteredData}
                                        pagination
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

export default Customers;
