import React from 'react';
import { TextField, Typography, FormControl, FormHelperText } from '@mui/material';
import type { TextFieldProps } from '@mui/material';

export interface FormFieldProps extends Omit<TextFieldProps, 'label' | 'error'> {
  label: string;
  required?: boolean;
  error?: string;
  helperText?: string;
}

export const FormField: React.FC<FormFieldProps> = ({
  label,
  required = false,
  error,
  helperText,
  sx,
  ...textFieldProps
}) => {
  const hasError = Boolean(error);

  return (
    <FormControl fullWidth error={hasError} sx={sx}>
      <Typography 
        variant="subtitle2" 
        color="text.primary" 
        sx={{ 
          mb: 1,
          fontWeight: 500,
          fontSize: '14px'
        }}
      >
        {label}{required && ' *'}
      </Typography>
      <TextField
        {...textFieldProps}
        fullWidth
        variant="outlined"
        error={hasError}
      />
      {(error || helperText) && (
        <FormHelperText>
          {error || helperText}
        </FormHelperText>
      )}
    </FormControl>
  );
};