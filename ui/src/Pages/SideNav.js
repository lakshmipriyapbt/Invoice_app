import React, { useEffect, useState } from 'react';
import { Columns, PeopleFill, Stack, Receipt, BuildingsFill, PersonFill, ChatQuoteFill } from 'react-bootstrap-icons'; // Importing React-based icons
import { NavLink, useLocation } from 'react-router-dom';
import { useAuth } from '../Context/AuthContext';

const SideNav = () => {
    const role = sessionStorage.getItem('role');
    const [isCompanyOpen, setIsCompanyOpen] = useState(false);
    const location = useLocation();
    const { user } = useAuth();

    useEffect(() => {
        if (location.pathname === "/companyRegistration" || location.pathname.startsWith("/companyView")) {
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
            <div className="scroll-sidebar">
                <nav className="sidebar-nav">
                    <ul id="sidebarnav" className="p-t-30">
                        {user && user.userRole && user.userRole.includes("ADMIN") && (
                            <>
                                <li className="sidebar-item ml-2">
                                    <NavLink exact='true' activeclassname='active' className="sidebar-link waves-effect waves-dark sidebar-link" to={'/main'}>
                                        <Columns size={20} />
                                        <span className="hide-menu ml-2">Dashboard</span>
                                    </NavLink>
                                </li>
                                <li className="sidebar-item ml-2">
                                    <a exact='true' activeclassname='active' className="sidebar-link waves-effect waves-dark sidebar-link" href="#" onClick={toggleCompany}>
                                        <BuildingsFill size={20} />
                                        <span className="hide-menu ml-2">Employer</span>
                                        <i className={`bi ${isCompanyOpen ? "bi-chevron-up" : "bi-chevron-down"} ms-auto`} />
                                    </a>
                                    <ul id="company" className={`sidebar-dropDown list-unstyled collapse ${isCompanyOpen ? "show" : ""}`} data-bs-parent="#sidebar">
                                        <li activeclassname='active' className={`sidebar-item ${location.pathname === "/companyRegistration"}`} style={{ paddingLeft: "40px" }}>
                                            <a className="sidebar-link" href="/companyRegistration">Registration</a>
                                        </li>
                                        <li activeclassname='active' className={`sidebar-item ${location.pathname.startsWith("/companyView")}`} style={{ paddingLeft: "40px" }}>
                                            <a className="sidebar-link" href="/companyView">Summary</a>
                                        </li>
                                    </ul>
                                </li>
                            </>
                        )}
                        {user && user.userRole && user.userRole.includes("COMPANY_ROLE") && (
                            <>
                                <li className="sidebar-item ml-2">
                                    <NavLink exact='true' activeclassname='active' className="sidebar-link waves-effect waves-dark sidebar-link" to={'/main'}>
                                        <Columns size={20} />
                                        <span className="hide-menu ml-2">Dashboard</span>
                                    </NavLink>
                                </li>
                                <li className="sidebar-item ml-2">
                                    <NavLink className="sidebar-link waves-effect waves-dark sidebar-link" to={'/Customers'}>
                                        <PeopleFill size={20} />
                                        <span className="hide-menu ml-2">Customers</span>
                                    </NavLink>
                                </li>
                                <li className="sidebar-item ml-2">
                                    <NavLink activeclassname='active' className="sidebar-link waves-effect waves-dark sidebar-link" to={'/productview'}>
                                        <Stack size={20} />
                                        <span className="hide-menu ml-2">Products</span>
                                    </NavLink>
                                </li>
                                <li className="sidebar-item ml-2">
                                    <NavLink activeclassname='active' className="sidebar-link waves-effect waves-dark sidebar-link" to={'/Quotations'}>
                                        <ChatQuoteFill size={20} />
                                        <span className="hide-menu ml-2">Quotation</span>
                                    </NavLink>
                                </li>
                                <li className="sidebar-item ml-2">
                                    <NavLink activeclassname='active' className="sidebar-link waves-effect waves-dark sidebar-link" to={'/Invoices'}>
                                        <Receipt size={20} />
                                        <span className="hide-menu ml-2">Invoice</span>
                                    </NavLink>
                                </li>
                                <li className="sidebar-item ml-2">
                                    <NavLink activeclassname='active' className="sidebar-link waves-effect waves-dark sidebar-link" to={'/Usersviews'}>
                                        <PersonFill size={20} />
                                        <span className="hide-menu ml-2">Users</span>
                                    </NavLink>
                                </li>
                            </>
                        )}
                        {user && user.userRole && user.userRole.includes("USER_ROLE") && (
                            <>
                                <li className="sidebar-item ml-2">
                                    <NavLink exact='true' activeclassname='active' className="sidebar-link waves-effect waves-dark sidebar-link" to={'/main'}>
                                        <Columns size={20} />
                                        <span className="hide-menu ml-2">Dashboard</span>
                                    </NavLink>
                                </li>
                                <li className="sidebar-item ml-2">
                                    <NavLink className="sidebar-link waves-effect waves-dark sidebar-link" to={'/Customers'}>
                                        <PeopleFill size={20} />
                                        <span className="hide-menu ml-2">Customers</span>
                                    </NavLink>
                                </li>
                                <li className="sidebar-item ml-2">
                                    <NavLink activeclassname='active' className="sidebar-link waves-effect waves-dark sidebar-link" to={'/productview'}>
                                        <Stack size={20} />
                                        <span className="hide-menu ml-2">Products</span>
                                    </NavLink>
                                </li>
                                <li className="sidebar-item ml-2">
                                    <NavLink activeclassname='active' className="sidebar-link waves-effect waves-dark sidebar-link" to={'/Quotations'}>
                                        <ChatQuoteFill size={20} />
                                        <span className="hide-menu ml-2">Quotation</span>
                                    </NavLink>
                                </li>
                                <li className="sidebar-item ml-2">
                                    <NavLink activeclassname='active' className="sidebar-link waves-effect waves-dark sidebar-link" to={'/Invoices'}>
                                        <Receipt size={20} />
                                        <span className="hide-menu ml-2">Invoice</span>
                                    </NavLink>
                                </li>
                            </>
                        )}
                    </ul>
                </nav>
            </div>
        </aside>
    );
};

export default SideNav;