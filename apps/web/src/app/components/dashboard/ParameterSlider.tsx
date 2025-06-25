import React from 'react';
import { Slider } from '@mui/material';
import './ParameterSlider.scss';

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
    <div className="parameter-slider">
      {/* Label and Current Value */}
      <div className="parameter-slider__header">
        <span className="parameter-slider__label">
          {label}
        </span>
        <span className="parameter-slider__value">
          {formatValue(value)}
        </span>
      </div>

      {/* Slider */}
      <Slider
        className="parameter-slider__input"
        value={value}
        min={min}
        max={max}
        step={step}
        onChange={(_, newValue) => onChange(newValue as number)}
        valueLabelDisplay="auto"
        valueLabelFormat={formatValue}
        aria-label={label}
      />
    </div>
  );
};