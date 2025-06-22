import React from 'react';
import {
  Box,
  Container,
  Card,
  CardContent,
  Typography,
  TextField,
  Button,
  Link,
  Avatar,
} from '@mui/material';
import {
  Email,
  LockReset,
  ArrowBack,
  Security,
  MarkEmailRead,
} from '@mui/icons-material';
import { designTokens } from '@model-comparator/design-system';

export interface ForgotPasswordPresenterProps {
  email: string;
  onEmailChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  onSendRecoveryEmail: () => void;
  onBackToSignIn: () => void;
  onCreateAccount: () => void;
}

export const ForgotPasswordPresenter: React.FC<ForgotPasswordPresenterProps> = ({
  email,
  onEmailChange,
  onSendRecoveryEmail,
  onBackToSignIn,
  onCreateAccount,
}) => {
  return (
    <Box sx={{ height: '100vh', display: 'flex' }}>
      {/* Left Side - Brand Section */}
      <Box
        sx={{
          flex: 1,
          background: designTokens.gradients.warning,
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
              <LockReset sx={{ color: 'white', fontSize: 28 }} />
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

          {/* Email Icon */}
          <Box sx={{ mb: 4 }}>
            <Avatar
              sx={{
                bgcolor: 'rgba(255, 255, 255, 0.2)',
                width: 80,
                height: 80,
                mx: 'auto',
              }}
            >
              <Email sx={{ color: 'white', fontSize: 40 }} />
            </Avatar>
          </Box>

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
            We've Got
            <br />
            You Covered
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
            Don't worry! Password recovery is simple and secure. We'll help you get back to comparing AI models in no time.
          </Typography>

          {/* Feature Icons */}
          <Box sx={{ display: 'flex', justifyContent: 'center', gap: 4, flexDirection: 'column' }}>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, justifyContent: 'center' }}>
              <Security sx={{ fontSize: 20 }} />
              <Typography variant="body2">Secure recovery process</Typography>
            </Box>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, justifyContent: 'center' }}>
              <MarkEmailRead sx={{ fontSize: 20 }} />
              <Typography variant="body2">Check your email inbox</Typography>
            </Box>
          </Box>
        </Container>
      </Box>

      {/* Right Side - Forgot Password Form */}
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
        <Container maxWidth="sm">
          <Card
            sx={{
              maxWidth: 448,
              mx: 'auto',
              padding: 0,
            }}
          >
            <CardContent sx={{ padding: { xs: 3, md: 4 } }}>
              {/* Form Header */}
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
                Forgot your password?
              </Typography>
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
                Enter your email address and we'll send you a recovery link
              </Typography>

              {/* Email Field */}
              <Typography 
                variant="subtitle2" 
                color="text.primary" 
                sx={{ 
                  mb: 1,
                  fontWeight: 500,
                  fontSize: '14px'
                }}
              >
                Email address*
              </Typography>
              <TextField
                fullWidth
                placeholder="demo@aicompare.com"
                variant="outlined"
                value={email}
                onChange={onEmailChange}
                sx={{ mb: 3 }}
                slotProps={{
                  input: {
                    startAdornment: (
                      <Box sx={{ mr: 1, display: 'flex', alignItems: 'center' }}>
                        <Email sx={{ color: 'grey.400', fontSize: 20 }} />
                      </Box>
                    ),
                  },
                }}
              />

              {/* Send Recovery Email Button */}
              <Button
                fullWidth
                variant="contained"
                size="large"
                onClick={onSendRecoveryEmail}
                sx={{ 
                  mb: 3,
                  background: designTokens.gradients.warning,
                  '&:hover': {
                    background: designTokens.gradients.warningHover,
                  },
                }}
              >
                Send recovery email
              </Button>

              {/* Back to Sign In Link */}
              <Box sx={{ textAlign: 'center', mb: 3 }}>
                <Link
                  component="button"
                  variant="body2"
                  onClick={onBackToSignIn}
                  sx={{ 
                    color: 'text.secondary', 
                    textDecoration: 'none',
                    border: 'none',
                    background: 'none',
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: 1,
                  }}
                >
                  <ArrowBack sx={{ fontSize: 16 }} />
                  Back to sign in
                </Link>
              </Box>

              {/* Create Account Link */}
              <Typography variant="body2" sx={{ textAlign: 'center' }}>
                Don't have an account?{' '}
                <Link
                  component="button"
                  onClick={onCreateAccount}
                  sx={{ 
                    color: 'warning.main', 
                    textDecoration: 'none', 
                    fontWeight: 600,
                    border: 'none',
                    background: 'none',
                    cursor: 'pointer',
                  }}
                >
                  Create account
                </Link>
              </Typography>
            </CardContent>
          </Card>
        </Container>
      </Box>
    </Box>
  );
};