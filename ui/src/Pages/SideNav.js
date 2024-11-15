// import React, { useState,useEffect } from 'react'
// import { Columns, PeopleFill, PersonFill, PersonFillGear, Receipt, SafeFill, Stack } from 'react-bootstrap-icons'
// import {Navigate,NavLink, useNavigate,} from 'react-router-dom'
// const SideNav = () => {
//     const [role, setRole] = useState(null);
//     const navigate = useNavigate(); 

//     return (
//         <aside className="left-sidebar mt-3" data-sidebarbg="skin5">
//             {/* Sidebar scroll*/}
//             <div className="scroll-sidebar">
//                 {/* Sidebar navigation*/}
//                 <nav className="sidebar-nav">
//                     <ul id="sidebarnav" className="p-t-30">
//                         {role === 'admin' && (
//                             <>
//                                 <li className="sidebar-item ml-2"> <NavLink activeclassname='active' className="sidebar-link waves-effect waves-dark sidebar-link" to={'/AdminRegistration'} aria-expanded="false"><PersonFillGear size={22} /><span className="hide-menu ml-2">Company Registartion</span></NavLink></li>
//                                 <li className="sidebar-item ml-2"> <NavLink activeclassname='active' className="sidebar-link waves-effect waves-dark sidebar-link" to={'/Usersviews'} aria-expanded="false"><PersonFill size={20} /><span className="hide-menu ml-2">company view</span></NavLink></li>
//                             </>
//                         )}
//                         {role === 'Admin' && (
//                             <>
//                                 <li className="sidebar-item ml-2"> <NavLink exact='true' activeclassname='active' className="sidebar-link waves-effect waves-dark sidebar-link" to={'/main'} aria-expanded="false"><Columns size={20} /><span className="hide-menu ml-2" >Dashboard</span></NavLink></li>
//                                 <li className="sidebar-item ml-2"> <NavLink activeclassname='active' className="sidebar-link waves-effect waves-dark sidebar-link" to={'/Customers'} aria-expanded="false"><PeopleFill size={20} /><span className="hide-menu ml-2">Customers</span></NavLink></li>
//                                 <li className="sidebar-item ml-2"> <NavLink activeclassname='active' className="sidebar-link waves-effect waves-dark sidebar-link" to={'/productview'} aria-expanded="false"><Stack size={20} /><span className="hide-menu ml-2">Products</span></NavLink></li>
//                                 <li className="sidebar-item ml-2"> <NavLink activeclassname='active' className="sidebar-link waves-effect waves-dark sidebar-link" to={'/Invoices'} aria-expanded="false"><Receipt size={20} /><span className="hide-menu ml-2">Invoice</span></NavLink></li>
//                                 <li className="sidebar-item ml-2"> <NavLink activeclassname='active' className="sidebar-link waves-effect waves-dark sidebar-link" to={'/Usersviews'} aria-expanded="false"><PersonFill size={20} /><span className="hide-menu ml-2">Users</span></NavLink></li>
//                                 <li className="sidebar-item ml-2"> <NavLink activeclassname='active' className="sidebar-link waves-effect waves-dark sidebar-link" to={'/'} aria-expanded="false"><SafeFill size={20} /><span className="hide-menu ml-2">Accounts</span></NavLink></li>
//                             </>
//                         )}
//                         {role === 'Employee' && (
//                             <>
//                                 <li className="sidebar-item ml-2"> <NavLink exact='true' activeclassname='active' className="sidebar-link waves-effect waves-dark sidebar-link" to={'/main'} aria-expanded="false"><Columns size={20} /><span className="hide-menu ml-2" >Dashboard</span></NavLink></li>
//                                 <li className="sidebar-item ml-2"> <NavLink activeclassname='active' className="sidebar-link waves-effect waves-dark sidebar-link" to={'/Customers'} aria-expanded="false"><PeopleFill size={20} /><span className="hide-menu ml-2">Customers</span></NavLink></li>
//                                 <li className="sidebar-item ml-2"> <NavLink activeclassname='active' className="sidebar-link waves-effect waves-dark sidebar-link" to={'/productview'} aria-expanded="false"><Stack size={20} /><span className="hide-menu ml-2">Products</span></NavLink></li>
//                                 <li className="sidebar-item ml-2"> <NavLink activeclassname='active' className="sidebar-link waves-effect waves-dark sidebar-link" to={'/Invoices'} aria-expanded="false"><Receipt size={20} /><span className="hide-menu ml-2">Invoice</span></NavLink></li>
//                             </>
//                         )}
//                         {/* <li className="sidebar-item"> <a className="sidebar-link has-arrow waves-effect waves-dark"  aria-expanded="false"><i className="mdi mdi-receipt" /><span className="hide-menu">Forms </span></a>
//                     <ul aria-expanded="false" className="collapse  first-level">
//                         <li className="sidebar-item"><a href="form-basic.html" className="sidebar-link"><i className="mdi mdi-note-outline" /><span className="hide-menu"> Form Basic </span></a></li>
//                         <li className="sidebar-item"><a href="form-wizard.html" className="sidebar-link"><i className="mdi mdi-note-plus" /><span className="hide-menu"> Form Wizard </span></a></li>
//                     </ul>
//                     </li>
//                     <li className="sidebar-item"> <a className="sidebar-link waves-effect waves-dark sidebar-link" href="pages-buttons.html" aria-expanded="false"><i className="mdi mdi-relative-scale" /><span className="hide-menu">Buttons</span></a></li>
//                     <li className="sidebar-item"> <a className="sidebar-link has-arrow waves-effect waves-dark"  aria-expanded="false"><i className="mdi mdi-face" /><span className="hide-menu">Icons </span></a>
//                     <ul aria-expanded="false" className="collapse  first-level">
//                         <li className="sidebar-item"><a href="icon-material.html" className="sidebar-link"><i className="mdi mdi-emoticon" /><span className="hide-menu"> Material Icons </span></a></li>
//                         <li className="sidebar-item"><a href="icon-fontawesome.html" className="sidebar-link"><i className="mdi mdi-emoticon-cool" /><span className="hide-menu"> Font Awesome Icons </span></a></li>
//                     </ul>
//                     </li>
//                     <li className="sidebar-item"> <a className="sidebar-link waves-effect waves-dark sidebar-link" href="pages-elements.html" aria-expanded="false"><i className="mdi mdi-pencil" /><span className="hide-menu">Elements</span></a></li>
//                     <li className="sidebar-item"> <a className="sidebar-link has-arrow waves-effect waves-dark"  aria-expanded="false"><i className="mdi mdi-move-resize-variant" /><span className="hide-menu">Addons </span></a>
//                     <ul aria-expanded="false" className="collapse  first-level">
//                         <li className="sidebar-item"><a href="index2.html" className="sidebar-link"><i className="mdi mdi-view-dashboard" /><span className="hide-menu"> Dashboard-2 </span></a></li>
//                         <li className="sidebar-item"><a href="pages-gallery.html" className="sidebar-link"><i className="mdi mdi-multiplication-box" /><span className="hide-menu"> Gallery </span></a></li>
//                         <li className="sidebar-item"><a href="pages-calendar.html" className="sidebar-link"><i className="mdi mdi-calendar-check" /><span className="hide-menu"> Calendar </span></a></li>
//                         <li className="sidebar-item"><a href="pages-invoice.html" className="sidebar-link"><i className="mdi mdi-bulletin-board" /><span className="hide-menu"> Invoice </span></a></li>
//                         <li className="sidebar-item"><a href="pages-chat.html" className="sidebar-link"><i className="mdi mdi-message-outline" /><span className="hide-menu"> Chat Option </span></a></li>
//                     </ul>
//                     </li>
//                     <li className="sidebar-item"> <a className="sidebar-link has-arrow waves-effect waves-dark" " aria-expanded="false"><i className="mdi mdi-account-key" /><span className="hide-menu">Authentication </span></a>
//                     <ul aria-expanded="false" className="collapse  first-level">
//                         <li className="sidebar-item"><a href="authentication-login.html" className="sidebar-link"><i className="mdi mdi-all-inclusive" /><span className="hide-menu"> Login </span></a></li>
//                         <li className="sidebar-item"><a href="authentication-register.html" className="sidebar-link"><i className="mdi mdi-all-inclusive" /><span className="hide-menu"> Register </span></a></li>
//                     </ul>
//                     </li>
//                     <li className="sidebar-item"> <a className="sidebar-link has-arrow waves-effect waves-dark"  aria-expanded="false"><i className="mdi mdi-alert" /><span className="hide-menu">Errors </span></a>
//                     <ul aria-expanded="false" className="collapse  first-level">
//                         <li className="sidebar-item"><a href="error-403.html" className="sidebar-link"><i className="mdi mdi-alert-octagon" /><span className="hide-menu"> Error 403 </span></a></li>
//                         <li className="sidebar-item"><a href="error-404.html" className="sidebar-link"><i className="mdi mdi-alert-octagon" /><span className="hide-menu"> Error 404 </span></a></li>
//                         <li className="sidebar-item"><a href="error-405.html" className="sidebar-link"><i className="mdi mdi-alert-octagon" /><span className="hide-menu"> Error 405 </span></a></li>
//                         <li className="sidebar-item"><a href="error-500.html" className="sidebar-link"><i className="mdi mdi-alert-octagon" /><span className="hide-menu"> Error 500 </span></a></li>
//                     </ul>
//                     </li> */}
//                     </ul>
//                 </nav>
//                 {/* End Sidebar navigation */}
//             </div>
//             {/* End Sidebar scroll* 
             
