import React from 'react';
import { Route, Routes, Navigate } from 'react-router-dom';
import { LoginPage, DashboardPage } from './pages';
import { AuthGuard } from './guards';

export function App() {
  return (
    <Routes>
      {/* Public routes */}
      <Route path="/login" element={<LoginPage />} />
      
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
      <Route path="/" element={<Navigate to="/dashboard" replace />} />
      
      {/* Catch all - redirect to dashboard */}
      <Route path="*" element={<Navigate to="/dashboard" replace />} />
    </Routes>
  );
}

export default App;
