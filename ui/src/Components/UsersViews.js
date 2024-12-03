import React, { useState, useEffect } from 'react'
import TopNav from '../Pages/TopNav'
import SideNav from '../Pages/SideNav'
import Footer from '../Pages/Footer'
import { Link, useNavigate } from 'react-router-dom'
import { XSquareFill, PencilSquare } from 'react-bootstrap-icons'
import axios from 'axios'
import DataTable from 'react-data-table-component'
import { Slide, toast } from 'react-toastify';
import { UserDeleteApiById} from '../Axios'
import { useDispatch, useSelector } from 'react-redux'
import { fetchUsers } from '../Redux/userSlice'
import { selectUsers, selectUsersLoading } from '../Redux/store'


const Usersview = () => {
  const [APIData, setAPIData] = useState([]);
  const [filterData, setFilteredData] = useState([]);
  const [search, setSearch] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [itemsPerPage, setItemsPerPage] = useState(5);
  const Navigate = useNavigate();
  const dispatch = useDispatch();
  // Access Redux state
  const users = useSelector(selectUsers);
  const loading = useSelector(selectUsersLoading);
  

  useEffect(() => {
    dispatch(fetchUsers()); // Fetch users when component loads
  }, [dispatch]);

  console.log("users from userSlice " , users);
 
  const handleEdit = (userId) => {
    Navigate(`/UserRegistration`, { state: { userId } })  //deleteuser/
  }
  const onDelete = async (userId) => {
    try {
        // Make a DELETE request to the API with the given ID
        const response = await UserDeleteApiById(userId)
        dispatch(fetchUsers());  // Dispatch action to refetch products
        toast.error('User deleted successfully', {  //Notification status
            position: 'top-right',
            transition: Slide,
            hideProgressBar: true,
            theme: "colored",
            autoClose: 1000, // Close the toast after 1 seconds
        });
        console.log(response);
        console.log(response.data.data);
    } catch (error) {
        // Log any errors that occur
        console.error(error.response);
        if (error.response && error.response.data) {
            console.error('Server Error Message:', error.response.data);
        }
    }
}

useEffect(() => {
  if (users && Array.isArray(users)) {
    const result = users.filter((user) =>
      user.userName.toLowerCase().includes(search.toLowerCase())
    );
    setFilteredData(result);
  } else {
    setFilteredData([]);
  }
}, [search, users]);
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
      name: "User ID",
      selector: (row) => {
        return (<div className='text-right'>{row.userId}</div>)
      },
    },
    {
      name: "User Name",
      selector: (row) => {
        return (<div className='text-right'>{row.userName}</div>)
      },
    },
    {
      name: "User Email",
      selector: (row) => {
        return (<div style={{ float: "left" }}>{row.userEmail}</div>)
      },
    },
    {
      name: "Role",
      selector: (row) => {
        return (<div style={{ float: "right" }}>{row.role}</div>)
      },
    },
    // {
    //   name: "Status",
    //   selector: (row) => {
    //     return (<div style={{ float: "right" }}>{row.status}</div>)
    //   },
    // },
    {
      name: "Action",
      cell: (row) => <div> <button className="btn btn-sm mr-2" style={{ backgroundColor: "transparent" }} onClick={() => handleEdit(row.userId)}><PencilSquare size={22} color='#2255a4' /></button>
        <button className="btn btn-sm " style={{ backgroundColor: "transparent" }} onClick={() => onDelete(row.userId)}><XSquareFill size={22} color='#da542e' /></button>
      </div>

    }
  ]
  
  return (
    <div id="main-wrapper" data-sidebartype="mini-sidebar">
      <TopNav />
      <SideNav />
      <div className="page-breadcrumb" style={{ width: "78%", marginLeft: "280px", marginTop: "28px" }}>
        <div className="row">
          <div className="col-12 d-flex no-block align-items-center">
            <h4 className="page-title" style={{ color: "blue" }}>Users Details</h4>
            <div className="ml-auto text-right">
              <nav aria-label="breadcrumb">
                <ol className="breadcrumb">
                  <li className="breadcrumb-item"><a href='/main'>Home</a></li>
                  <li className="breadcrumb-item active" aria-current="page">Users</li>
                </ol>
              </nav>
            </div>
          </div>
        </div>
      </div>
      <div className='container-fluid'>
        <div className='row'>
          <div className='col-md-12'>
            <div className="card" style={{ marginLeft: "270px", marginTop: "50px" }}>
              <div className="card-body">
                <Link to={'/UserRegistration'}> <button type="button" className="btn btn-primary btn-lg mb-3" style={{ float: "left" }} >Add Users</button> </Link>
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
                    // customStyles={tableCustomStyles}
                    columns={columns}
                    data={filterData}
                    pagination
                    paginationComponentOptions={paginationComponentOptions}
                    sortActive={true}
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

export default Usersview;