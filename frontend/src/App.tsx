
import './App.css'
import './styles/global.scss'
import Dashboard from './pages/dashboard' ;
import { AuthProvider } from './pages/authentication/authContext';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import ProtectedRoute from './protectedRoute';
import Login from './pages/authentication/login';
import Layout from './pages/layout/layout';
import Settings from './pages/settings';
import { ToastProvider } from './components/toaster/ToastContext';

function App() {
  return (
    // <AuthProvider>
    //   <BrowserRouter>
    //     <Routes>
    //       <Route path="/" element={<Login />} />
    //       <Route
    //         path="/dashboard"
    //         element={
    //           <ProtectedRoute>
    //             <Dashboard />
    //           </ProtectedRoute>
    //         }
    //       />
    //     </Routes>
    //   </BrowserRouter>
    // </AuthProvider>
    <ToastProvider>
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Login />} />

          {/* Protected layout for logged-in routes */}
          <Route element={<ProtectedRoute><Layout /></ProtectedRoute>}>
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/settings" element={<Settings />} />
            {/* Add more child routes here */}
          </Route>
        </Routes>
      </BrowserRouter>
    </AuthProvider>
    </ToastProvider>
  )
}

export default App
