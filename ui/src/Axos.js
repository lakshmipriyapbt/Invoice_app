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
                // The request was made but no response was received
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
    return axiosInstance.post(`${Login_URL}/validate/otp`, data);
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
    return axiosInstance.post('/company/create', data, {
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
    const company = localStorage.getItem("companyName")
    return axiosInstance.get(`/invoice/all`);
}
export const InvoicePostApi = (x) => {
    return axiosInstance.post('/invoice/create', x, {
        headers: {
            'Content-Type': 'application/json',
        }
    });
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
export const ProductsGetApi = () => {
    const company = localStorage.getItem("companyName")
    return axiosInstance.get(`/product/all`)
        .then(response => {
            return response.data.data;
        })
        .catch(error => {
            console.error('Error fetching company by ID:', error);
            throw error;
        });
}
export const ProductPostApi = (data) => {
    return axiosInstance.post('/product/create', data, {
        headers: {
            'Content-Type': 'application/json',
        }
    });
}
export const ProductGetApiById = (productId) => {
    const company = localStorage.getItem("companyName")
    return axiosInstance.get(`/product/${productId}`)
        .then(response => {
            return response.data;
        })
        .catch(error => {
            console.error('Error fetching company by ID:', error);
            throw error;
        });
}
export const ProdcutDeleteApiById = (productId) => {
    const company = localStorage.getItem("companyName")
    return axiosInstance.delete(`/designation/${productId}`)
}
export const ProdcutPutApiById = (productId, data) => {
    const company = localStorage.getItem("companyName")
    return axiosInstance.patch(`/product/${productId}`, data)
};
export const CustomerGetApi = () => {
    return axiosInstance.get(`/customer/all`)
        .then(response => response.data.data) // Assuming response.data.data contains your employee data
        .catch(error => {
            console.error('Error fetching employee data:', error);
            return []; // Return empty array or handle error as needed
        });
}
export const CustomerPostApi = (data) => {
    const company = localStorage.getItem("companyName")
    return axiosInstance.post('/customer/create', data);
}
export const CustomerGetApiById = (customerId) => {
    const company = localStorage.getItem("companyName")
    return axiosInstance.get(`/employee/${customerId}`)
        .then(response => {
            return response.data;
        })
        .catch(error => {
            console.error('Error fetching company by ID:', error);
            throw error;
        });
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