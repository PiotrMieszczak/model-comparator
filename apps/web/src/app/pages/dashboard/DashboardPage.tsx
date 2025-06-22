import React from 'react';
import { Box, Typography, Container } from '@mui/material';

export const DashboardPage: React.FC = () => {
  return (
    <Container maxWidth="lg">
      <Box sx={{ py: 4 }}>
        <Typography variant="h4" component="h1" gutterBottom>
          Dashboard
        </Typography>
        <Typography variant="body1" color="text.secondary">
          Welcome to the AI Model Comparator dashboard. This page is protected by the AuthGuard.
        </Typography>
      </Box>
    </Container>
  );
};