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
  Checkbox,
  FormControlLabel,
} from '@mui/material';
import {
  Visibility,
  VisibilityOff,
  Google,
  PersonAdd,
  Security,
  Analytics,
  Email,
} from '@mui/icons-material';
import { designTokens } from '@model-comparator/design-system';

export interface SignUpPresenterProps {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  confirmPassword: string;
  showPassword: boolean;
  showConfirmPassword: boolean;
  agreeToTerms: boolean;
  onFirstNameChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  onLastNameChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  onEmailChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  onPasswordChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  onConfirmPasswordChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  onTogglePasswordVisibility: () => void;
  onToggleConfirmPasswordVisibility: () => void;
  onMouseDownPassword: (event: React.MouseEvent<HTMLButtonElement>) => void;
  onAgreeToTermsChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  onCreateAccount: () => void;
  onGoogleSignUp: () => void;
  onSignIn: () => void;
}

export const SignUpPresenter: React.FC<SignUpPresenterProps> = ({
  firstName,
  lastName,
  email,
  password,
  confirmPassword,
  showPassword,
  showConfirmPassword,
  agreeToTerms,
  onFirstNameChange,
  onLastNameChange,
  onEmailChange,
  onPasswordChange,
  onConfirmPasswordChange,
  onTogglePasswordVisibility,
  onToggleConfirmPasswordVisibility,
  onMouseDownPassword,
  onAgreeToTermsChange,
  onCreateAccount,
  onGoogleSignUp,
  onSignIn,
}) => {
  return (
    <Box sx={{ height: '100vh', display: 'flex' }}>
      {/* Left Side - Brand Section */}
      <Box
        sx={{
          flex: 1,
          background: designTokens.gradients.success,
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
              <PersonAdd sx={{ color: 'white', fontSize: 28 }} />
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
            Join the Future
            <br />
            of AI Testing
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
            Create your account and start comparing AI models with advanced analytics, cost tracking, and performance insights.
          </Typography>

          {/* Feature Icons */}
          <Box sx={{ display: 'flex', justifyContent: 'center', gap: 4, flexDirection: 'column' }}>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, justifyContent: 'center' }}>
              <Security sx={{ fontSize: 20 }} />
              <Typography variant="body2">Secure & Private</Typography>
            </Box>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, justifyContent: 'center' }}>
              <Analytics sx={{ fontSize: 20 }} />
              <Typography variant="body2">Advanced Analytics</Typography>
            </Box>
          </Box>
        </Container>
      </Box>

      {/* Right Side - Sign Up Form */}
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
                Create your account
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
                Start comparing AI models with advanced analytics
              </Typography>

              {/* Google Sign Up */}
              <Button
                fullWidth
                variant="outlined"
                size="large"
                startIcon={<Google />}
                onClick={onGoogleSignUp}
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

              {/* Divider */}
              <Box sx={{ display: 'flex', alignItems: 'center', mb: 3 }}>
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

              {/* First Name Field */}
              <Typography 
                variant="subtitle2" 
                color="text.primary" 
                sx={{ 
                  mb: 1,
                  fontWeight: 500,
                  fontSize: '14px'
                }}
              >
                First name *
              </Typography>
              <TextField
                fullWidth
                placeholder="John"
                variant="outlined"
                value={firstName}
                onChange={onFirstNameChange}
                sx={{ mb: 2 }}
              />

              {/* Last Name Field */}
              <Typography 
                variant="subtitle2" 
                color="text.primary" 
                sx={{ 
                  mb: 1,
                  fontWeight: 500,
                  fontSize: '14px'
                }}
              >
                Last name *
              </Typography>
              <TextField
                fullWidth
                placeholder="Doe"
                variant="outlined"
                value={lastName}
                onChange={onLastNameChange}
                sx={{ mb: 2 }}
              />

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
                Email address *
              </Typography>
              <TextField
                fullWidth
                placeholder="john.doe@example.com"
                variant="outlined"
                value={email}
                onChange={onEmailChange}
                sx={{ mb: 2 }}
                slotProps={{
                  input: {
                    endAdornment: (
                      <InputAdornment position="end">
                        <Email sx={{ color: 'grey.400', fontSize: 20 }} />
                      </InputAdornment>
                    ),
                  },
                }}
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
                Password *
              </Typography>
              <TextField
                fullWidth
                type={showPassword ? 'text' : 'password'}
                placeholder="••••••••"
                variant="outlined"
                value={password}
                onChange={onPasswordChange}
                sx={{ mb: 2 }}
                slotProps={{
                  input: {
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
                  },
                }}
              />

              {/* Confirm Password Field */}
              <Typography 
                variant="subtitle2" 
                color="text.primary" 
                sx={{ 
                  mb: 1,
                  fontWeight: 500,
                  fontSize: '14px'
                }}
              >
                Confirm password *
              </Typography>
              <TextField
                fullWidth
                type={showConfirmPassword ? 'text' : 'password'}
                placeholder="••••••••"
                variant="outlined"
                value={confirmPassword}
                onChange={onConfirmPasswordChange}
                sx={{ mb: 3 }}
                slotProps={{
                  input: {
                    endAdornment: (
                      <InputAdornment position="end">
                        <IconButton
                          aria-label="toggle confirm password visibility"
                          onClick={onToggleConfirmPasswordVisibility}
                          onMouseDown={onMouseDownPassword}
                          edge="end"
                        >
                          {showConfirmPassword ? <VisibilityOff /> : <Visibility />}
                        </IconButton>
                      </InputAdornment>
                    ),
                  },
                }}
              />

              {/* Terms and Conditions */}
              <FormControlLabel
                control={
                  <Checkbox
                    checked={agreeToTerms}
                    onChange={onAgreeToTermsChange}
                    sx={{ color: 'success.main' }}
                  />
                }
                label={
                  <Typography variant="body2" sx={{ fontSize: '14px' }}>
                    I agree to the{' '}
                    <Link href="#" sx={{ color: 'success.main' }}>
                      Terms of Service
                    </Link>{' '}
                    and{' '}
                    <Link href="#" sx={{ color: 'success.main' }}>
                      Privacy Policy
                    </Link>
                  </Typography>
                }
                sx={{ mb: 3, alignItems: 'flex-start' }}
              />

              {/* Create Account Button */}
              <Button
                fullWidth
                variant="contained"
                size="large"
                onClick={onCreateAccount}
                sx={{ 
                  mb: 3,
                  background: designTokens.gradients.success,
                  '&:hover': {
                    background: designTokens.gradients.successHover,
                  },
                }}
              >
                Create account
              </Button>

              {/* Sign In Link */}
              <Typography variant="body2" sx={{ textAlign: 'center', mb: 3 }}>
                Already have an account?{' '}
                <Link
                  component="button"
                  onClick={onSignIn}
                  sx={{ 
                    color: 'success.main', 
                    textDecoration: 'none', 
                    fontWeight: 600,
                    border: 'none',
                    background: 'none',
                    cursor: 'pointer',
                  }}
                >
                  Sign in
                </Link>
              </Typography>

              {/* Terms and Privacy Footer */}
              <Typography
                variant="caption"
                color="text.secondary"
                sx={{ textAlign: 'center', display: 'block', fontSize: '12px' }}
              >
                By creating an account, you'll get access to advanced AI model comparison tools and detailed analytics.
              </Typography>
            </CardContent>
          </Card>
        </Container>
      </Box>
    </Box>
  );
};