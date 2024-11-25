import React, { useState, useEffect } from 'react'
import SideNav from '../Pages/SideNav'
import TopNav from '../Pages/TopNav'
import Footer from '../Pages/Footer'
import { PencilSquare, XSquareFill } from 'react-bootstrap-icons'
import { useNavigate, Link } from 'react-router-dom'
import DataTable from 'react-data-table-component'
import { Slide, toast } from 'react-toastify'
import { companyDeleteByIdApi, companyViewApi } from '../Axios'

const CompanyView = () => {
    const navigate = useNavigate();
    const [users, setUsers] = useState([]);
    const [search, setSearch] = useState("");
    const [currentPage, setCurrentPage] = useState(1);
    const [rowsPerPage, setRowsPerPage] = useState(10);
    const [filteredData, setFilteredData] = useState('');

    const getCompanies = () => {
        companyViewApi()
            .then((res) => {
                console.log(res);
                setUsers(res.data.data);
                setFilteredData(res.data.data);
            })
    }

    useEffect(() => {
        getCompanies();
    }, []);

    const updateData = (companyId) => {
        navigate('/CompanyRegistration', { state: { companyId } });
    }

    const onDelete = async (companyId) => {
        try {
            const response = await companyDeleteByIdApi(companyId);
            getCompanies();
            toast.error(response.data.data, {
                position: 'top-right',
                transition: Slide,
                hideProgressBar: true,
                theme: "colored",
                autoClose: 1000,
            });
            console.log(response);
        } catch (error) {
            console.log('Error:', error);
        }
    }

    const paginationComponentOptions = {
        noRowsPerPage: true,
    }

    const columns = [
        {
            name: "S No",
            selector: (row, index) => (currentPage - 1) * rowsPerPage + index + 1,
            width: "70px",
        },
        {
            name: "Company Id",
            selector: (row) => row.companyId,
        },
        {
            name: "Company Name",
            selector: (row) => row.companyName,
        },
        {
            name: "Service Name",
            selector: (row) => row.serviceName,
        },
        {
            name: "Contact No",
            selector: (row) => row.phone,
        },
        {
            name: "Mail-Id",
            selector: (row) => row.companyemail,
        },
        {
            name: "Action",
            cell: (row) => (
                <div>
                    <button
                        className="btn btn-sm mr-2"
                        style={{ backgroundColor: "transparent" }}
                        onClick={() => updateData(row.companyId)}
                    >
                        <PencilSquare size={22} color='#2255a4' />
                    </button>
                    <button
                        className="btn btn-sm"
                        style={{ backgroundColor: "transparent" }}
                        onClick={() => onDelete(row.companyId)}
                    >
                        <XSquareFill size={22} color='#da542e' />
                    </button>
                </div>
            )
        }
    ]

    return (
        <div id="main-wrapper" data-sidebartype="mini-sidebar">
            <TopNav />
            <SideNav />
            <div className="page-breadcrumb" style={{ width: "78%", marginLeft: "280px", marginTop: "25px" }}>
                <div className="row">
                    <div className="col-12 d-flex no-block align-items-center">
                        <h4 className="page-title" style={{ color: "blue" }}>Summary</h4>
                        <div className="ml-auto text-right">
                            <nav aria-label="breadcrumb">
                                <ol className="breadcrumb">
                                    <li className="breadcrumb-item"><a href='/main'>Home</a></li>
                                    <li className="breadcrumb-item"><Link to={'/Usersviews'}>Summary</Link></li>
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
                                <button type="button" className="btn btn-primary btn-lg" onClick={() => navigate('/CompanyRegistration')} style={{ marginBottom: "15px" }}>Add Company</button>
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
    )
}

export default CompanyView;
