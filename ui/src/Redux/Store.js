import { configureStore } from '@reduxjs/toolkit';
import customerReducer from './CustomerSlice';
import productsReducer from './ProductSlice';
import invoiceReducer from "./InvoiceSlice"
// Configure the store with both reducers
export const store = configureStore({
  reducer: {
    customers: customerReducer,  // Reducer to handle the customers state
    products: productsReducer,   // Reducer to handle the products state
    invoices: invoiceReducer,    // Reducer to handle the invoice state
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
export default store;