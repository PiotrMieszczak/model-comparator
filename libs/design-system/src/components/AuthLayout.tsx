import React from 'react';
import { Box } from '@mui/material';

export interface AuthLayoutProps {
  children: React.ReactNode;
  brandSection: React.ReactNode;
}

export const AuthLayout: React.FC<AuthLayoutProps> = ({
  children,
  brandSection,
}) => {
  return (
    <Box sx={{ height: '100vh', display: 'flex' }}>
      {/* Left Side - Brand Section */}
      {brandSection}

      {/* Right Side - Form Section */}
      <Box
        sx={{
          flex: 1,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          bgcolor: 'grey.50',
          padding: { xs: 2, md: 4 },
        }}
      >
        {children}
      </Box>
    </Box>
  );
};