import React,{useState,useEffect} from 'react'
//import TopNav from '../Pages/TopNav'
//import SideNav from '../Pages/SideNav'
//import Footer from '../Pages/Footer'
import { Link,useNavigate} from 'react-router-dom'
import {XSquareFill, PencilSquare } from 'react-bootstrap-icons'
import axios from 'axios'
//import Pagination from '../Pagination'
import DataTable from 'react-data-table-component'
//import SearchBar from '../SearchBar'

const Pagination=({invoiceData})=>{
  return(

    <header className="topbar" data-navbarbg="skin5" style={{width: "100%" ,overflow:"hidden"}}>

            <nav className="navbar top-navbar navbar-expand-sm navbar-dark">
                <div className="navbar-header" data-logobg="skin5">
                    {/* This is for the sidebar toggle which is visible on mobile only */}
                    <Link className="nav-toggler waves-effect waves-light d-block d-md-none" href='javascript:void(0)'><i className="ti-menu ti-close" /></Link>
                    {/* ============================================================== */}
                    {/* Logo */}
                    {/* ============================================================== */}
                    <Link className="navbar-brand" href="index.html">
                        {/* Logo icon */}
                        {/* <b className="logo-icon p-l-10">
                    {/*You can put here icon as well // <i className="wi wi-sunset"></i> //*/}
                        {/* Dark Logo icon 
                    <img src="assets/images/logo-icon.png" alt="homepage" className="light-logo"/>
                    </b> 
                    {/*End Logo icon */}
                        {/* Logo text */}

                        {/* <h3><b className="text-danger" style={{fontSize:"20px"}}>INVOICE APPLICATION</b></h3> */}
                        <span className="logo-text">
                            {/* dark Logo text  */}
                            <img src="assets/images/pathbreaker_logo.png" alt="INVOICE APPLICATION" style={{ height: "65px", width: "180px", marginTop: "10px" }} className="light-logo ml-2" />
                        </span>
                        {/* Logo icon */}
                        {/*} <b className="logo-icon"> 
                    {/*You can put here icon as well // <i className="wi wi-sunset"></i> //*/}
                        {/* Dark Logo icon */}
                        {/*<img src="assets/images/logo-text.png" alt="homepage" className="light-logo" /> 
                    </b> */}
                        {/*End Logo icon */}
                    </Link>
                    {/* ============================================================== */}
                    {/* End Logo */}
                    {/* ============================================================== */}
                    {/* ============================================================== */}
                    {/* Toggle which is visible on mobile only */}
                    {/* ============================================================== */}
                    <Link className="topbartoggler d-block d-md-none waves-effect waves-light" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation"><i className="ti-more" /></Link>
                </div>
                {/* ============================================================== */}
                {/* End Logo */}
                {/* ============================================================== */}
                <div className="navbar-collapse collapse" style={{ marginBottom: "50px" }} id="navbarSupportedContent" data-navbarbg="skin5">
                    {/* ============================================================== */}
                    {/* toggle and nav items */}
                    {/* ============================================================== */}
                    <ul className="navbar-nav float-left mr-auto">
                        <li className="nav-item d-none d-md-block"><Link className="nav-link sidebartoggler waves-effect waves-light" data-sidebartype="mini-sidebar"><List color='#3e5569' size={23} /></Link></li>
                        {/* ============================================================== */}
                        {/* create new */}
                        {/* ============================================================== */}
                        {/* <li className="nav-item dropdown">
                    <Link className="nav-link dropdown-toggle" id="navbarDropdown" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                        <span className="d-none d-md-block">Create New <i className="fa fa-angle-down" /></span>
                        <span className="d-block d-md-none"><i className="fa fa-plus" /></span>   
                    </Link>
                    <div className="dropdown-menu" aria-labelledby="navbarDropdown">
                        <Link className="dropdown-item" href="#">Action</Link>
                        <Link className="dropdown-item" href="#">Another action</Link>
                        <div className="dropdown-divider" />
                        <Link className="dropdown-item" href="#">Something else here</Link>
                    </div>
                    </li> */}
                        {/* ============================================================== */}
                        {/* Search */}
                        {/* ============================================================== */}
                        {/* <li className="nav-item search-box"> <Link className="nav-link waves-effect waves-dark" ><i className="ti-search" style={{color:"black"}}/></Link>
                    <form className="app-search position-absolute">
                        <input type="text" className="form-control" placeholder="Search & enter" /> <Link className="srh-btn"><i className="ti-close" /></Link>
                    </form>
                    </li> */}
                        <h3 style={{ fontSize: "20px", marginLeft: "370px", marginTop: "15px", color: "darkorange" }}>INVOICE-APPLICATION</h3>
                    </ul>
                    {/* ============================================================== */}
                    {/* Right side toggle and nav items */}
                    {/* ============================================================== */}
                    <ul className="navbar-nav float-right ">
                        {/* ============================================================== */}
                        {/* Comment */}
                        {/* ============================================================== */}
                        {/* <li className="nav-item dropdown ">
                            <Link className="nav-link dropdown-toggle waves-effect waves-dark " data-toggle="dropdown" aria-haspopup="true" aria-expanded="false"> <i className="mdi mdi-bell font-24 mb-4" style={{ color: "darkorange" }} />
                            </Link>
                            <div className="dropdown-menu" aria-labelledby="navbarDropdown">
                                <Link className="dropdown-item" href="#">Action</Link>
                                <Link className="dropdown-item" href="#">Another action</Link>
                            
                                <Link className="dropdown-item" href="#">Something else here</Link>
                            </div>
                        </li> */}
                        {/* ============================================================== */}
                        {/* End Comment */}
                        {/* ============================================================== */}
                        {/* ============================================================== */}
                        {/* Messages */}
                        {/* ============================================================== */}
                        {/* <li className="nav-item dropdown">
                            <Link className="nav-link dropdown-toggle waves-effect waves-dark" id={2} data-toggle="dropdown" aria-haspopup="true" aria-expanded="false"> <i className="font-24 mdi mdi-comment-processing mb-2" style={{ color: "darkorange" }} />
                            </Link>
                            <div className="dropdown-menu dropdown-menu-right mailbox animated bounceInDown" aria-labelledby={2}>
                                <ul className="list-style-none">
                                    <li>
                                        <div className="true">
                                        
                                            <Link className="link border-top">
                                                <div className="d-flex no-block align-items-center p-10">
                                                    <span className="btn btn-success btn-circle"><i className="ti-calendar" /></span>
                                                    <div className="m-l-10">
                                                        <h5 className="m-b-0">Event today</h5>
                                                        <span className="mail-desc">Just a reminder that event</span>
                                                    </div>
                                                </div>
                                            </Link>
                                            
                                            <Link className="link border-top">
                                                <div className="d-flex no-block align-items-center p-10">
                                                    <span className="btn btn-info btn-circle"><i className="ti-settings" /></span>
                                                    <div className="m-l-10">
                                                        <h5 className="m-b-0">Settings</h5>
                                                        <span className="mail-desc">You can customize this template</span>
                                                    </div>
                                                </div>
                                            </Link>
                                            
                                            <Link className="link border-top">
                                                <div className="d-flex no-block align-items-center p-10">
                                                    <span className="btn btn-primary btn-circle"><i className="ti-user" /></span>
                                                    <div className="m-l-10">
                                                        <h5 className="m-b-0">Pavan kumar</h5>
                                                        <span className="mail-desc">Just see the my admin!</span>
                                                    </div>
                                                </div>
                                            </Link>
                                            
                                            <Link className="link border-top">
                                                <div className="d-flex no-block align-items-center p-10">
                                                    <span className="btn btn-danger btn-circle"><i className="fa fa-link" /></span>
                                                    <div className="m-l-10">
                                                        <h5 className="m-b-0">Luanch Admin</h5>
                                                        <span className="mail-desc">Just see the my new admin!</span>
                                                    </div>
                                                </div>
                                            </Link>
                                        </div>
                                    </li>
                                </ul>
                            </div>
                        </li> */}
                        {/* ============================================================== */}
                        {/* End Messages */}
                        {/* ============================================================== */}
                        {/* ============================================================== */}
                        {/* User profile and search */}
                        {/* ============================================================== */}
                        <li className="nav-item dropdown">
                            <Link className="nav-link dropdown-toggle text-muted waves-effect waves-dark pro-pic" href data-toggle="dropdown" aria-haspopup="true" aria-expanded="false"><img src="assets/images/users/1.jpg" alt="user" className="rounded-circle" width={31} /></Link>
                            <div className="dropdown-menu dropdown-menu-right user-dd animated">
                                <Link className="dropdown-item" to={'/AdminRegistration'}><PersonCircle size={20} /> My Profile</Link>
                                {/* <Link className="dropdown-item" ><i className="ti-wallet m-r-5 m-l-5" /> My Balance</Link> */}
                                {/* <Link className="dropdown-item"><i className="ti-email m-r-5 m-l-5" /> Inbox</Link> */}
                                {/* <div className="dropdown-divider" /> */}
                                {/* <Link className="dropdown-item"><i className="ti-settings m-r-5 m-l-5" /> Account Setting</Link> */}
                                {/* <div className="dropdown-divider" /> */}
                                <Link className="dropdown-item" onClick={logout} to={'/'}><Power size={20} /> Logout</Link>
                                {/* <div className="dropdown-divider" /> */}
                                {/* <div className="p-l-30 p-10"><Link  className="btn btn-sm btn-success btn-rounded">View Profile</Link></div> */}
                            </div>
                        </li>
                        {/* ============================================================== */}
                        {/* User profile and search */}
                        {/* ============================================================== */}
                    </ul>
                </div>
            </nav>
        </header>
  )
}

export default Usersview;