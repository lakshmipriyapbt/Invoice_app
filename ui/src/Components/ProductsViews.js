import React, { useState, useEffect } from "react";
import SideNav from "../Pages/SideNav";
import TopNav from "../Pages/TopNav";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import { PencilSquare, XSquareFill } from "react-bootstrap-icons";
import Footer from "../Pages/Footer";
import DataTable from "react-data-table-component";
import { Slide, toast } from 'react-toastify';
import { ProdcutDeleteApiById, ProductsGetApi } from "../Axios";

const ProductsView = () => {
  const [users, setUsers] = useState([]);
  const [search, setSearch] = useState('')
  const [filterData, setFilteredData] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const navigate = useNavigate();

  const getProducts = () => {
    ProductsGetApi()
      .then((res) => {
        console.log(res);
        setUsers(res.data.data);
        setFilteredData(res.data.data);
      })
  }
  useEffect(() => {
    getProducts();
  }, []);
  const updateData = (productId) => {
    navigate('/productsRegistration', { state: { productId } })
  }

  const deleteData = async (productId) => {
    try {
      ProdcutDeleteApiById(productId)
        .then((response) => {
          getProducts();
          toast.error(response.data.data, {
            position: 'top-right',
            transition: Slide,
            hideProgressBar: true,
            theme: "colored",
            autoClose: 1000,
          });
          console.log(response);
          console.log(response.data.data);
        })
    } catch (error) {
      console.error(error.response);
      if (error.response && error.response.data) {
        console.error('Server Error Message:', error.response.data);
      }
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
      name: "Product Id",
      selector: (row) => row.productId,
    },
    {
      name: "Product Name",
      selector: (row) => row.productName,
    },
    {
      name: "Product Cost",
      selector: (row) => row.productCost,
    },
    {
      name: "HSN Code",
      selector: (row) => row.hsnNo,
    },
    {
      name: "Action",
      cell: (row) => <div> <button className="btn btn-sm mr-2" style={{ backgroundColor: "transparent" }} onClick={() => updateData(row.productId)}><PencilSquare size={22} color='#2255a4' /></button>
        <button className="btn btn-sm " style={{ backgroundColor: "transparent" }} onClick={() => deleteData(row.productId)}><XSquareFill size={22} color='#da542e' /></button>
      </div>

    }
  ]
  //  useEffect(()=>{
  //   const result=users.filter((data)=>{
  //       return data.product_name.toLowerCase().match(search.toLowerCase())
  //   });
  //   setFilteredData(result);
  //  },[search])

  return (
    <div id="main-wrapper" data-sidebartype="mini-sidebar">
      <TopNav />
      <SideNav />
      <div className="page-breadcrumb" style={{ width: "78%", marginLeft: "280px", marginTop: "28px" }}>
        <div className="row">
          <div className="col-12 d-flex no-block align-items-center">
            <h4 className="page-title" style={{ color: "blue" }}>Products Details</h4>
            <div className="ml-auto text-right">
              <nav aria-label="breadcrumb">
                <ol className="breadcrumb">
                  <li className="breadcrumb-item"><a href='/main'>Home</a></li>
                  <li className="breadcrumb-item active" aria-current="page">ProductList</li>
                </ol>
              </nav>
            </div>
          </div>
        </div>
      </div>

      <div className='container-fliuid'>
        <div className='row'>
          <div className='col-md-9 ' style={{ marginLeft: "300px" }}>
            <div className="card" style={{ marginTop: "50px" }}>
              <div className="card-body col-md-12" >

                <button type="button" className="btn btn-primary btn-lg " onClick={() => navigate('/productsRegistration')} style={{ marginBottom: "10px" }} >Add Product</button>
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
                    // className="table table-striped table-bordered"
                    columns={columns}
                    data={filterData}
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
export default ProductsView;