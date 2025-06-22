import React from 'react';
import { Container, Card, CardContent, Typography } from '@mui/material';

export interface AuthCardProps {
  children: React.ReactNode;
  title: string;
  subtitle?: string;
}

export const AuthCard: React.FC<AuthCardProps> = ({
  children,
  title,
  subtitle,
}) => {
  return (
    <Container maxWidth="sm">
      <Card
        sx={{
          maxWidth: 448,
          mx: 'auto',
          padding: 0,
        }}
      >
        <CardContent sx={{ padding: { xs: 3, md: 4 } }}>
          <Typography
            variant="h1"
            component="h1"
            sx={{ 
              fontWeight: 700, 
              mb: 1, 
              textAlign: 'center',
              fontSize: '30px',
              lineHeight: '36px'
            }}
          >
            {title}
          </Typography>
          {subtitle && (
            <Typography
              variant="body1"
              color="text.secondary"
              sx={{ 
                mb: 3, 
                textAlign: 'center',
                fontSize: '16px',
                lineHeight: '24px'
              }}
            >
              {subtitle}
            </Typography>
          )}
          {children}
        </CardContent>
      </Card>
    </Container>
  );
};
