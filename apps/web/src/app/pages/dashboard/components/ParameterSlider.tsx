import React from 'react';
import { Box, Typography, Slider } from '@mui/material';

export interface ParameterSliderProps {
  label: string;
  value: number;
  min: number;
  max: number;
  step: number;
  onChange: (value: number) => void;
  formatValue?: (value: number) => string;
}

export const ParameterSlider: React.FC<ParameterSliderProps> = ({
  label,
  value,
  min,
  max,
  step,
  onChange,
  formatValue = (val) => val.toString(),
}) => {
  return (
    <Box>
      {/* Label and Current Value */}
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 1 }}>
        <Typography variant="body2" sx={{ fontWeight: 500 }}>
          {label}
        </Typography>
        <Typography
          variant="body2"
          sx={{
            color: 'primary.main',
            fontWeight: 600,
            minWidth: '60px',
            textAlign: 'right',
          }}
        >
          {formatValue(value)}
        </Typography>
      </Box>

      {/* Slider */}
      <Slider
        value={value}
        min={min}
        max={max}
        step={step}
        onChange={(_, newValue) => onChange(newValue as number)}
        valueLabelDisplay="auto"
        valueLabelFormat={formatValue}
        sx={{
          color: 'primary.main',
          '& .MuiSlider-thumb': {
            width: 16,
            height: 16,
          },
          '& .MuiSlider-track': {
            height: 3,
          },
          '& .MuiSlider-rail': {
            height: 3,
            opacity: 0.3,
          },
        }}
      />
    </Box>
  );
};