//             ))}*/}
//         </aside>
//     )
// }

// export default SideNav

import React, { useEffect, useState } from 'react'
import { Columns, PeopleFill, PersonFill, PersonFillGear, Receipt, SafeFill, Stack } from 'react-bootstrap-icons'
import { NavLink, useLocation } from 'react-router-dom'

const SideNav = () => {
    const role = sessionStorage.getItem('role');
    const [isCompanyOpen, setIsCompanyOpen] = useState(false);
    const location = useLocation();
    // const { user } = useAuth();

    useEffect(() => {
        if (
            location.pathname === "/companyRegistration" ||
            location.pathname.startsWith("/companyView")
        ) {
            setIsCompanyOpen(true);
        } else {
            setIsCompanyOpen(false);
        }
    }, [location]);

    const toggleCompany = (e) => {
        e.preventDefault();
        setIsCompanyOpen(!isCompanyOpen);
      };

    return (
        <aside className="left-sidebar mt-3" data-sidebarbg="skin5">
            {/* Sidebar scroll*/}
            <div className="scroll-sidebar">
                {/* Sidebar navigation*/}
                <nav className="sidebar-nav">
                    <ul id="sidebarnav" className="p-t-30">
<<<<<<< Updated upstream
                        {role === 'Admin' && (
                            <>
                                <li className="sidebar-item ml-2"> <NavLink exact='true' activeclassname='active' className="sidebar-link waves-effect waves-dark sidebar-link" to={'/main'} aria-expanded="false"><Columns size={20} /><span className="hide-menu ml-2" >Dashboard</span></NavLink></li>
                                <li className="sidebar-item ml-2"> <NavLink activeclassname='active' className="sidebar-link waves-effect waves-dark sidebar-link" to={'/Customers'} aria-expanded="false"><PeopleFill size={20} /><span className="hide-menu ml-2">Customers</span></NavLink></li>
                                <li className="sidebar-item ml-2"> <NavLink activeclassname='active' className="sidebar-link waves-effect waves-dark sidebar-link" to={'/productview'} aria-expanded="false"><Stack size={20} /><span className="hide-menu ml-2">Products</span></NavLink></li>
                                <li className="sidebar-item ml-2"> <NavLink activeclassname='active' className="sidebar-link waves-effect waves-dark sidebar-link" to={'/Invoices'} aria-expanded="false"><Receipt size={20} /><span className="hide-menu ml-2">Invoice</span></NavLink></li>
                                <li className="sidebar-item ml-2"> <NavLink activeclassname='active' className="sidebar-link waves-effect waves-dark sidebar-link" to={'/AdminRegistration'} aria-expanded="false"><PersonFillGear size={22} /><span className="hide-menu ml-2">Company Registartion</span></NavLink></li>
                                <li className="sidebar-item ml-2"> <NavLink activeclassname='active' className="sidebar-link waves-effect waves-dark sidebar-link" to={'/Usersviews'} aria-expanded="false"><PersonFill size={20} /><span className="hide-menu ml-2">Users</span></NavLink></li>
                                <li className="sidebar-item ml-2"> <NavLink activeclassname='active' className="sidebar-link waves-effect waves-dark sidebar-link" to={'/'} aria-expanded="false"><SafeFill size={20} /><span className="hide-menu ml-2">Accounts</span></NavLink></li>
                            </>
                        )}
=======
                        {/* {user && user.userRole && user.userRole.includes("admin") && ( */}
                            <>
                                <li
                                    className={`sidebar-item ${location.pathname === "/main" ? "active" : ""
                                        }`}
                                >
                                    <a className="sidebar-link" href={"/main"}>
                                        <i
                                            className="bi bi-grid-1x2-fill"

                                        ></i>
                                        <span className="align-middle">
                                            Dashboard
                                        </span>
                                    </a>
                                </li>
                                <li className="sidebar-item">
                                    <a
                                        className="sidebar-link collapsed d-flex justify-content-between align-items-center"
                                        href
                                        onClick={toggleCompany}
                                        data-bs-target="#company"
                                        data-bs-toggle="collapse"
                                    >
                                        <span className="align-middle">
                                            <i className="bi bi-building" ></i>
                                        </span>{" "}
                                        <span className="align-middle">
                                            Employer
                                        </span>
                                        <i
                                            className={`bi ${isCompanyOpen ? "bi-chevron-up" : "bi-chevron-down"
                                                } ms-auto`}
                                        ></i>
                                    </a>
                                    <ul
                                        id="company"
                                        className={`sidebar-dropDown list-unstyled collapse ${isCompanyOpen ? "show" : ""
                                            }`}
                                        data-bs-parent="#sidebar"
                                    >
                                        <li
                                            style={{ paddingLeft: "40px" }}
                                            className={`sidebar-item ${location.pathname.startsWith === "/AdminRegistration"
                                                ? "active"
                                                : ""
                                                }`}
                                        >
                                            <a className="sidebar-link" href={"/AdminRegistration"}>
                                                Registration
                                            </a>
                                        </li>
                                        <li
                                            style={{ paddingLeft: "40px" }}
                                            className={`sidebar-item ${location.pathname.startsWith("/companyView")
                                                ? "active"
                                                : ""
                                                }`}
                                        >
                                            <a className="sidebar-link" href={"/companyView"}>
                                                Summary
                                            </a>
                                        </li>
                                    </ul>
                                </li>
                            </>
                        {/* )} */}
                        {role === 'admin' && (
                            <>                    
                                <li className="sidebar-item ml-2"> <NavLink activeclassname='active' className="sidebar-link waves-effect waves-dark sidebar-link" to={'/AdminRegistration'} aria-expanded="false"><PersonFillGear size={22} /><span className="hide-menu ml-2">Company Registartion</span></NavLink></li>
                                <li className="sidebar-item ml-2"> <NavLink activeclassname='active' className="sidebar-link waves-effect waves-dark sidebar-link" to={'/Usersviews'} aria-expanded="false"><PersonFill size={20} /><span className="hide-menu ml-2">company view</span></NavLink></li>
                            </>
                         )}
>>>>>>> Stashed changes
                        {role === 'Employee' && (
                            <>
                                <li className="sidebar-item ml-2"> <NavLink exact='true' activeclassname='active' className="sidebar-link waves-effect waves-dark sidebar-link" to={'/main'} aria-expanded="false"><Columns size={20} /><span className="hide-menu ml-2" >Dashboard</span></NavLink></li>
                                <li className="sidebar-item ml-2"> <NavLink activeclassname='active' className="sidebar-link waves-effect waves-dark sidebar-link" to={'/Customers'} aria-expanded="false"><PeopleFill size={20} /><span className="hide-menu ml-2">Customers</span></NavLink></li>
                                <li className="sidebar-item ml-2"> <NavLink activeclassname='active' className="sidebar-link waves-effect waves-dark sidebar-link" to={'/productview'} aria-expanded="false"><Stack size={20} /><span className="hide-menu ml-2">Products</span></NavLink></li>
                                <li className="sidebar-item ml-2"> <NavLink activeclassname='active' className="sidebar-link waves-effect waves-dark sidebar-link" to={'/Invoices'} aria-expanded="false"><Receipt size={20} /><span className="hide-menu ml-2">Invoice</span></NavLink></li>
                            </>
                        )}
                        {/* <li className="sidebar-item"> <a className="sidebar-link has-arrow waves-effect waves-dark"  aria-expanded="false"><i className="mdi mdi-receipt" /><span className="hide-menu">Forms </span></a>
                    <ul aria-expanded="false" className="collapse  first-level">
                        <li className="sidebar-item"><a href="form-basic.html" className="sidebar-link"><i className="mdi mdi-note-outline" /><span className="hide-menu"> Form Basic </span></a></li>
                        <li className="sidebar-item"><a href="form-wizard.html" className="sidebar-link"><i className="mdi mdi-note-plus" /><span className="hide-menu"> Form Wizard </span></a></li>
                    </ul>
                    </li>
                    <li className="sidebar-item"> <a className="sidebar-link waves-effect waves-dark sidebar-link" href="pages-buttons.html" aria-expanded="false"><i className="mdi mdi-relative-scale" /><span className="hide-menu">Buttons</span></a></li>
                    <li className="sidebar-item"> <a className="sidebar-link has-arrow waves-effect waves-dark"  aria-expanded="false"><i className="mdi mdi-face" /><span className="hide-menu">Icons </span></a>
                    <ul aria-expanded="false" className="collapse  first-level">
                        <li className="sidebar-item"><a href="icon-material.html" className="sidebar-link"><i className="mdi mdi-emoticon" /><span className="hide-menu"> Material Icons </span></a></li>
                        <li className="sidebar-item"><a href="icon-fontawesome.html" className="sidebar-link"><i className="mdi mdi-emoticon-cool" /><span className="hide-menu"> Font Awesome Icons </span></a></li>
                    </ul>
                    </li>
                    <li className="sidebar-item"> <a className="sidebar-link waves-effect waves-dark sidebar-link" href="pages-elements.html" aria-expanded="false"><i className="mdi mdi-pencil" /><span className="hide-menu">Elements</span></a></li>
                    <li className="sidebar-item"> <a className="sidebar-link has-arrow waves-effect waves-dark"  aria-expanded="false"><i className="mdi mdi-move-resize-variant" /><span className="hide-menu">Addons </span></a>
                    <ul aria-expanded="false" className="collapse  first-level">
                        <li className="sidebar-item"><a href="index2.html" className="sidebar-link"><i className="mdi mdi-view-dashboard" /><span className="hide-menu"> Dashboard-2 </span></a></li>
                        <li className="sidebar-item"><a href="pages-gallery.html" className="sidebar-link"><i className="mdi mdi-multiplication-box" /><span className="hide-menu"> Gallery </span></a></li>
                        <li className="sidebar-item"><a href="pages-calendar.html" className="sidebar-link"><i className="mdi mdi-calendar-check" /><span className="hide-menu"> Calendar </span></a></li>
                        <li className="sidebar-item"><a href="pages-invoice.html" className="sidebar-link"><i className="mdi mdi-bulletin-board" /><span className="hide-menu"> Invoice </span></a></li>
                        <li className="sidebar-item"><a href="pages-chat.html" className="sidebar-link"><i className="mdi mdi-message-outline" /><span className="hide-menu"> Chat Option </span></a></li>
                    </ul>
                    </li>
                    <li className="sidebar-item"> <a className="sidebar-link has-arrow waves-effect waves-dark" " aria-expanded="false"><i className="mdi mdi-account-key" /><span className="hide-menu">Authentication </span></a>
                    <ul aria-expanded="false" className="collapse  first-level">
                        <li className="sidebar-item"><a href="authentication-login.html" className="sidebar-link"><i className="mdi mdi-all-inclusive" /><span className="hide-menu"> Login </span></a></li>
                        <li className="sidebar-item"><a href="authentication-register.html" className="sidebar-link"><i className="mdi mdi-all-inclusive" /><span className="hide-menu"> Register </span></a></li>
                    </ul>
                    </li>
                    <li className="sidebar-item"> <a className="sidebar-link has-arrow waves-effect waves-dark"  aria-expanded="false"><i className="mdi mdi-alert" /><span className="hide-menu">Errors </span></a>
                    <ul aria-expanded="false" className="collapse  first-level">
                        <li className="sidebar-item"><a href="error-403.html" className="sidebar-link"><i className="mdi mdi-alert-octagon" /><span className="hide-menu"> Error 403 </span></a></li>
                        <li className="sidebar-item"><a href="error-404.html" className="sidebar-link"><i className="mdi mdi-alert-octagon" /><span className="hide-menu"> Error 404 </span></a></li>
                        <li className="sidebar-item"><a href="error-405.html" className="sidebar-link"><i className="mdi mdi-alert-octagon" /><span className="hide-menu"> Error 405 </span></a></li>
                        <li className="sidebar-item"><a href="error-500.html" className="sidebar-link"><i className="mdi mdi-alert-octagon" /><span className="hide-menu"> Error 500 </span></a></li>
                    </ul>
                    </li> */}
                    </ul>
                </nav>
                {/* End Sidebar navigation */}
            </div>
            {/* End Sidebar scroll* 
             
            ))}*/}
        </aside>
    )
}

export default SideNav