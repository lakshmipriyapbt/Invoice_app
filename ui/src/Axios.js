import axios from "axios";

const protocol = window.location.protocol;
const hostname = window.location.hostname;


const BASE_URL = `${protocol}//${hostname}:8002/invoice`;
const Login_URL = `${protocol}//${hostname}:8004/invoice`;

const token = localStorage.getItem("token");

const axiosInstance = axios.create({
    baseURL: BASE_URL,
    headers: {
        Authorization: `Bearer ${token}`,
    }
});
export const loginApi = (data) => {
    return axios
        .post(`${Login_URL}/admin/login`, data)
        .then((response) => {
            const { token, refreshToken } = response.data.data;
            localStorage.setItem("token", token);
            localStorage.setItem("refreshToken", refreshToken);
            return response.data;
        })
        .catch((error) => {
            if (error.response) {
                const {
                    path,
                    error: { message },
                } = error.response.data;
                console.log(`Error at ${path}: ${message}`);
                return Promise.reject(message);
            } else if (error.request) {
                console.log(error.request);
            } else {
                console.log("Error", error.message);
            }
            console.log(error);
        });
};
export const CompanyloginApi = (data) => {
    return axios.post(`${Login_URL}/company/login`, data)
        .then(response => {
            const { token, refreshToken } = response.data?.data || {};
            if (token && refreshToken) {
                localStorage.setItem("token", token);
                localStorage.setItem("refreshToken", refreshToken);
            }
            return response.data; // Return the full response
        })
        .catch(error => {
            const errorMessage = error.response?.data?.error?.message || "An unknown error occurred.";
            console.error(errorMessage); // Log the error for debugging
            throw new Error(errorMessage); // Throw an error with the message
        });
};


export const ValidateCompanyOtp = (data) => {
    return axiosInstance.post(`${Login_URL}/validate/companyOtp`, data);
}

export const UserloginApi = (data) => {
    return axios.post(`${Login_URL}/user/login`, data)
        .then(response => {
            const { token, refreshToken } = response.data?.data || {};
            if (token && refreshToken) {
                localStorage.setItem("token", token);
                localStorage.setItem("refreshToken", refreshToken);
            }
            return response.data; // Return the full response
        })
        .catch(error => {
            const errorMessage = error.response?.data?.error?.message || "An unknown error occurred.";
            console.error(errorMessage); // Log the error for debugging
            throw new Error(errorMessage); // Throw an error with the message
        });
};


export const ValidateUserOtp = (data) => {
    return axiosInstance.post(`${Login_URL}/validate/userOtp`, data);
}

export const companyForgotPassword = (data) => {
    return axios.patch(`${Login_URL}/company/forgotPassword`, data);
}

export const userForgotPassword = (data) => {
    return axios.patch(`${Login_URL}/user/forgotPassword`, data);
}

export const companyResetPassword = (data) => {
    return axiosInstance.patch(`${Login_URL}/companyPassword`, data);
}

export const userResetPassword = (data) => {
    return axiosInstance.patch(`${Login_URL}/userPassword`, data);
}

export const CompanyImagePatchApi = (companyId, formData) => {
    return axiosInstance.patch(`/company/${companyId}/logo`, formData);
}

export const CompanyRegistrationApi = (data) => {
    return axiosInstance.post('/company', data, {
        headers: {
            'Content-Type': 'application/json',
        }
    });
}

export const companyViewApi = async () => {
    return axiosInstance.get("/company/all");
};

export const companyViewByIdApi = (companyId) => {
    return axiosInstance.get(`/company/${companyId}`)
        .then(response => {
            return response.data;
        })
        .catch(error => {
            console.error('Error fetching company by ID:', error);
            throw error;
        });
};


export const companyDetailsByIdApi = async (companyId) => {
    return axiosInstance.get(`/company/${companyId}`);
}

export const companyDeleteByIdApi = async (companyId) => {
    return axiosInstance.delete(`/company/${companyId}`);
};

export const companyUpdateByIdApi = async (companyId, data) => {
    return axiosInstance.patch(`/company/${companyId}`, data, {
        headers: {
            'Content-Type': 'application/json',
        }
    });
};

export const companyPasswordUpdateById = async (companyId) => {
    axiosInstance.patch(`/company/password/${companyId}`);
}

export const InvoiceGetApi = () => {
    return axiosInstance.get(`/invoice/all`);
}

export const InvoicePostApi = (data) => {
    return axiosInstance.post('/invoice', data, {
        headers: {
            'Content-Type': 'application/json',
        }
    });
}

export const InvoiceGetApiById = (invoiceId) => {
    return axiosInstance.get(`/invoice/${invoiceId}`)
}

export const InvoiceDeleteApiById = (invoiceId) => {
    const company = localStorage.getItem("companyName")
    return axiosInstance.delete(`/invoice/${invoiceId}`)
        .then(response => {
            return response.data;
        })
        .catch(error => {
            console.error('Error fetching company by ID:', error);
            throw error;
        });
}

