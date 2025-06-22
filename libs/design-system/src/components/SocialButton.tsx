import React from 'react';
import { Button, ButtonProps } from '@mui/material';

export interface SocialButtonProps extends Omit<ButtonProps, 'variant'> {
  provider: 'google' | 'github' | 'microsoft';
  children: React.ReactNode;
}

export const SocialButton: React.FC<SocialButtonProps> = ({
  provider,
  children,
  sx,
  ...buttonProps
}) => {
  const getSocialButtonStyles = () => {
    const baseStyles = {
      borderColor: 'grey.300',
      color: 'grey.700',
      '&:hover': {
        backgroundColor: 'grey.50',
        borderColor: 'grey.300',
      },
    };

    switch (provider) {
      case 'google':
        return baseStyles;
      case 'github':
        return {
          ...baseStyles,
          '&:hover': {
            backgroundColor: 'grey.900',
            borderColor: 'grey.900',
            color: 'white',
          },
        };
      case 'microsoft':
        return {
          ...baseStyles,
          '&:hover': {
            backgroundColor: '#0078d4',
            borderColor: '#0078d4',
            color: 'white',
          },
        };
      default:
        return baseStyles;
    }
  };

  return (
    <Button
      {...buttonProps}
      variant="outlined"
      fullWidth
      size="large"
      sx={{
        ...getSocialButtonStyles(),
        ...sx,
      }}
    >
      {children}
    </Button>
  );
};