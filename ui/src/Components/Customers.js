import React, { useState, useEffect } from 'react'
import axios from 'axios'
import TopNav from '../Pages/TopNav'
import Footer from '../Pages/Footer'
import { PencilSquare, XSquareFill } from 'react-bootstrap-icons'
import { useNavigate, Link } from 'react-router-dom'
import DataTable from 'react-data-table-component'
import { Slide, toast } from 'react-toastify';
import { useDispatch, useSelector } from 'react-redux';
// import { fetchCustomers, deleteCustomer } from '../redux/customerActions';
import { fetchCustomers } from '../redux/customerSlice'; // Import the thunk
import SideNav from '../Pages/SideNav'
import {CustomerDeleteApiById} from '../Axos'


const Customers = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    // const customers = useSelector((state) => state.customers.customers);
    const { customers, loading, error } = useSelector(state => state.customers); // Access Redux state
    const [users, setUsers] = useState([]);
    const [search, setSearch] = useState("");
    const [filteredData, setFilteredData] = useState();
    
    // Fetch all customers on component mount
    useEffect(() => {
        dispatch(fetchCustomers());
    }, [dispatch]);

    const handleEdit = (customerId) => {
        navigate(`/CustomersRegistration`, { state: { customerId } });
    };
    useEffect(() => {
        // Filter the products based on the search query
        const result = customers.filter((customer) =>
            customer.customerName.toLowerCase().includes(search.toLowerCase())
        );
        setFilteredData(result);
    }, [search, customers]);
    const onDelete = async (customerId) => {
        try {
             const response =await CustomerDeleteApiById(customerId)
              dispatch(fetchCustomers()); // Refresh the customer list after delete
              toast.error(response.data.data, {
                position: 'top-right',
                transition: Slide,
                hideProgressBar: true,
                theme: "colored",
                autoClose: 1000,
              });
        } catch (error) {
          console.log('error', error);
        }
      };
      
    const paginationComponentOptions = {
        noRowsPerPage: true,
    }
    const columns = [
        {
            name: " CustomerId",
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
            name: "Mail-customerId",
            selector: (row) => row.email,
        },
        {
            name: "Action",
            cell: (row) => <div> <button className="btn btn-sm mr-2" style={{ backgroundColor: "transparent" }} onClick={() => handleEdit(row.customer_customerId)}><PencilSquare size={22} color='#2255a4' /></button>
                <button className="btn btn-sm " style={{ backgroundColor: "transparent" }} onClick={() =>onDelete (row.customer_customerId)}><XSquareFill size={22} color='#da542e' /></button>
            </div>

        }
    ]
    // useEffect(() => {
    //     const result = users.filter((data) => {
    //         return data.customer.toLowerCase().match(search.toLowerCase())

    //     });
    //     setFilteredData(result);
    // }, [search])
    if (loading) {
        return <div>Loading...</div>;
      }
    
      if (error) {
        return <div>Error: {error}</div>;
      }
    return (
        <div customerId="main-wrapper" data-scustomerIdebartype="mini-scustomerIdebar">
            <TopNav />
            <SideNav />
            <div className="page-breadcrumb" style={{ wcustomerIdth: "78%", marginLeft: "280px", marginTop: "25px" }}>
                <div className="row">
                    <div className="col-12 d-flex no-block align-items-center">
                        <h4 className="page-title" style={{ color: "blue" }}>Customers Details</h4>
                        <div className="ml-auto text-right">
                            <nav aria-label="breadcrumb">
                                <ol className="breadcrumb">
                                    <li className="breadcrumb-item"><Link to={'/'}>Home</Link></li>
                                    <li className="breadcrumb-item active" aria-current="page">Library</li>
                                    <li className="breadcrumb-item"><Link to={'/Usersviews'}>Customers</Link></li>
                                </ol>
                            </nav>
                        </div>
                    </div>
                </div>
            </div>
            <div className='container-flucustomerId' style={{ marginTop: "50px" }}>
                <div className='row'>
                    <div className='col-md-9' style={{ marginLeft: "300px" }}>
                        <div className="card">
                            <div className="card-body col-md-12">
                                <button type="button" className="btn btn-primary btn-lg" onClick={() => navigate('/CustomersRegistration')} style={{ marginBottom: "15px" }}>Add Customer</button>
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

export default Customers
