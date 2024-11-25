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
export const ValidateOtp = (data) => {
    return axiosInstance.post(`${Login_URL}/validate/CompanyOtp`, data);
}
export const forgotPasswordStep1 = (data) => {
    return axios.post(`${Login_URL}/forgot/password`, data);
}
export const forgotPasswordStep2 = (data) => {
    return axios.post(`${Login_URL}/update/password`, data);
}
export const resetPassword = (data, employeeId) => {
    return axiosInstance.patch(`/company/employee/${employeeId}/password`, data);
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
    axiosInstance.patch(`/company/${companyId}`, data);
};
export const companyPasswordUpdateById = async (companyId) => {
    axiosInstance.patch(`/company/password/${companyId}`);
}
export const InvoiceGetApi = () => {
    return axiosInstance.get(`/invoice/all`);
}
export const InvoicePostApi = (x) => {
    return axiosInstance.post('/invoice', x);
}
export const InvoiceGetApiById = (invoiceId) => {
    const company = localStorage.getItem("companyName")
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
    const company = localStorage.getItem("companyName")
    return axiosInstance.patch(`/invoice/${invoiceId}`, data)
};
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
export const ProductDeleteApiById = (productId) => {
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

export const InvoiceGenerateApi = (invoiceId, data) => {
    return axiosInstance.get(`/invoice/${invoiceId}/generate`, data)
   }


