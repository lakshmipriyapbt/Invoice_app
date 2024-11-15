import React, { useState, useEffect } from 'react';
import './App.css';
import { Routes, Route, Navigate } from 'react-router-dom';
import Main from './Pages/Main';
import Dash from './Pages/Dash';
import Products from './Components/Products'
import ProductViews from './Components/ProductsViews';
import Customers from './Components/Customers';
import CustomersRegistration from './Components/CustomersRegistration';
import UserRegistration from './Components/UsersRegistration';
import AdminRegistration from './Components/AdminRegistration';
import Usersview from './Components/UsersViews';
import Otp from './Pages/Otp';
import InvoicePdf from './Components/InvoicePdf';
import InvoiceViews from './Components/InvoiceViews';
import InvoiceReg from './Components/InvoiceReg';
import TopNav from './Pages/TopNav';
import Modal from './Pages/modalotp'
import Login from './Pages/Login';
import CompanyLogin from './Pages/CompanyLogin';
//import ProtectedRoutes from './Pages/Auth/ProtectedRoutes';

const App = () => {
  const [loggedIn, setLoggedIn] = useState(false);

  return (
    <Routes>
      <Route path='/' element={<Login/>}></Route>
      <Route path='/otp' element={<Otp />}></Route>
      <Route path='/main' element={<Main />}></Route>
      <Route path='/dashboard' element={<Dash />}></Route>
      <Route path='/Customers' element={<Customers />}></Route>
      <Route path='/productsRegistration' element={<Products />}></Route>
      <Route path='/productview' element={<ProductViews />}></Route>
      <Route path='/CustomersRegistration' element={<CustomersRegistration />}></Route>
      <Route path='/UserRegistration' element={<UserRegistration />}></Route>
      <Route path='/adminRegistration' element={<AdminRegistration />}></Route>
      <Route path='/Usersviews' element={<Usersview />}></Route>
      <Route path='/Invoices' element={<InvoiceViews />}></Route>
      <Route path='/invoiceRegistration/*' element={<InvoiceReg />}></Route>
      <Route path='/invoiceSlip' element={<InvoicePdf />}></Route>
      <Route path='/modalotp' element={<Modal />}></Route>
      <Route path='companyLogin' element={<CompanyLogin />}></Route>
      {/* <Route path='/pagination' element={<Pagination/>}></Route> */}

    </Routes>

  );
}

export default App;
{/**
 <Route path='/main' element={<ProtectedRoutes component={Main}/>}></Route>
        <Route path='/dashboard' element={<Dash/>}></Route>
        <Route path='/Customers' element={<ProtectedRoutes component={Customers}/>}></Route>
        <Route path='/productsRegistration' element={<ProtectedRoutes component={Products}/>}></Route>
        <Route path ='/productview' element = {<ProtectedRoutes component={ProductViews}/>}></Route>
        <Route path='/CustomersRegistration' element={<ProtectedRoutes component={CustomersRegistration}/>}></Route>
        <Route path ='/UserRegistration' element ={<ProtectedRoutes component={UserRegistration}/>}></Route>
        <Route path = '/AdminRegistration' element = {<ProtectedRoutes component={AdminRegistration}/>}></Route>
        <Route path ='/Usersviews' element ={<ProtectedRoutes component={Usersview}/>}></Route>
        <Route path='/Invoices' element={<ProtectedRoutes component={InvoiceViews}/>}></Route>
      <Route path='/invoiceRegistration/*' element={<ProtectedRoutes component={InvoiceReg}/>}></Route>
       <Route path='/invoiceSlip' element={<ProtectedRoutes component={InvoicePdf}/>}></Route>
*/}