import React from 'react';
import { LoginPresenter, LoginPresenterProps } from '../components/LoginPresenter';
import { useLogin } from '../hooks/useLogin';

export const LoginContainer: React.FC = () => {
  const {
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
  } = useLogin();

  const presenterProps: LoginPresenterProps = {
    email,
    password,
    showPassword,
    onEmailChange: handleEmailChange,
    onPasswordChange: handlePasswordChange,
    onTogglePasswordVisibility: handleTogglePasswordVisibility,
    onMouseDownPassword: handleMouseDownPassword,
    onSignIn: handleSignIn,
    onGoogleSignIn: handleGoogleSignIn,
    onForgotPassword: handleForgotPassword,
    onCreateAccount: handleCreateAccount,
  };

  return <LoginPresenter {...presenterProps} />;
};