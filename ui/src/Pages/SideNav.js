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
                        {/* {user && user.userRole && user.userRole.includes("admin") && ( */}
                            {/* <>
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
                            </> */}
                        {/* )} */}
                        {role === 'admin' && (
                            <>                    
                                <li className="sidebar-item ml-2"> <NavLink activeclassname='active' className="sidebar-link waves-effect waves-dark sidebar-link" to={'/AdminRegistration'} aria-expanded="false"><PersonFillGear size={22} /><span className="hide-menu ml-2">Company Registartion</span></NavLink></li>
                                <li className="sidebar-item ml-2"> <NavLink activeclassname='active' className="sidebar-link waves-effect waves-dark sidebar-link" to={'/Usersviews'} aria-expanded="false"><PersonFill size={20} /><span className="hide-menu ml-2">company view</span></NavLink></li>
                            </>
                         )}
                        {/* {role === 'Employee' && ( */}
                            <>
                                <li className="sidebar-item ml-2"> <NavLink exact='true' activeclassname='active' className="sidebar-link waves-effect waves-dark sidebar-link" to={'/main'} aria-expanded="false"><Columns size={20} /><span className="hide-menu ml-2" >Dashboard</span></NavLink></li>
                                <li className="sidebar-item ml-2"> <NavLink activeclassname='active' className="sidebar-link waves-effect waves-dark sidebar-link" to={'/Customers'} aria-expanded="false"><PeopleFill size={20} /><span className="hide-menu ml-2">Customers</span></NavLink></li>
                                <li className="sidebar-item ml-2"> <NavLink activeclassname='active' className="sidebar-link waves-effect waves-dark sidebar-link" to={'/productview'} aria-expanded="false"><Stack size={20} /><span className="hide-menu ml-2">Products</span></NavLink></li>
                                <li className="sidebar-item ml-2"> <NavLink activeclassname='active' className="sidebar-link waves-effect waves-dark sidebar-link" to={'/Invoices'} aria-expanded="false"><Receipt size={20} /><span className="hide-menu ml-2">Invoice</span></NavLink></li>
                            </>
                        {/* )} */}
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