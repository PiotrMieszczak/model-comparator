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
  Divider,
  InputAdornment,
  IconButton,
  Avatar,
} from '@mui/material';
import {
  Visibility,
  VisibilityOff,
  Google,
  Analytics,
  Speed,
  Chat,
} from '@mui/icons-material';

export interface LoginPresenterProps {
  email: string;
  password: string;
  showPassword: boolean;
  onEmailChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  onPasswordChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  onTogglePasswordVisibility: () => void;
  onMouseDownPassword: (event: React.MouseEvent<HTMLButtonElement>) => void;
  onSignIn: () => void;
  onGoogleSignIn: () => void;
  onForgotPassword: () => void;
  onCreateAccount: () => void;
}

export const LoginPresenter: React.FC<LoginPresenterProps> = ({
  email,
  password,
  showPassword,
  onEmailChange,
  onPasswordChange,
  onTogglePasswordVisibility,
  onMouseDownPassword,
  onSignIn,
  onGoogleSignIn,
  onForgotPassword,
  onCreateAccount,
}) => {
  return (
    <Box sx={{ height: '100vh', display: 'flex' }}>
      {/* Left Side - Brand Section */}
      <Box
        sx={{
          flex: 1,
          background: 'linear-gradient(135deg, #006FEE 0%, #004493 100%)',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
          color: 'white',
          position: 'relative',
          overflow: 'hidden',
          padding: { xs: 4, md: 6 }, // 32px mobile, 48px desktop
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
              <Chat sx={{ color: 'white', fontSize: 28 }} />
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
            Compare AI Models
            <br />
            Side by Side
          </Typography>

          {/* Description */}
          <Typography
            variant="subtitle1"
            sx={{
              mb: 4,
              opacity: 0.9,
              fontSize: { xs: '18px', md: '20px' },
              lineHeight: { xs: '28px', md: '32px' },
              fontWeight: 400,
              maxWidth: '500px',
              mx: 'auto',
            }}
          >
            Test multiple AI models simultaneously and analyze their responses, token usage, and costs in real-time.
          </Typography>

          {/* Feature Icons */}
          <Box sx={{ display: 'flex', justifyContent: 'center', gap: 4 }}>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
              <Analytics sx={{ fontSize: 20 }} />
              <Typography variant="body2">Smart Analysis</Typography>
            </Box>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
              <Speed sx={{ fontSize: 20 }} />
              <Typography variant="body2">Real-time Comparison</Typography>
            </Box>
          </Box>
        </Container>
      </Box>

      {/* Right Side - Login Form */}
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
              maxWidth: 448, // Design system spec
              mx: 'auto',
              padding: 0, // Remove default card padding
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
                Welcome back
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
                Sign in to your account to continue
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
                Email address
              </Typography>
              <TextField
                fullWidth
                placeholder="demo@aicompare.com"
                variant="outlined"
                value={email}
                onChange={onEmailChange}
                sx={{ mb: 2 }}
              />

              {/* Password Field */}
              <Typography 
                variant="subtitle2" 
                color="text.primary" 
                sx={{ 
                  mb: 1,
                  fontWeight: 500,
                  fontSize: '14px'
                }}
              >
                Password
              </Typography>
              <TextField
                fullWidth
                type={showPassword ? 'text' : 'password'}
                placeholder="••••••••"
                variant="outlined"
                value={password}
                onChange={onPasswordChange}
                sx={{ mb: 1 }}
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton
                        aria-label="toggle password visibility"
                        onClick={onTogglePasswordVisibility}
                        onMouseDown={onMouseDownPassword}
                        edge="end"
                      >
                        {showPassword ? <VisibilityOff /> : <Visibility />}
                      </IconButton>
                    </InputAdornment>
                  ),
                }}
              />

              {/* Forgot Password Link */}
              <Box sx={{ textAlign: 'right', mb: 3 }}>
                <Link
                  component="button"
                  variant="body2"
                  onClick={onForgotPassword}
                  sx={{ 
                    color: 'primary.main', 
                    textDecoration: 'none',
                    border: 'none',
                    background: 'none',
                    cursor: 'pointer',
                  }}
                >
                  Forgot password?
                </Link>
              </Box>

              {/* Sign In Button */}
              <Button
                fullWidth
                variant="contained"
                size="large"
                onClick={onSignIn}
                sx={{ mb: 2 }}
              >
                Sign in
              </Button>

              {/* Divider */}
              <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                <Divider sx={{ flex: 1 }} />
                <Typography
                  variant="body2"
                  color="text.secondary"
                  sx={{ px: 2 }}
                >
                  or
                </Typography>
                <Divider sx={{ flex: 1 }} />
              </Box>

              {/* Google Sign In */}
              <Button
                fullWidth
                variant="outlined"
                size="large"
                startIcon={<Google />}
                onClick={onGoogleSignIn}
                sx={{
                  mb: 3,
                  borderColor: 'grey.300',
                  color: 'grey.700',
                  '&:hover': {
                    backgroundColor: 'grey.50',
                    borderColor: 'grey.300',
                  },
                }}
              >
                Continue with Google
              </Button>

              {/* Sign Up Link */}
              <Typography variant="body2" sx={{ textAlign: 'center' }}>
                Don't have an account?{' '}
                <Link
                  component="button"
                  onClick={onCreateAccount}
                  sx={{ 
                    color: 'primary.main', 
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

              {/* Terms and Privacy */}
              <Typography
                variant="caption"
                color="text.secondary"
                sx={{ textAlign: 'center', mt: 3, display: 'block' }}
              >
                By continuing, you agree to our{' '}
                <Link href="#" sx={{ color: 'primary.main' }}>
                  Terms of Service
                </Link>{' '}
                and{' '}
                <Link href="#" sx={{ color: 'primary.main' }}>
                  Privacy Policy
                </Link>
              </Typography>
            </CardContent>
          </Card>
        </Container>
      </Box>
    </Box>
  );
};