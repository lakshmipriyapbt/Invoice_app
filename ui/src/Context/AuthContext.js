import React, { createContext, useContext, useEffect, useState } from 'react';
import { jwtDecode } from 'jwt-decode';
import { companyViewByIdApi, UserGetApiById } from '../Axios';

// Create a context for authentication
const AuthContext = createContext();

// AuthProvider component
export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState({
    userId: null,
    userRole: null,
    company: null,
    companyId: null, // Make sure to initialize companyId
  });
  const [logoFileName, setLogoFileName] = useState(null);
  const [loading, setLoading] = useState(true); // Start with loading true
  const [error, setError] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      try {
        const decodedToken = jwtDecode(token);
        console.log('Decoded Token:', decodedToken);
        setUser({
          userId: decodedToken.sub,
          userRole: decodedToken.roles,
          company: decodedToken.company,
          userId: decodedToken.userId,
          companyId: decodedToken.sub,
        });
      } catch (error) {
        setError('Failed to decode token');
        setUser({}); // Reset user state if decoding fails
        localStorage.removeItem('token');
      }
    } else {
      setLoading(false); // If no token, stop loading
    }
  }, []);

  useEffect(() => {
    if (!user.userId) return; // Do not fetch data if user is not set

    const fetchData = async () => {
      setLoading(true);
      setError(null); // Reset error before fetching data

      try {
        const response = await UserGetApiById(user.userId);
        const companyId = response.data.companyId;
        setUser(prevUser => ({ ...prevUser, companyId }));
        await fetchCompanyData(companyId);
      } catch (error) {
        setError('Failed to fetch user data');
      } finally {
        setLoading(false);
      }
    };

    const fetchCompanyData = async (companyId) => {
      try {
        const logoResponse = await companyViewByIdApi(companyId);
        const companyData = logoResponse?.data;
        if (companyData) {
          setLogoFileName(companyData.imageFile);
        } else {
          setError('Logo not found');
        }
      } catch (err) {
        setError('Error fetching logo');
      }
    };

    fetchData();
  }, [user.userId]);

  return (
    <AuthContext.Provider value={{ user, setUser, logoFileName, setLogoFileName, loading, error }}>
      {children}
    </AuthContext.Provider>
  );
};

// Custom hook to use the AuthContext
export const useAuth = () => useContext(AuthContext);
