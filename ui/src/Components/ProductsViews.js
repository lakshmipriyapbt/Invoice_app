import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import { PencilSquare, XSquareFill } from "react-bootstrap-icons";
import DataTable from "react-data-table-component";
import { Slide, toast } from 'react-toastify';
import { useDispatch, useSelector } from 'react-redux';
import SideNav from "../Pages/SideNav";
import TopNav from "../Pages/TopNav";
import Footer from "../Pages/Footer";
import { fetchAllProducts } from "../Redux/productSlice";
import { selectProducts, selectProductsLoading, selectProductsError } from '../Redux/store'; 
import { ProdcutDeleteApiById } from "../Axios";

const Product = () => {
  const [search, setSearch] = useState('');
  const [filteredData, setFilteredData] = useState([]);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  // Access Redux state
  const products = useSelector(selectProducts);
  const loading = useSelector(selectProductsLoading);
  const error = useSelector(selectProductsError);

  useEffect(() => {
    // Fetch all products when the component mounts
    dispatch(fetchAllProducts());
  }, [dispatch]);

  useEffect(() => {
    console.log('Products from Redux state:', products);
  }, [products]);

  const updateData = (productId) => {
    navigate('/productsRegistration', { state: { productId } });
  };

  const deleteData = async (productId) => {
    try {
      // Make a DELETE request to the API with the given ID
      const response = await ProdcutDeleteApiById(productId);
      dispatch(fetchAllProducts());  // Dispatch action to refetch products
      toast.error(response.data.data, {  // Notification status
        position: 'top-right',
        transition: Slide,
        hideProgressBar: true,
        theme: "colored",
        autoClose: 1000, // Close the toast after 1 second
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
  };

  const paginationComponentOptions = {
    noRowsPerPage: true,
  };

  useEffect(() => {
    if (products && Array.isArray(products)) {
      const result = products.filter((product) =>
        product.productName.toLowerCase().includes(search.toLowerCase())
      );
      setFilteredData(result);
    } else {
      setFilteredData([]);
    }
  }, [search, products]);

  const columns = [
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
      selector: (row) => row.cost
    },
    {
      name: "HSN Code",
      selector: (row) => row.hsnNo,
    },
    {
      name: "Action",
      cell: (row) => (
        <div>
          <button className="btn btn-sm mr-2" style={{ backgroundColor: "transparent" }} onClick={() => updateData(row.productId)}>
            <PencilSquare size={22} color='#2255a4' />
          </button>
          <button className="btn btn-sm" style={{ backgroundColor: "transparent" }} onClick={() => deleteData(row.productId)}>
            <XSquareFill size={22} color='#da542e' />
          </button>
        </div>
      ),
    },
  ];

  // if (loading) {
  //   return <div>Loading...</div>;
  // }

  // if (error) {
  //   return <div>Error: {error}</div>;
  // }

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
                  <li className="breadcrumb-item"><Link to={'/'}>Home</Link></li>
                  <li className="breadcrumb-item active" aria-current="page">ProductList</li>
                </ol>
              </nav>
            </div>
          </div>
        </div>
      </div>

      <div className='container-fluid'>
        <div className='row'>
          <div className='col-md-9 ' style={{ marginLeft: "300px" }}>
            <div className="card" style={{ marginTop: "50px" }}>
              <div className="card-body col-md-12">
                <button type="button" className="btn btn-primary btn-lg " onClick={() => navigate('/productsRegistration')} style={{ marginBottom: "10px" }} >Add Product</button>
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
                    className="table table-striped table-bordered"
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
  );
};

export default Product;