export const InvoicePutApiById = (invoiceId, data) => {
    return axiosInstance.patch(`/invoice/${invoiceId}`, data)
};

export const InvoiceDownloadApi = async (invoiceId, data) => {
    try {
        const response = await axiosInstance.get(`/invoice/${invoiceId}/generate`, {
            params: data,
            responseType: 'blob',
            headers: {
                'Accept': 'application/pdf',
            }
        });
        if (response.status === 200 && response.data) {
            const url = window.URL.createObjectURL(new Blob([response.data]));
            const a = document.createElement('a');
            a.href = url;
            a.download = `invoice_${invoiceId}.pdf`;
            document.body.appendChild(a);
            a.click();
            a.remove();
            window.URL.revokeObjectURL(url);
            return true;
        } else {
            console.error('Error: Invalid response or empty data');
            return false;
        }
    } catch (error) {
        console.error('Download error:', error.response || error.message || error);
        return false; // Return false or handle the error as needed
    }
};

export const QuotationGetApi = () => {
    return axiosInstance.get(`/quotation/all`);
}

export const QuotationPostApi = (x) => {
    return axiosInstance.post('/quotation', x, {
        headers: {
            'Content-Type': 'application/json',
        }
    });
}

export const QuotationGetApiById = (quotationId) => {
    return axiosInstance.get(`/quotation/${quotationId}`)
}

export const QuotationDeleteApiById = (quotationId) => {
    return axiosInstance.delete(`/quotation/${quotationId}`)
        .then(response => {
            return response.data;
        })
        .catch(error => {
            console.error('Error fetching company by ID:', error);
            throw error;
        });
}

export const QuotationPutApiById = (quotationId, data) => {
    return axiosInstance.patch(`/quotation/${quotationId}`, data)
};

export const QuotationGenerateApi = (quotationId, data) => {
    return axiosInstance.get(`/quotation/${quotationId}/generate`, data)
}

export const ProductsGetApi = async () => {
    return axiosInstance.get("/product/all");
};

export const ProductPostApi = (data) => {
    return axiosInstance.post('/product', data, {
        headers: {
            'Content-Type': 'application/json',
        }
    });
}

export const ProductGetApiById = (productId) => {
    return axiosInstance.get(`/product/${productId}`)
}

export const ProdcutDeleteApiById = (productId) => {
    return axiosInstance.delete(`/product/${productId}`)
}

export const ProdcutPutApiById = (productId, data) => {
    return axiosInstance.patch(`/product/${productId}`, data)
};


export const CustomerGetApi = async () => {
    return axiosInstance.get("/customer/all");
};

export const CustomerPostApi = (data) => {
    return axiosInstance.post('/customer', data);
}

export const CustomerGetApiById = (customerId) => {
    return axiosInstance.get(`/customer/${customerId}`)
}

export const CustomerDeleteApiById = (customerId) => {
    const company = localStorage.getItem("companyName")
    return axiosInstance.delete(`/customer/${customerId}`)
        .then(response => {
            return response.data;
        })
        .catch(error => {
            console.error('Error fetching company by ID:', error);
            throw error;
        });
}

export const CustomerPatchApiById = (customerId, data) => {
    return axiosInstance.patch(`/customer/${customerId}`, data)
};

export const roleApi = () => {
    return axiosInstance.get("/role/all");
}

export const UsersGetApi = async () => {
    return axiosInstance.get("/user/all");
};

export const UserPostApi = (data) => {
    return axiosInstance.post('/user', data, {
        headers: {
            'Content-Type': 'application/json',
        }
    });
}
export const UserGetApiById = (userId) => {
    const company = localStorage.getItem("companyName")
    return axiosInstance.get(`/user/${userId}`)
        .then(response => {
            return response.data;
        })
        .catch(error => {
            console.error('Error fetching company by ID:', error);
            throw error;
        });
}
export const UserDeleteApiById = (userId) => {
    const company = localStorage.getItem("companyName")
    return axiosInstance.delete(`/user/${userId}`)
        .then(response => {
            return response.data;
        })
        .catch(error => {
            console.error('Error fetching company by ID:', error);
            throw error;
        });
}
export const UserPatchApiById = (userId, data) => {
    return axiosInstance.patch(`/user/${userId}`, data)
};

// export const EmployeePayslipGenerationPostById = (employeeId, salaryId, data) => {
//     return axiosInstance.post(`/${employeeId}/salary/${salaryId}`, data);
// }

// export const EmployeePayslipResponse = (data) => {
//     return axiosInstance.post("/payslip", data);
// }

// export const EmployeePayslipGeneration = (data) => {
//     return axiosInstance.post("/salary", data);
// }

