import React, { createContext, useContext, useState, useEffect } from 'react';
import { getValidToken } from './tokenUtils';

const TokenContext = createContext();

export const TokenProvider = ({ children }) => {
  const [token, setToken] = useState(null);

  useEffect(() => {
    const fetchToken = async () => {
      try {
        const accessToken = await getValidToken();
        if (accessToken) {
          setToken(accessToken);
        } else {
          console.error('Access token not found');
        }
      } catch (error) {
        console.error('Error fetching access token:', error.message || error);
      }
    };

    fetchToken();
  }, []);

  return (
    <TokenContext.Provider value={token}>
      {children}
    </TokenContext.Provider>
  );
};

export const useToken = () => {
  const context = useContext(TokenContext);
  if (context === undefined) {
    throw new Error('useToken must be used within a TokenProvider');
  }
  return context;
};
