import React, { useState } from 'react';
import { IconButton, InputAdornment } from '@mui/material';
import { Visibility, VisibilityOff } from '@mui/icons-material';
import { FormField, FormFieldProps } from './FormField';

export interface PasswordFieldProps extends Omit<FormFieldProps, 'type'> {
  showPassword?: boolean;
  onTogglePasswordVisibility?: () => void;
}

export const PasswordField: React.FC<PasswordFieldProps> = ({
  showPassword: controlledShowPassword,
  onTogglePasswordVisibility,
  slotProps,
  ...formFieldProps
}) => {
  const [internalShowPassword, setInternalShowPassword] = useState(false);
  
  const isControlled = controlledShowPassword !== undefined;
  const showPassword = isControlled ? controlledShowPassword : internalShowPassword;
  
  const handleTogglePasswordVisibility = () => {
    if (isControlled && onTogglePasswordVisibility) {
      onTogglePasswordVisibility();
    } else {
      setInternalShowPassword(!internalShowPassword);
    }
  };

  const handleMouseDownPassword = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
  };

  return (
    <FormField
      {...formFieldProps}
      type={showPassword ? 'text' : 'password'}
      slotProps={{
        ...slotProps,
        input: {
          ...slotProps?.input,
          endAdornment: (
            <InputAdornment position="end">
              <IconButton
                aria-label="toggle password visibility"
                onClick={handleTogglePasswordVisibility}
                onMouseDown={handleMouseDownPassword}
                edge="end"
              >
                {showPassword ? <VisibilityOff /> : <Visibility />}
              </IconButton>
            </InputAdornment>
          ),
        },
      }}
    />
  );
};