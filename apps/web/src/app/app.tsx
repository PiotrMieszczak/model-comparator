import React from 'react';
import { Route, Routes, Navigate } from 'react-router-dom';
import { LoginPage, ForgotPasswordPage, SignUpPage, DashboardPage } from './pages';
import { AuthGuard } from './guards';

export function App() {
  return (
    <Routes>
      {/* Public routes */}
      <Route path="/login" element={<LoginPage />} />
      <Route path="/signup" element={<SignUpPage />} />
      <Route path="/forgot-password" element={<ForgotPasswordPage />} />
      
      {/* Protected routes */}
      <Route 
        path="/dashboard" 
        element={
          <AuthGuard>
            <DashboardPage />
          </AuthGuard>
        } 
      />
      
      {/* Default redirect */}
      <Route path="/" element={<Navigate to="/login" replace />} />
      
      {/* Catch all - redirect to login */}
      <Route path="*" element={<Navigate to="/login" replace />} />
    </Routes>
  );
}

export default App;