// export const EmployeePayslipUpdate = (employeeId, payslipId, payload) => {
//     return axiosInstance.post(`/employee/${employeeId}/payslip/${payslipId}`, payload);
// }

// export const EmployeePayslipGetById = (employeeId, payslipId, month, year) => {
//     const company = localStorage.getItem("companyName")
//     return axiosInstance.get(`/${company}/employee/${employeeId}/payslip/${payslipId}`, {
//         params: {
//             month: month,
//             year: year
//         }
//     });
// };


// export const EmployeePayslipsGet = (employeeId, month, year) => {
//     const company = localStorage.getItem("company")
//     return axiosInstance.get(`/${company}/employee/${employeeId}/payslips`, {
//         params: {
//             month, year
//         }
//     });
// }

// export const AllEmployeePayslipsGet = (month, year) => {
//     const company = localStorage.getItem("company")
//     return axiosInstance.get(`/${company}/employee/all/payslip`, {
//         params: {
//             month, year
//         }
//     });
// }

// export const EmployeePaySlipDownloadById = async (employeeId, payslipId) => {
//     const company = localStorage.getItem("companyName");

//     try {
//         // Make the API request with specific headers for this request
//         const response = await axiosInstance.get(`/${company}/employee/${employeeId}/template/3/download/${payslipId}`, {
//             responseType: 'blob', // Handle the response as a binary blob
//             headers: {
//                 'Accept': 'application/pdf', // Accept PDF format
//             }
//         });

//         // Create a URL for the blob and trigger the download
//         const url = window.URL.createObjectURL(new Blob([response.data]));
//         const a = document.createElement('a');
//         a.href = url;
//         a.download = `payslip_${employeeId}.pdf`; // Customize file name as needed
//         document.body.appendChild(a);
//         a.click();
//         a.remove();
//         window.URL.revokeObjectURL(url);

//         return true; // Indicate success

//     } catch (error) {
//         console.error('Download error:', error);
//         throw error; // Rethrow error for handling in the calling function
//     }
// };


// export const EmployeePayslipDeleteById = (employeeId, payslipId) => {
//     const company = localStorage.getItem("comapnyName")
//     return axiosInstance.delete(`/${company}/employee/${employeeId}/payslip/${payslipId}`);
// }

// export const AttendanceManagementApi = (formData) => {
//     const company = localStorage.getItem("companyName")
//     return axiosInstance.post(`/${company}/employee/attendance`, formData);
// }

// export const AttendanceReportApi = (employeeId, month, year) => {

//     const companyName = localStorage.getItem("companyName")
//     return axiosInstance.get(`/${companyName}/attendance`, {
//         params: { employeeId, month, year }
//     });
// }

// export const AttendancePatchById = (employeeId, attendanceId, data) => {
//     const company = localStorage.getItem("companyName")
//     return axiosInstance.patch(`/${company}/employee/${employeeId}/attendance/${attendanceId}`, data);
// }

// export const AttendanceDeleteById = (employeeId, attendanceId) => {
//     const company = localStorage.getItem("company")
//     return axiosInstance.delete(`/${company}/employee/${employeeId}/attendance/${attendanceId}`);
// }
// export const CompanyImagePatchApi = (companyId, formData) => {
//     return axiosInstance.patch(`/company/image/${companyId}`, formData);
// }

// export const CompanyImageGetApi = (companyId) => {
//     return axiosInstance.get(`/company/${companyId}/image`);
// }

// export const AllowancesGetApi = () => {
//     return axiosInstance.get(`/allowances`);
// }

// export const DeductionsGetApi = () => {
//     return axiosInstance.get(`/deductions`);
// }

// export const CompanySalaryStructurePostApi = (data) => {
//     return axiosInstance.post(`/salary/Structure`, data);
// };

// export const CompanySalaryStructureGetApi = () => {
//     const company = localStorage.getItem("companyName")
//     return axiosInstance.get(`${company}/salary`);
// }

// export const OfferLetterDownload = async (payload) => {
//     try {
//         const response = await axiosInstance.post(`/upload/offerletter`, payload, {
//             responseType: 'blob',
//             headers: {
//                 'Accept': 'application/pdf',
//             }
//         });
//         const url = window.URL.createObjectURL(new Blob([response.data]));
//         const a = document.createElement('a');
//         a.href = url;
//         a.download = `offerLettre.pdf`;
//         document.body.appendChild(a);
//         a.click();
//         a.remove();
//         window.URL.revokeObjectURL(url);

//         return true;

//     } catch (error) {
//         console.error('Download error:', error);
//         throw error;
//     }
// };

// export const PayslipTemplate = (data) => {
//     return axiosInstance.post(`/template`, data);
// };

// export const PayslipTemplateGetApi = (data) => {
//     const companyName = localStorage.getItem("companyName")
//     return axiosInstance.get(`/${companyName}/template`, data);
// };
