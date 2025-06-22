import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { SignUpPresenter } from './SignUpPresenter';

export const SignUpController: React.FC = () => {
  const navigate = useNavigate();
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [agreeToTerms, setAgreeToTerms] = useState(false);

  const handleFirstNameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setFirstName(event.target.value);
  };

  const handleLastNameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setLastName(event.target.value);
  };

  const handleEmailChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(event.target.value);
  };

  const handlePasswordChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(event.target.value);
  };

  const handleConfirmPasswordChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setConfirmPassword(event.target.value);
  };

  const handleTogglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const handleToggleConfirmPasswordVisibility = () => {
    setShowConfirmPassword(!showConfirmPassword);
  };

  const handleMouseDownPassword = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
  };

  const handleAgreeToTermsChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setAgreeToTerms(event.target.checked);
  };

  const handleCreateAccount = () => {
    // TODO: Implement create account logic
    console.log('Create account:', { firstName, lastName, email, password, confirmPassword, agreeToTerms });
  };

  const handleGoogleSignUp = () => {
    // TODO: Implement Google sign up logic
    console.log('Sign up with Google');
  };

  const handleSignIn = () => {
    navigate('/login');
  };

  return (
    <SignUpPresenter
      firstName={firstName}
      lastName={lastName}
      email={email}
      password={password}
      confirmPassword={confirmPassword}
      showPassword={showPassword}
      showConfirmPassword={showConfirmPassword}
      agreeToTerms={agreeToTerms}
      onFirstNameChange={handleFirstNameChange}
      onLastNameChange={handleLastNameChange}
      onEmailChange={handleEmailChange}
      onPasswordChange={handlePasswordChange}
      onConfirmPasswordChange={handleConfirmPasswordChange}
      onTogglePasswordVisibility={handleTogglePasswordVisibility}
      onToggleConfirmPasswordVisibility={handleToggleConfirmPasswordVisibility}
      onMouseDownPassword={handleMouseDownPassword}
      onAgreeToTermsChange={handleAgreeToTermsChange}
      onCreateAccount={handleCreateAccount}
      onGoogleSignUp={handleGoogleSignUp}
      onSignIn={handleSignIn}
    />
  );
};