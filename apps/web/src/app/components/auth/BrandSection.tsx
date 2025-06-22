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
            <Typography variant="h5" component="div" sx={{ fontWeight: 700, mb: 0.5 }}>
              {title}
            </Typography>
            <Typography variant="body2" sx={{ opacity: 0.9 }}>
              {subtitle}
            </Typography>
          </Box>
        </Box>

        {/* Headline */}
        <Typography
          variant="h2"
          component="h2"
          sx={{
            fontWeight: 700,
            mb: 3,
            fontSize: { xs: '28px', md: '36px' },
            lineHeight: { xs: '32px', md: '45px' },
            letterSpacing: '-0.025em',
          }}
        >
          {description}
        </Typography>

        {/* Features */}
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'center',
            gap: 4,
            flexDirection: { xs: 'column', md: 'row' },
          }}
        >
          {features.map((feature, index) => (
            <Box
              key={index}
              sx={{
                display: 'flex',
                alignItems: 'center',
                gap: 1,
                justifyContent: { xs: 'center', md: 'flex-start' },
              }}
            >
              {feature.icon}
              <Typography variant="body2">{feature.text}</Typography>
            </Box>
          ))}
        </Box>
      </Container>
    </Box>
  );
};
