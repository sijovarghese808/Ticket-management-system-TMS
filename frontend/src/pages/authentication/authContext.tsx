// src/AuthContext.tsx
import { createContext, useContext, useState } from 'react';
import { login, createProfile } from '../../service/api'; // Import the login API

const AuthContext = createContext<any>(null);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const loginUser = async (username: string, password: string) => {
    try {
      const response = await login(username, password);  // Call the actual login API
      if (response.data && response.data.token) {
        setIsAuthenticated(true);
        // Optionally, store the token in localStorage or context
        localStorage.setItem('authToken', response.data.token);
        return response;  // Return the response for handling success
      } else {
        throw new Error('Invalid credentials');
      }
    } catch (err) {
      console.error('Login failed', err);
      return null;
    }
  };
   const createUser = async (name : string, username: string, password: string, confirmPassword : string) => {
    try {
      const response = await createProfile(name, username, password, confirmPassword);  // Call the actual login API
      if (response.data) {
        return response;  // Return the response for handling success
      } else {
        throw new Error('Invalid data');
      }
    } catch (err) {
      console.error('Login failed', err);
      return null;
    }
  };

  const logout = () => {
    setIsAuthenticated(false);
    localStorage.removeItem('authToken'); // Remove the token on logout
  };



  return (
    <AuthContext.Provider value={{ isAuthenticated, loginUser, logout, createUser }}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => useContext(AuthContext);



// // src/AuthContext.tsx
// import { createContext, useContext, useState } from 'react';

// const AuthContext = createContext<any>(null);

// export function AuthProvider({ children }: { children: React.ReactNode }) {
//   const [isAuthenticated, setIsAuthenticated] = useState(false);

//   const login = (username: string, password: string) => {
//     // TODO: call API for real login
//     if (username === 'admin' && password === 'password') {
//       setIsAuthenticated(true);
//       return true;
//     }
//     return false;
//   };

//   const logout = () => setIsAuthenticated(false);

//   return (
//     <AuthContext.Provider value={{ isAuthenticated, login, logout }}>
//       {children}
//     </AuthContext.Provider>
//   );
// }

// export const useAuth = () => useContext(AuthContext);
