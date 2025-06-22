import React from 'react';
import { Box, Container, Typography, Avatar } from '@mui/material';
import { Chat } from '@mui/icons-material';

export interface BrandSectionProps {
  gradient: string;
  icon?: React.ReactNode;
  title: string;
  subtitle: string;
  description: string;
  features?: Array<{
    icon: React.ReactNode;
    text: string;
  }>;
}

export const BrandSection: React.FC<BrandSectionProps> = ({
  gradient,
  icon,
  title,
  subtitle,
  description,
  features = [],
}) => {
  return (
    <Box
      sx={{
        flex: 1,
        background: gradient,
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        color: 'white',
        position: 'relative',
        overflow: 'hidden',
        padding: { xs: 4, md: 6 },
      }}
    >
      {/* Background decorative circles */}
      <Box
        sx={{
          position: 'absolute',
          top: '10%',
          left: '15%',
          width: 80,
          height: 80,
          borderRadius: '50%',
          background: 'rgba(255, 255, 255, 0.1)',
        }}
      />
      <Box
        sx={{
          position: 'absolute',
          top: '20%',
          right: '20%',
          width: 60,
          height: 60,
          borderRadius: '50%',
          background: 'rgba(255, 255, 255, 0.08)',
        }}
      />
      <Box
        sx={{
          position: 'absolute',
          bottom: '15%',
          left: '10%',
          width: 100,
          height: 100,
          borderRadius: '50%',
          background: 'rgba(255, 255, 255, 0.06)',
        }}
      />
      <Box
        sx={{
          position: 'absolute',
          bottom: '40%',
          right: '15%',
          width: 40,
          height: 40,
          borderRadius: '50%',
          background: 'rgba(255, 255, 255, 0.1)',
        }}
      />

      <Container maxWidth="sm" sx={{ textAlign: 'center', zIndex: 1 }}>
        {/* Logo */}
        <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', mb: 4 }}>
          <Avatar
            sx={{
              bgcolor: 'rgba(255, 255, 255, 0.2)',
              mr: 2,
              width: 48,
              height: 48,
            }}
          >
            {icon || <Chat sx={{ color: 'white', fontSize: 28 }} />}
          </Avatar>
          <Box>
            <Typography 
              variant="h4" 
              component="h1" 
              sx={{ 
                fontWeight: 700,
                mb: 0.5,
                fontSize: { xs: '20px', md: '24px' }
              }}
            >
              AICompare
            </Typography>
            <Typography 
              variant="body2" 
              sx={{ 
                opacity: 0.9,
                fontSize: '14px',
                fontWeight: 400
              }}
            >
              Intelligent Model Comparison
            </Typography>
          </Box>
        </Box>

        {/* Main Content */}
        {icon && (
          <Box sx={{ mb: 4 }}>
            <Avatar
              sx={{
                bgcolor: 'rgba(255, 255, 255, 0.2)',
                width: 80,
                height: 80,
                mx: 'auto',
              }}
            >
              {React.cloneElement(icon as React.ReactElement, { 
                sx: { color: 'white', fontSize: 40 } 
              })}
            </Avatar>
          </Box>
        )}

        {/* Main Headline */}
        <Typography
          variant="h2"
          component="h1"
          sx={{
            fontWeight: 700,
            mb: 3,
            fontSize: { xs: '28px', md: '36px' },
            lineHeight: { xs: '32px', md: '45px' },
            letterSpacing: '-0.025em',
          }}
        >
          {title}
          <br />
          {subtitle}
        </Typography>

        {/* Description */}
        <Typography
          variant="subtitle1"
          sx={{
            mb: 4,
            opacity: 0.9,
            fontSize: { xs: '16px', md: '18px' },
            lineHeight: { xs: '24px', md: '28px' },
            fontWeight: 400,
            maxWidth: '400px',
            mx: 'auto',
          }}
        >
          {description}
        </Typography>

        {/* Features */}
        {features.length > 0 && (
          <Box sx={{ 
            display: 'flex', 
            justifyContent: 'center', 
            gap: 4,
            flexDirection: features.length > 2 ? 'column' : 'row'
          }}>
            {features.map((feature, index) => (
              <Box 
                key={index}
                sx={{ 
                  display: 'flex', 
                  alignItems: 'center', 
                  gap: features.length > 2 ? 2 : 1,
                  justifyContent: features.length > 2 ? 'center' : 'flex-start'
                }}
              >
                {React.cloneElement(feature.icon as React.ReactElement, { 
                  sx: { fontSize: 20 } 
                })}
                <Typography variant="body2">{feature.text}</Typography>
              </Box>
            ))}
          </Box>
        )}
      </Container>
    </Box>
  );
};