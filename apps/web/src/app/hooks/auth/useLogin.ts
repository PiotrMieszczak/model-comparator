import { useState } from 'react';

export interface LoginState {
  email: string;
  password: string;
  showPassword: boolean;
}

export interface LoginActions {
  handleEmailChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  handlePasswordChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  handleTogglePasswordVisibility: () => void;
  handleMouseDownPassword: (event: React.MouseEvent<HTMLButtonElement>) => void;
  handleSignIn: () => void;
  handleGoogleSignIn: () => void;
  handleForgotPassword: () => void;
  handleCreateAccount: () => void;
}

export const useLogin = (): LoginState & LoginActions => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  const handleEmailChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(event.target.value);
  };

  const handlePasswordChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(event.target.value);
  };

  const handleTogglePasswordVisibility = () => {
    setShowPassword(prevShow => !prevShow);
  };

  const handleMouseDownPassword = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
  };

  const handleSignIn = () => {
    // TODO: Call domain auth service
    console.log('Sign in with:', { email, password });
  };

  const handleGoogleSignIn = () => {
    // TODO: Call domain OAuth service
    console.log('Google sign in');
  };

  const handleForgotPassword = () => {
    // TODO: Navigate to forgot password flow
    console.log('Forgot password');
  };

  const handleCreateAccount = () => {
    // TODO: Navigate to registration page
    console.log('Create account');
  };

  return {
    email,
    password,
    showPassword,
    handleEmailChange,
    handlePasswordChange,
    handleTogglePasswordVisibility,
    handleMouseDownPassword,
    handleSignIn,
    handleGoogleSignIn,
    handleForgotPassword,
    handleCreateAccount,
  };
};