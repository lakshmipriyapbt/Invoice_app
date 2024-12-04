import { configureStore } from '@reduxjs/toolkit';
import customerReducer from './CustomerSlice';
import productsReducer from './ProductSlice';
import invoiceReducer from './InvoiceSlice';
import userReducer from './userSlice';
import companyReducer from './companySlice'
// Configure the store with both reducers
export const store = configureStore({
  reducer: {
    customers: customerReducer,  // Reducer to handle the customers state
    products: productsReducer,   // Reducer to handle the products state
    invoices: invoiceReducer,    // Reducer to handle the invoice state
    users : userReducer,      //  reducer to handle the users state
    companies: companyReducer,   // reducer to handle the companies state
  },
});
// Selectors for products
export const selectProducts = (state) => state.products.products;
export const selectProductsLoading = (state) => state.products.loading;
export const selectProductsError = (state) => state.products.error;
// Selectors for customers (assuming you have selectors for customers)
export const selectCustomers = (state) => state.customers.customers;
export const selectCustomersLoading = (state) => state.customers.loading;
export const selectCustomersError = (state) => state.customers.error;
// Selectors for invoices
export const selectInvoices = (state) => state.invoices.invoices;
export const selectInvoicesLoading = (state) => state.invoices.loading;
export const selectInvoicesError = (state) => state.invoices.error;
// User Selectors
export const selectUsers = (state) => state.users.users;
export const selectUsersLoading = (state) => state.users.loading;
export const selectUsersError = (state) => state.users.error;
// Company Selectors
export const selectCompanies = (state) => state.companies.companies;
export const selectCompaniesLoading = (state) => state.companies.loading;
export const selectCompaniesError = (state) => state.companies.error;
export default store;