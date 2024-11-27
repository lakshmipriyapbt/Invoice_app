import React, { useState, useEffect } from 'react';
import './App.css';
import { Routes, Route, Navigate } from 'react-router-dom';
import Main from './Pages/Main';
import Dash from './Pages/Dash';
import ProductViews from './Components/ProductsViews';
import Customers from './Components/Customers';
import CustomersRegistration from './Components/CustomersRegistration';
import Products from './Components/Products'
import UserRegistration from './Components/UsersRegistration';
import Usersview from './Components/UsersViews';
import InvoicePdf from './Components/InvoicePdf';
import InvoiceViews from './Components/InvoiceViews';
import InvoiceReg from './Components/InvoiceReg';
import Modal from './Pages/modalotp'
import CompanyLogin from './Pages/CompanyLogin';
import InvoiceLogin from './Pages/InvoiceLogin';
import CompanyRegistration from './Components/CompanyRegistration';
import CompanyView from './Components/CompanyView';
import UserLogin from './Pages/UserLogin';
import CompanyForgotPassword from './Pages/CompanyForgotPassword';
import UserForgotPassword from './Pages/UserForgotPassword';
import CompanyProfile from './Components/CompanyProfile';
import UserProfile from './Components/UserProfiler';
import QuotationReg from './Components/QuotationReg';
import QuotationView from './Components/QuotationView';
//import ProtectedRoutes from './Pages/Auth/ProtectedRoutes';

const App = () => {
  const [loggedIn, setLoggedIn] = useState(false);

  return (
    <Routes>
      <Route path='/' element={<InvoiceLogin />}></Route>
      <Route path="/companyLogin" element={<CompanyLogin />}></Route>
      <Route path='/userLogin' element={<UserLogin />}></Route>
      <Route path='/companyForgotPassword' element={<CompanyForgotPassword />}></Route>
      <Route path='/userForgotPassword' element={<UserForgotPassword />}></Route>
      <Route path='/main' element={<Main />}></Route>
      <Route path='/dashboard' element={<Dash />}></Route>
      <Route path='/Customers' element={<Customers />}></Route>
      <Route path='/productsRegistration' element={<Products />}></Route>
      <Route path='/productview' element={<ProductViews />}></Route>
      <Route path='/CustomersRegistration' element={<CustomersRegistration />}></Route>
      <Route path='/UserRegistration' element={<UserRegistration />}></Route>
      <Route path='/CompanyRegistration' element={<CompanyRegistration />}></Route>
      <Route path='/companyView' element={<CompanyView />}></Route>
      <Route path='/companyProfile' element={<CompanyProfile />}></Route>
      <Route path='/userProfile' element={<UserProfile />}></Route>
      <Route path='/Usersviews' element={<Usersview />}></Route>
      <Route path='/Invoices' element={<InvoiceViews />}></Route>
      <Route path='/invoiceRegistration/*' element={<InvoiceReg />}></Route>
      <Route path='/invoiceSlip' element={<InvoicePdf />}></Route>
      <Route path='/quotationRegistration' element={<QuotationReg />}></Route>
      <Route path='/Quotations' element={<QuotationView />}></Route>
      <Route path='/modalotp' element={<Modal />}></Route>
      {/* <Route path='/pagination' element={<Pagination/>}></Route> */}

    </Routes>

  );
}

export default App;