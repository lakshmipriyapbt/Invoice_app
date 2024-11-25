import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../Context/AuthContext";
import { jwtDecode } from "jwt-decode";
import { toast } from "react-toastify";
import { PersonCircle } from "react-bootstrap-icons";
import Reset from "./CompanyReset";
import { Modal, ModalBody, ModalHeader, ModalTitle } from "react-bootstrap";
import CompanyReset from "./CompanyReset";
import UserReset from "./UserReset";

const TopNav = ({ toggleSidebar }) => {
    const [isProfileOpen, setIsProfileOpen] = useState(false);
    const [showCompanyResetPasswordModal, setShowCompanyResetPasswordModal] = useState(false);
    const [showUserResetPasswordModal, setShowUserResetPasswordModal] = useState(false);
    const [showErrorModal, setShowErrorModal] = useState(false);
    const [roles, setRoles] = useState([]);
    const { user } = useAuth();
    const navigate = useNavigate();

    const token = localStorage.getItem("token");

    useEffect(() => {
        if (token) {
            const decodedToken = jwtDecode(token);
            const roles = decodedToken?.roles || [];
            setRoles(roles);

            const currentTime = Date.now() / 1000;
            const remainingTime = decodedToken.exp - currentTime;

            if (remainingTime > 0) {
                const timeoutId = setTimeout(() => {
                    handleLogOut();
                }, remainingTime * 1000);

                return () => clearTimeout(timeoutId);
            } else {
                handleLogOut();
            }
        }
    }, [token]);

    const handleResetCompanyPasswordClick = () => {
        setShowCompanyResetPasswordModal(true);
    };

    const handleResetUserPasswordClick = () => {
        setShowUserResetPasswordModal(true);
    }

    const toggleProfile = () => {
        setIsProfileOpen(!isProfileOpen);
    };

    const closeModal = () => {
        setShowErrorModal(false);
        navigate("/");
    };

    const handleLogOut = () => {
        localStorage.clear();
        toast.success("Logout Successful");
        navigate("/");
    };
    const isAdmin = roles.includes("ADMIN");
    const isCompanyAdmin = roles.includes("COMPANY_ROLE");
    const isUser = roles.includes("USER_ROLE");

    return (
        <header className="topbar" data-navbarbg="skin5" style={{ marginBottom: "10px", paddingBottom: "10px" }}>
            <nav className="navbar top-navbar navbar-expand-md navbar-dark" style={{ width: "100%", position: "fixed" }}>
                <div className="navbar-header" data-logobg="skin5">
                    <a className="nav-toggler waves-effect waves-light d-block d-md-none" href="javascript:void(0)">
                        <i className="ti-menu ti-close" />
                    </a>
                    <a className="navbar-brand" href="index.html">
                        <b className="logo-icon p-l-10">
                            <img
                                src="assets/images/pathbreaker_logo.png"
                                alt="homepage"
                                className="light-logo"
                                style={{ height: "65px", width: "180px", marginTop: "10px" }}
                            />
                        </b>
                    </a>
                </div>
                <div className="navbar-collapse collapse" id="navbarSupportedContent" data-navbarbg="skin5">
                    <ul className="navbar-nav ml-auto">
                        <li className="nav-item">
                            {isAdmin && (
                                <li className="nav-item">
                                    <a
                                        className="nav-link dropdown-toggle d-none d-sm-inline-block text-center"
                                        href="#"
                                        onClick={toggleProfile}
                                    >
                                        <PersonCircle size={30} style={{ color: "black", marginTop: "5px" }} />
                                    </a>
                                    {isProfileOpen && (
                                        <div
                                            className="dropdown-menu dropdown-menu-end py-0 show"
                                            aria-labelledby="profileDropdown"
                                            style={{ left: "auto", right: "1%" }}
                                        >
                                            <a className="dropdown-item" href="#" onClick={handleLogOut}>
                                                <i className="align-middle bi bi-arrow-left-circle" style={{ paddingRight: "10px" }}></i>
                                                Logout
                                            </a>
                                        </div>
                                    )}
                                </li>
                            )}
                            {isCompanyAdmin && (
                                <li className="nav-item">
                                    <a
                                        className="nav-link dropdown-toggle d-none d-sm-inline-block text-center"
                                        href="#"
                                        onClick={toggleProfile}
                                    >
                                        <PersonCircle size={30} style={{ color: "black", marginTop: "5px" }} />
                                    </a>
                                    {isProfileOpen && (
                                        <div
                                            className="dropdown-menu dropdown-menu-end py-0 show"
                                            aria-labelledby="profileDropdown"
                                            style={{ left: "auto", right: "1%" }}
                                        >
                                            <a className="dropdown-item" href="/companyProfile">
                                                <i className="align-middle me-1 bi bi-person"></i> Profile
                                            </a>
                                            <a className="dropdown-item" href onClick={handleResetCompanyPasswordClick}>
                                                <i className="align-middle me-1 bi bi-key"></i> Reset Password
                                            </a>
                                            <div className="dropdown-divider" style={{ margin: "0" }}></div>
                                            <a className="dropdown-item" href onClick={handleLogOut}>
                                                <i className="align-middle bi bi-arrow-left-circle" style={{ paddingRight: "10px" }}></i>
                                                Logout
                                            </a>
                                        </div>
                                    )}
                                </li>
                            )}
                            {isUser && (
                                <li className="nav-item">
                                    <a
                                        className="nav-link dropdown-toggle d-none d-sm-inline-block text-center"
                                        href="#"
                                        onClick={toggleProfile}
                                    >
                                        <PersonCircle size={30} style={{ color: "black", marginTop: "5px" }} />
                                    </a>
                                    {isProfileOpen && (
                                        <div
                                            className="dropdown-menu dropdown-menu-end py-0 show"
                                            aria-labelledby="profileDropdown"
                                            style={{ left: "auto", right: "1%" }}
                                        >
                                            <a className="dropdown-item" href="/userProfile">
                                                <i className="align-middle me-1 bi bi-person"></i> Profile
                                            </a>
                                            <a className="dropdown-item" href onClick={handleResetUserPasswordClick}>
                                                <i className="align-middle me-1 bi bi-key"></i> Reset Password
                                            </a>
                                            <div className="dropdown-divider" style={{ margin: "0" }}></div>
                                            <a className="dropdown-item" href onClick={handleLogOut}>
                                                <i className="align-middle bi bi-arrow-left-circle" style={{ paddingRight: "10px" }}></i>
                                                Logout
                                            </a>
                                        </div>
                                    )}
                                </li>
                            )}
                        </li>
                    </ul>
                </div>
                {showCompanyResetPasswordModal ? (
                    <CompanyReset
                        companyName={user.company}
                        show={showCompanyResetPasswordModal}
                        onClose={() => setShowCompanyResetPasswordModal(false)}
                    />
                ) : showUserResetPasswordModal ? (
                    <UserReset
                        show={showUserResetPasswordModal}
                        onClose={() => setShowUserResetPasswordModal(false)}
                    />
                ) : null}

                {/* Error Modal */}
                <Modal show={showErrorModal} onHide={closeModal} centered style={{ zIndex: "1050" }}>
                    <ModalHeader closeButton>
                        <ModalTitle className="text-center">Error</ModalTitle>
                    </ModalHeader>
                    <ModalBody className="text-center fs-bold">
                        Session Timeout! Please log in.
                    </ModalBody>
                </Modal>
                )
            </nav>
        </header>
    );
};

export default TopNav;
