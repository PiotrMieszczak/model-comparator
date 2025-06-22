import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ForgotPasswordPresenter } from './ForgotPasswordPresenter';

export const ForgotPasswordController: React.FC = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');

  const handleEmailChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(event.target.value);
  };

  const handleSendRecoveryEmail = () => {
    // TODO: Implement send recovery email logic
    console.log('Send recovery email to:', email);
  };

  const handleBackToSignIn = () => {
    navigate('/login');
  };

  const handleCreateAccount = () => {
    navigate('/signup');
  };

  return (
    <ForgotPasswordPresenter
      email={email}
      onEmailChange={handleEmailChange}
      onSendRecoveryEmail={handleSendRecoveryEmail}
      onBackToSignIn={handleBackToSignIn}
      onCreateAccount={handleCreateAccount}
    />
  );
};